import { AnyTimeUnit } from "./unit-core"



// ---- time ------



export type Time<T extends AnyTimeUnit> = { readonly kind: 'Time', readonly scalar: number, readonly timeUnit: T}
export const Time = <T extends AnyTimeUnit>(scalar:number, unit: T):Time<T> => ({ kind: 'Time', scalar, timeUnit: unit}) 

export type AnyTime = Time<AnyTimeUnit>

export type TimeConstructor = {
    readonly second: (_: number) => Time<'second'>
    readonly minute: (_: number) => Time<'minute'>
    readonly mpcTick: (_: number) => Time<'mpcTick'>
}

export const TimeConstructor: TimeConstructor = {
    second: _ => Time(_, 'second'),
    minute: _ => Time(_, 'minute'),
    mpcTick: _ => Time(_, 'mpcTick'),
}
