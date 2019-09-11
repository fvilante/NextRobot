import { AnyMotionUnit, AnyTimeUnit } from "./unit-core"



// ---- velocity ------

export type Velocity<M extends AnyMotionUnit, T extends AnyTimeUnit> = {
    readonly kind: 'Velocity'
    readonly scalar: number
    readonly motionUnit: M
    readonly timeUnit: T 
}

export type AnyVelocity = Velocity<AnyMotionUnit, AnyTimeUnit>

export const Velocity = <M extends AnyMotionUnit, T extends AnyTimeUnit>(scalar: number, motionUnit: M, timeUnit:T ): Velocity<M,T> => 
    ({kind: 'Velocity', scalar, motionUnit, timeUnit})

export type VelocityConstructor = {
    readonly milimeterPerSecond: (_: number) => Velocity<'milimeter','second'>
    readonly meterPerSecond: (_: number) => Velocity<'meter','second'>
    readonly linearPulsePerMpcTick: (_: number) => Velocity<'linear-pulse', 'mpcTick'>
    readonly linearPulsePerSecond: (_: number) => Velocity<'linear-pulse', 'second'>
    readonly angularPulsePerMpcTick: (_: number) => Velocity<'angular-pulse', 'mpcTick'>
    readonly angularPulsePerSecond: (_: number) => Velocity<'angular-pulse', 'second'>
}

export const VelocityConstructor: VelocityConstructor = {
    milimeterPerSecond: _ => Velocity(_, 'milimeter','second'),
    meterPerSecond: _ => Velocity(_, 'meter','second'),
    linearPulsePerMpcTick: _ => Velocity(_, 'linear-pulse', 'mpcTick'),
    linearPulsePerSecond: _ => Velocity(_, 'linear-pulse', 'second'),
    angularPulsePerMpcTick: _ => Velocity(_, 'angular-pulse', 'mpcTick'),
    angularPulsePerSecond: _ => Velocity(_, 'angular-pulse', 'second'),
}