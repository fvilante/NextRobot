

// ============================================================
//  Interfce Introspector Module
//
//  For examples of use see: 
//  https://gist.github.com/fvilante/60db584c117a4371ef1369a65ce6004d
//
//  todo: improve this doc / extract this module to Core Utils
//
// ============================================================


type __PairList<T> = {
    [Key in keyof T]: {
        readonly key: Key
        readonly value: T[Key]
    }
}

type __Pair<T> = __PairList<T>[keyof T]

type AnyPair = __Pair<any>

// --------------------------
// utils - interface Parser
// --------------------------

/** Final operations over a Pair */
type __GetKeys<T extends {readonly key: any}> = T['key']
type __GetValue<T extends {readonly value: any}> = T['value']

/** Result is a Pair */
type __FilterKeysByValue<T, Value extends T[keyof T]> = Extract<__Pair<T>, {readonly value: Value}>

type GetKeys<T> = __GetKeys<__Pair<T>>
type GetValues<T> = __GetValue<__Pair<T>>


export type FilterKeysByValue<T, Value extends T[keyof T]> = __GetKeys<__FilterKeysByValue<T, Value>>


