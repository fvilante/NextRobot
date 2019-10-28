import { Future, Reader, delay, Left, Right } from "@nextrobot/core-utils"
import { Bytes } from "../data-models/bytes"
import { PortOpened, PortOpenner, PortReference } from "../data-models/port"


// sync transact


type Transact<A,B> = {
    readonly kind: 'Transact'
    readonly run: (value:A ) => Future<B>
    readonly dimap: <C,D>(f: (_:C) => A, g: (_:B) => D) => Transact<C,D> 
    readonly lmap: <C>(f: (_:C) => A) => Transact<C,B>
    readonly rmap: <D>(g: (_:B) => D) => Transact<A,D>
}


// wraps
const Transact = <A,B>(effectFn: (value:A) => Future<B>): Transact<A,B> => {

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



const Test1 = () => {

    const AsyncEffect: (_: number) => Future<string> = value => Future( resolver => resolver(Right('Hi!!')))

    const protocol: Transact<number, string> = Transact(AsyncEffect)

    const a = protocol.run(10).map( s => `${s} world` )

    // tslint:disable-next-line: no-expression-statement
    a.runP().then( ei => ei.map( n => console.log(n) ) )



}


// tslint:disable-next-line: no-expression-statement
// Test1()