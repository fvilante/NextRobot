

export type Pair<K extends keyof any,V> = { readonly key: K, readonly value: V }
export type Pairs<K extends keyof any,V> = readonly Pair<K,V>[]

