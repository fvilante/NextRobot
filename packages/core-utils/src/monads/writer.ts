
import { flattenDeep } from "../array/ArrayFlattenDeep"
import { Monoid } from '../algebraic-structures/monoid'



// todo: discuss -> eager or lazy evaluated ?
export type Writer<A, M> = {

    readonly run: () => readonly [M, A] // [message, value]

    readonly map: <B>(fn: (_:A) => B) => Writer<B,M> 

    readonly fmap: <B>(fn: (_:A) => Writer<B,M>) => Writer<B,M>

}

/** note: 'monoid' is expected to be Pure */
export const Writer = <M>(monoid: Monoid<M>) => <A>(message: M, value:A ): Writer<A, M> => {

    const run:  Writer<A,M>['run'] = () => {
        return [message, value]
    }

    /** Attention: call map does not change the message content only the value. If you want to change the message and the value call 'fmap' instead */
    const map: Writer<A,M>['map'] = f => {
        return Writer(monoid)( message, f(value) )
    }

    const fmap: Writer<A,M>['fmap'] = f => {
        const [msgA, a] = run()
        const mb = f(a)
        const [msgB, b] = mb.run()
        const newMsg = monoid.concat(msgA, msgB)
        const r = Writer(monoid)( newMsg , b)
        return r
    }

    return {
        run,
        map,
        fmap,
    }

}



// --------------------------------------------
// informal test
// --------------------------------------------

// todo: extract this test to other file

const Test1 = () => {

    // configure

    const monoid: Monoid<readonly string[]> = {
        concat: (a, b) => [...a,...b],
        empty: () => [``]
    }

    // prepare

    const f1 = (a: number) => Writer(monoid)([`funcao 1 resultado ${a}`], String(a+10)) //25
    const f2 = (b: string) => Writer(monoid)([`funcao 2 resultado ${b}`], b)
    const f3 = (c: string) => Number(c)+10 //35

    // do

    const r = f1(15)
        .fmap( f2 )
        .map( f3 )

    // run

    const [msgs, value] = r.run()

    // check

    console.log( `Imprimindo valor:` )
    console.log( value )
    console.log( `Imprimindo mensagENS:` )
    console.log( msgs )
  


}

// tslint:disable-next-line: no-expression-statement
//Test1()