/** generate a number from start to end (end not included) */
export type StartEnd  = readonly [number, number]
export type ZeroToEnd = readonly [number]
export type StartEndStep = readonly [number, number, number]

export type Observed<T> = AsyncIterableIterator<T>