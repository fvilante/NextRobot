import { AnyMotionUnit, AnyTimeUnit, AnyTranslationUnit } from "./unit-core"



// ---- acceleration ------

export type Acceleration<M extends AnyMotionUnit, T extends AnyTimeUnit> = {
    readonly kind: 'Acceleration'
    readonly scalar: number
    readonly motionUnit: M
    readonly timeUnit: T  
}

export type AnyAcceleration = Acceleration<AnyTranslationUnit, AnyTimeUnit>

export const Acceleration = <M extends AnyMotionUnit, T extends AnyTimeUnit>(scalar: number, motionUnit:M, timeUnit: T): Acceleration<M,T> => 
    ({ kind: 'Acceleration', scalar, motionUnit, timeUnit })

export type AccelerationConstructor = {
    readonly milimeterPerSquaredSecond: (_: number) => Acceleration<'milimeter', 'second'>
    readonly meterPerSquaredSecond: (_: number) => Acceleration<'meter', 'second'>
    readonly angularPulsePerSquaredMpcTick: (_: number) => Acceleration<'angular-pulse', 'mpcTick'>
}


export const AccelerationConstructor: AccelerationConstructor = {
    milimeterPerSquaredSecond: _ => Acceleration(_, 'milimeter', 'second'),
    meterPerSquaredSecond: _ => Acceleration(_, 'meter', 'second'),   
    angularPulsePerSquaredMpcTick: _ => Acceleration(_, 'angular-pulse', 'mpcTick'),  
}

