


// ---- time ------

export type AnyTimeUnit = 'second' | 'minute' | 'mpcTick'

export type Time<T extends AnyTimeUnit> = { readonly kind: 'Time', readonly scalar: number, readonly unit: T}
export const Time = <T extends AnyTimeUnit>(scalar:number, unit: T):Time<T> => ({ kind: 'Time', scalar, unit}) 

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



// ---- space ------

export type AnySpaceUnit = 'milimeter' | 'meter' | 'pulse'

export type Space<T extends AnySpaceUnit> = { readonly kind: 'Space', readonly scalar: number, readonly unit: T }
export const Space = <T extends AnySpaceUnit>(scalar: number, unit: T): Space<T> => ({kind: 'Space', scalar, unit})

export type AnySpace = Space<AnySpaceUnit>


export type SpaceConstructor = {
    readonly milimeter: (_: number) => Space<'milimeter'> 
    readonly meter: (_: number) => Space<'meter'>
    readonly pulse: (_: number) => Space<'pulse'>
}
export const SpaceConstructor: SpaceConstructor = {
    milimeter: _ => Space(_, 'milimeter'),
    meter: _ => Space(_, 'meter'),
    pulse: _ => Space(_, 'pulse'),
}


// ---- velocity ------

export type Velocity<S extends AnySpaceUnit, T extends AnyTimeUnit> = {
    readonly kind: 'Velocity'
    readonly scalar: number
    readonly spaceUnit: S
    readonly timeUnit: T 
}

export type AnyVelocity = Velocity<AnySpaceUnit, AnyTimeUnit>

export const Velocity = <S extends AnySpaceUnit, T extends AnyTimeUnit>(scalar: number, spaceUnit: S, timeUnit:T ): Velocity<S,T> => 
    ({kind: 'Velocity', scalar, spaceUnit, timeUnit})

export type VelocityConstructor = {
    readonly milimeterPerSecond: (_: number) => Velocity<'milimeter','second'>
    readonly meterPerSecond: (_: number) => Velocity<'meter','second'>
    readonly pulsePerMpcTick: (_: number) => Velocity<'pulse', 'mpcTick'>
    readonly pulsePerSecond: (_: number) => Velocity<'pulse', 'second'>
}

export const VelocityConstructor: VelocityConstructor = {
    milimeterPerSecond: _ => Velocity(_, 'milimeter','second'),
    meterPerSecond: _ => Velocity(_, 'meter','second'),
    pulsePerMpcTick: _ => Velocity(_, 'pulse', 'mpcTick'),
    pulsePerSecond: _ => Velocity(_, 'pulse', 'second'),
}


// ---- acceleration ------

export type Acceleration<S extends AnySpaceUnit, T extends AnyTimeUnit> = {
    readonly kind: 'Acceleration'
    readonly scalar: number
    readonly spaceUnit: S
    readonly timeUnit: T  
}

export type AnyAcceleration = Acceleration<AnySpaceUnit, AnyTimeUnit>

export const Acceleration = <S extends AnySpaceUnit, T extends AnyTimeUnit>(scalar: number, spaceUnit:S, timeUnit: T): Acceleration<S,T> => 
    ({ kind: 'Acceleration', scalar, spaceUnit, timeUnit })

export type AccelerationConstructor = {
    readonly milimeterPerSquaredSecond: (_: number) => Acceleration<'milimeter', 'second'>
    readonly meterPerSquaredSecond: (_: number) => Acceleration<'meter', 'second'>
    readonly pulsePerSquaredSecond: (_: number) => Acceleration<'pulse', 'second'>
    readonly pulsePerSquaredMpcTick: (_: number) => Acceleration<'pulse', 'mpcTick'>
}


export const AccelerationConstructor: AccelerationConstructor = {
    milimeterPerSquaredSecond: _ => Acceleration(_, 'milimeter', 'second'),
    meterPerSquaredSecond: _ => Acceleration(_, 'meter', 'second'),   
    pulsePerSquaredSecond: _ => Acceleration(_, 'pulse', 'second'),
    pulsePerSquaredMpcTick: _ => Acceleration(_, 'pulse', 'mpcTick'),   
}

// informal test

const Test = () => {

    const milimetrosPorSegundo = AccelerationConstructor.milimeterPerSquaredSecond
    const minutos = TimeConstructor.minute

    const a = milimetrosPorSegundo(10)

    const b = minutos(10)


}



