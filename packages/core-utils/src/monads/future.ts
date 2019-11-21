
import { Result, ResultMatcher, Result_ } from './result' 
import { Try } from './try'


// tslint:disable: no-expression-statement 

// ------------------------ FUTURE ----------------------------------------------


// version 1 => 2 type parameters and runP returns a promisse 

export type Future<A> = {

    readonly kind: 'Future'

    readonly runP: () => Promise<Result<A>>

    /** run and match an effectful result */
    readonly runE: (m: ResultMatcher<A,void>) => void

    readonly map: <B>(f: (_:A) => B) => Future<B>

    readonly fmap: <B>(f: (_:A) => Future<B>) => Future<B>

    readonly match: <R>(m: ResultMatcher<A, R>) => Future<R>


}

// interface only (not instantiate it)
type _Future<A> = {
    //readonly Resolver: (_:Either<Error,A>) => void
    readonly OkResolver: (_: A) => void
    readonly ErrorResolver: (_: Error) => void
    readonly Callback: ( ok: _Future<A>['OkResolver'], err: _Future<A>['ErrorResolver']) => void
} & Future<A>


export const join = <A>(ffa:Future<Future<A>>):Future<A> => {

    return Future<A>( (ok, error) => {

        ffa
            .runE({
                Error:  err => error(err),
                Ok:     val => val.runE({
                    Error:  err => error(err),
                    Ok:     val => ok(val),
                }),
            })


})}

/** Same as Promise.all() */
export const all = <A>(fas: readonly Future<A>[]): Future<readonly A[]> => {
    
    return Future<readonly A[]>( (ok, error) => {

        const f0 = () => fas.map( fa => fa.runP())
        const s1 = () => Promise.all(f0())
            .then( ras => { 
                const as = Result_.filterByOk(ras)
                const es = Result_.filterByError(ras) // todo: probably'll be just one error. or not ? Check it.
                return es.length === 0 
                    ? ok(as)
                    : error(es[0]) //takes first error -> ok, safe. //todo: what to do if it has more than just one errors ? What to do with other errors ?

            })
        s1() //run effect
    })
}


/** Attention: It's Highly recommended to explicitly type your Future constructions  */
export const Future = <A>(effect: _Future<A>['Callback']): Future<A> => {

    /** runP aways resolves to a Promise<Result<A>> even if an error hapens it will be manipulated inside Result and not inside Promise ) */
    const runP: _Future<A>['runP'] = async () => {
        return new Promise<Result<A>>( (resolve, reject) => { 
            
            const ok: _Future<A>['OkResolver'] = value => { 
                resolve(Result(value))     // resolve promise
            }

            const err:  _Future<A>['ErrorResolver'] = err => {
                resolve(Result(err as unknown as A))
            }

            const unsafeEffect = () => effect(ok, err)

            Try(unsafeEffect)
                .match({
                    Left:    catched => err(catched),
                    Right:   ()      => { },
                })
        })
    }

    const runE: _Future<A>['runE'] = matcher => {
        runP()
            .then( ra => ra.match(matcher))
    }

    const map: _Future<A>['map'] = f => {
        return Future( (ok, error) => { 
            runP()
                .then( r => r.match({
                    Ok:     val => ok( f(val) ),
                    Error:  err => error(err),
                }))
        })
    }

    const fmap: _Future<A>['fmap'] = <B>(f:(_: A) => Future<B>): Future<B> => {

        return Future<B>( (ok, error) => {
            runP()
            .then( ra => ra.match({
                            Ok:     valA => f(valA),
                            Error:  err => Future<B>( (_,_e) => _e(err) ) ,
                        }))
            .then( fb => fb.runP()
                .then( rb => 
                    rb.match({
                            Ok:     valB => ok(valB),
                            Error:  err => error(err),
                        })))
            
       
        })

    }

    // todo: Test it! Not tested yet
    const match: _Future<A>['match'] = <R>(matcher: ResultMatcher<A, R>) => {
        return Future<R>( (ok, _) => {
            runP()
                .then( r => r.match({
                    Ok:     val => ok( matcher.Ok(val) ),
                    Error:  err => ok( matcher.Error(err) ),
                }))

        })
    }



    return { 
        kind: 'Future',
        runP,
        runE,
        map,
        fmap,
        match,
    }


}




// ------------------

// Informal Test

const Test1 = async () => {

    const f1 = Future<number>( (ok, error) => {
        console.log(`--I'm inside the 'F1' the Future--`)
        ok(20)
    }).map( n => n * 100)

    const f2 = (n:number) => Future<string>( (ok, error) => {
        console.log(`--I'm inside the 'F2' the Future--`)
        ok(`Yey Mrs Number '${n}'. Hello `)
        // error(Error(`ERROR:Yey Mrs Number '${n}'. Hello `))
    }).map( s => s + ` World !`)


    const f3 = f1.match({
        Ok: err => `Finished: Throw this error --> ${err}`,
        Error: value => `Finished: Successful, value --> ${ value }`,
    })


    const f4 = f1.fmap( n => f2(n))

    const r1 = (await f3.runP()).fromValue(``)
    const r2 = (await f4.runP()).fromValue(`If you're looking this an left happned`)

    console.log(r1)
    console.log(r2)

}

// join
const Test2 = () => {

    const fa = Future<number>( ok => ok(10))
    const ffa = fa.map( num => Future<number>( ok => ok(num) ) )
    const r = join(ffa)

    //verbose
    const x = r.runP().then( ma => ma.map( num => console.log(num) ) )

    //better
    r.runE({
        Error:  err => console.log(`error happened: ${err}`),
        Ok:     val => console.log(`Good value: ${val}`),
    })

}

//Test1()
//Test2()
