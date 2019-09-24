import { writer } from "repl"
import { flattenDeep } from "@nextrobot/core-utils"


// todo: move to core-utils

export type Writer<A> = {

    readonly map: <B>(fn: (_:A) => B) => Writer<B> 

    readonly fmap: <B>(fn: (_:A) => Writer<B>) => Writer<B> 

    readonly msgs: readonly string[] 

    readonly val: A 
}

export const Writer = <A>(val:A, msg: readonly string[] | string ): Writer<A> => {

    const a = flattenDeep([msg]) as readonly string[]

    const w: Writer<A> = {

        map: fn => Writer(fn(val), [ ...a , `unknown function runned!`]),

        fmap: fn => Writer(fn(val).val, [...a,...fn(val).msgs]),

        msgs: a,

        val,

    }

    return w

}



// --------------------------------------------
// informal test
// --------------------------------------------

// todo: extract this test to other file

const Test = () => {

    const dup = (n:number) => Writer(n*2, `Duplicated the number ${n} * 2 = ${n*2}`)

    const rootPower = (n: number) => Writer(Math.pow(n,2), `Root Power of ${n} ^ 2 = ${Math.pow(n,2)}`)

    const a = dup(20).map( val => val+5).fmap(rootPower)

    console.log(a.msgs) 

    // ok, prints =>

    /*

    [   'Duplicated the number 20 * 2 = 40',
        'unknown function runned!',
        'Root Power of 45 ^ 2 = 2025'   
    ]

    */


}

