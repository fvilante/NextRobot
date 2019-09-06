
import { TKey } from '../tkey' 

export type Pair<K extends TKey,V> = { readonly key: K, readonly value: V }
export type Pairs<K extends TKey,V> = readonly Pair<K,V>[]

