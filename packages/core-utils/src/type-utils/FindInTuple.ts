
export type FindInTuple<T extends readonly any[], V> = V extends T[number] ? V : never

//example:
type R0 = readonly ['a', 'b', 'c']
type T0 = FindInTuple<R0,'c'>