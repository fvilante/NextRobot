import { Either, Left, Right, EitherMatcherFn, filterByRight, filterByLeft } from './either'


// tslint:disable: no-expression-statement 

// ------------------------ FUTURE ----------------------------------------------


// version 1 => 2 type parameters and runP returns a promisse 

export type Future<A> = {

    readonly kind: 'Future'

    readonly runP: () => Promise<Either<Error,A>>

    readonly map: <B>(f: (_:A) => B) => Future<B>

    readonly fmap: <B>(f: (_:A) => Future<B>) => Future<B>

    readonly match: <R>(_: EitherMatcherFn<Error, A, R>) => Future<R>


}

// interface only (not instantiate it)
type _Future<A> = {
    readonly Resolver: (_:Either<Error,A>) => void
    readonly Callback: (resolver: _Future<A>['Resolver']) => void
} & Future<A>


export const join = <A>(ffa:Future<Future<A>>):Future<A> => {

    return Future<A>( resolver => {

        ffa.runP().then( ef => ef.match({
            Left: err => resolver(Left(err)),
            Right: fa => fa.runP().then( ea => resolver(ea) )
        }))

    })

}

/** Same as Promise.all() */
export const all = <A>(fas: readonly Future<A>[]): Future<readonly A[]> => {
    
    return Future<readonly A[]>( resolver => {

        const s0 = () => fas.map( fa => fa.runP())
        const s1 = () => Promise.all(s0())
            .then( eis => { 
                const as = filterByRight(eis)
                const errs = filterByLeft(eis) // todo: probably'll be just one error. or not ? Check it.
                return errs.length === 0 
                    ? resolver( Right(as) ) 
                    : resolver( Left(errs[0]) ) //takes first error -> ok, safe.

            
            })
        return s1()
    })
}


/** Attention: It's Highly recommended to explicitly type your Future constructions  */
export const Future = <A>(effect: _Future<A>['Callback']): Future<A> => {

    const runP: _Future<A>['runP'] = async () => {
        return new Promise<Either<Error,A>>( (resolve, reject) => { 
            
            const resolver: _Future<A>['Resolver'] = ma => { 
                //all resolutions pass here (including any throw)
                resolve(ma)     // resolve promise
            }
            
            try {
                effect(resolver) // run effect
            } catch (err) {
                    // tslint:disable: no-if-statement
                    if(err instanceof Error) {
                        // IDE type hinting now available
                        // properly handle Error e
                        return resolver(Left(err))
                    }
                    else if(typeof err === 'string' || err instanceof String) {
                        // IDE type hinting now available
                        // properly handle e or...stop using libraries that throw naked strings
                        return resolver(Left(new Error(String(err)))) 
                    }
                    else if(typeof err === 'number' || err instanceof Number) {
                        // IDE type hinting now available
                        // properly handle e or...stop using libraries that throw naked numbers
                        return resolver(Left(new Error(String(err))))
                    }
                    else if(typeof err === 'boolean' || err instanceof Boolean) {
                        // IDE type hinting now available
                        // properly handle e or...stop using libraries that throw naked booleans
                        return resolver(Left(new Error(String(err))))
                    }
                    else {
                        // if we can't figure out what what we are dealing with then
                        // probably cannot recover...therefore, rethrow
                        // Note to Self: Rethink my life choices and choose better libraries to use.
                        return resolver(Left(new Error(String(err))))
                    }
                    // tslint:enable: no-if-statement
            }    
       
            


        } )

    }

    const map: _Future<A>['map'] = f => {
        return Future( resolver => { 
            runP()
                .then( a => a.map(f))
                .then( b => resolver(b))
        })
    }

    const fmap: _Future<A>['fmap'] = <B>(f:(_: A) => Future<B>): Future<B> => {

        return Future( resolver => {
            runP()
            .then( ma => 
                ma.match({
                    Right: a => f(a),
                    Left: err => Future<B>( errResolver => errResolver( Left(err)))
                }) 
            )
            .then( mmb => mmb.runP().then( e => resolver(e)))          
        })

    }

    const match: _Future<A>['match'] = <R>(matcher: EitherMatcherFn<Error, A, R>) => {
        return Future<R>( resolver => {
            runP()
            .then( ma => ma.match(matcher) )
            .then( r => resolver(Right(r)) )
        })
    }



    return { 
        kind: 'Future',
        runP,
        map,
        fmap,
        match,
    }


}




// ------------------

// Informal Test

const Test1 = async () => {

    const f1 = Future<number>( resolve => {
        console.log(`--I'm inside the 'F1' the Future--`)
        resolve(Right(20))
    }).map( n => n * 100)

    const f2 = (n:number) => Future<string>( resolve => {
        console.log(`--I'm inside the 'F2' the Future--`)
        resolve(Right(`Yey Mrs Number '${n}'. Hello `))
        //resolve(Left(Error(`ERROR:Yey Mrs Number '${n}'. Hello `)))
    }).map( s => s + ` World !`)


    const f3 = f1.match({
        Left: err => `Finished: Throw this error --> ${err}`,
        Right: value => `Finished: Successful, value --> ${ value }`,
    })


    const f4 = f1.fmap( n => f2(n))

    const r1 = (await f3.runP()).fromRight(``)
    const r2 = (await f4.runP()).fromRight(`If you're looking this an left happned`)

    console.log(r1)
    console.log(r2)

}

// join
const Test2 = () => {

    const fa = Future<number>( resolver => resolver(Right(10)))
    const ffa = fa.map( num => Future<number>( resolver => resolver(Right(num))))
    const r = join(ffa)

    r.runP().then( ma => ma.map( num => console.log(num) ) )

}


//Test2()
