import { Future } from "./future"


export type Transact<A,B> = {
    readonly kind: 'Transact'
    readonly run: (value:A) => Future<B>
    readonly dimap: <C,D>(f: (_:C) => A, g: (_:B) => D) => Transact<C,D> 
    readonly lmap: <C>(f: (_:C) => A) => Transact<C,B>
    readonly rmap: <D>(g: (_:B) => D) => Transact<A,D>
}


/** This monad wraps a asynchonous function.
 * With this monad you can dimap (map/contramap) the effect
 * when you run the monad you must give an initial value, and you get back a future.
 */
export const Transact = <A,B>(effectFn: (value:A) => Future<B>): Transact<A,B> => {

    const identity: <T>(_:T) => T = x => x

    const run: Transact<A,B>['run'] = value => {
        return effectFn(value)
    }

    const dimap: Transact<A,B>['dimap'] = (f,g) => {
        return Transact(  (value) => effectFn( f(value)).map(g)  )
    }

    const lmap: Transact<A,B>['lmap'] = f => {
        return dimap( f, identity )
    }

    const rmap: Transact<A,B>['rmap'] = g => {
        return dimap( identity, g )
    }

    return {
        kind: 'Transact',
        run,
        dimap,
        lmap,
        rmap,
    }

}

// informal test

const Test1 = () => {

    const AsyncEffect: (_: number) => Future<string> = value => Future( ok => ok(String(value)) )

    const protocol: Transact<number, string> = Transact(AsyncEffect)

    const a = protocol.rmap( s => `${s} world` ).run(10)

    // tslint:disable: no-expression-statement

    // verbose
    a.runP().then( ei => ei.map( n => console.log(n) ) )
    
    // better
    a.runE({
        Error:  err => console.log(`has error: ${err}`),
        Ok:     val => console.log(`ok value: ${val}`),
    })


    // tslint:disable: no-expression-statement
}

const Test2 = () => {

    const AsyncEffect: (_: number) => Future<string> = value => Future( ok => ok(String(value)) ) 

    const protocol: Transact<number, string> = Transact(AsyncEffect)


    const a = protocol.rmap( x => x.length)
    const b = a.lmap( (x: [string,number]) => x[1] )

    const z = Future<string>( (resolve, reject) => {

        const c = b.run( ['hello', 7] ).map( x => String(x)).runP().then( r => r.match({
            Ok:     val => resolve(val),
            Error:  err => reject(err),
        }) )

    })


}


// tslint:disable-next-line: no-expression-statement
// Test1()