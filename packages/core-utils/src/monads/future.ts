import { Either, Left, Right, EitherMatcherFn } from './either'

// tslint:disable: no-expression-statement 

// ------------------------ FUTURE ----------------------------------------------


// version 1 => 2 type parameters and runP returns a promisse 

export type Future<A,E> = {

    readonly kind: 'Future'

    readonly runP: () => Promise<Either<E,A>>

    readonly map: <B>(f: (_:A) => B) => Future<B,E>

    readonly fmap: <B>(f: (_:A) => Future<B,E>) => Future<B,E>

    readonly match: <R>(_: EitherMatcherFn<E, A, R>) => Future<R,undefined>

}

// interface only (not instantiate it)
type _Future<A,E> = {
    readonly Resolver: (_:Either<E,A>) => void
    readonly Callback: (resolver: _Future<A,E>['Resolver']) => void
} & Future<A,E>





/** Attention: It's Highly recommended to explicitly type your Future constructions  */
export const Future = <A,E>(callback: _Future<A,E>['Callback']): Future<A,E> => {

    const runP: _Future<A,E>['runP'] = async () => {
        return new Promise( (resolve, reject) => { 
            const resolver: _Future<A,E>['Resolver'] = e => { 
                resolve(e)     // resolve promise
            }
            callback(resolver) // run effect
        } )

    }

    const map: _Future<A,E>['map'] = f => {
        return Future( resolver => { 
            runP()
                .then( a => a.map(f))
                .then( b => resolver(b))
        })
    }

    const fmap: _Future<A,E>['fmap'] = <B>(f:(_: A) => Future<B, E>):Future<B,E> => {

        return Future( resolver => {
            runP()
            .then( ma => 
                ma.match({
                    Right: a => f(a),
                    Left: err => Future<B,E>( errResolver => errResolver( Left(err)))
                }) 
            )
            .then( mmb => mmb.runP().then( e => resolver(e)))          
        })

    }

    const match: _Future<A,E>['match'] = <R>(matcher: EitherMatcherFn<E, A, R>) => {
        return Future<R,undefined>( resolver => {
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

    const f1 = Future<number,string>( resolve => {
        console.log(`--I'm inside the 'F1' the Future--`)
        resolve(Right(20))
    }).map( n => n * 100)

    const f2 = (n:number) => Future<string,string>( resolve => {
        console.log(`--I'm inside the 'F2' the Future--`)
        resolve(Right(`Yey Mrs Number '${n}'. Hello `))
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


//Test1()
