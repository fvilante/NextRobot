
// ------------  MESSAGE  ------------------------

export type Message<K extends string, T = unknown> = {
    readonly kind: K 
    readonly payload: T
}

export type AnyMessage = Message<string, unknown>

export const Message = <K extends string, T>(kind: K, payload: T): Message<K,T> => ({kind, payload})


// -----  PATTERN MATCH  ------------------------


export type PickMessageFromUnion<M extends AnyMessage, K extends M['kind']> = M extends Message<K, infer P> ?  Message<K, P> : never

export type PatternMatchFnObject<M extends AnyMessage, R> = {
    [K in M['kind']]: (msg: PickMessageFromUnion<M,K>) => R
}

export const Match = <M extends AnyMessage, R>(msg: M, pattern: PatternMatchFnObject<M,R>):R => {
    const msgKind = msg.kind
    const patternMatch = pattern
    const fn = patternMatch[msgKind as M['kind']]
    const r = fn(msg as unknown as PickMessageFromUnion<M, M["kind"]>)
    return r
}
 

// ------ informal test ---------------------------------------

// static test
const Test = () => {

    const m1 = Message('M1' as const, undefined)
    const m2 = Message('M2' as const, 'hello world as string')
    const m3 = Message('300' as const, 10 as const)
    const m4 = Message('M4' as const, 'oi' as const)

    const ms = [m1,m2,m3,m4] as const

    type Messages = typeof ms[number]

    type A = PatternMatchFnObject<Messages, void>

    type D = PickMessageFromUnion<Messages, '300'>

    type E = PickMessageFromUnion<Messages, '300'>

    type F = PickMessageFromUnion<Messages, 'M2'>

    /** prefer this way */
    const doPatternMatch = (msgs: Messages): number => {
        return Match(msgs, {
            "M1": (_) => 10,
            "M2": (_) => 20,
            '300': (_) => 30+_.payload, //40
            "M4": (_) => 40+_.payload.length, //42
        })
    }

    /** avoid this way prefer up-above*/
    const a = Match<Messages, number>(m1, {
        "M1": (_) => 10,
        "M2": (_) => 20,
        "300": (_) => 30,
        "M4": (_) => 40,
    })
    
    // tslint:disable-next-line: no-expression-statement
    const log = [...ms].map( msg => [ {kind: msg.kind, matched: doPatternMatch(msg) } ] )
    console.table(log)

}


// tslint:disable-next-line: no-expression-statement
// Test()