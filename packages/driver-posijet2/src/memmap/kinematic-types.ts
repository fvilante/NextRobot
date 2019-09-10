


// ---- time ------

export type AnyTimeUnit = 'second' | 'minute'

type Time<T extends AnyTimeUnit> = { readonly kind: 'Time', readonly scalar: number, readonly unit: T}
const Time = <T extends AnyTimeUnit>(scalar:number, unit: T):Time<T> => ({ kind: 'Time', scalar, unit}) 


type TimeConstructor = {
    readonly second: (_: number) => Time<'second'>
    readonly minute: (_: number) => Time<'minute'>
}

const TimeConstructor: TimeConstructor = {
    second: _ => Time(_, 'second'),
    minute: _ => Time(_, 'minute'),
}



// ---- space ------

type AnySpaceUnit = 'milimeter' | 'meter'

type Space<T extends AnySpaceUnit> = { readonly kind: 'Space', readonly scalar: number, readonly unit: T }
const Space = <T extends AnySpaceUnit>(scalar: number, unit: T): Space<T> => ({kind: 'Space', scalar, unit})

type SpaceConstructor = {
    readonly milimeter: (_: number) => Space<'milimeter'> 
    readonly meter: (_: number) => Space<'meter'>
}
const SpaceConstructor: SpaceConstructor = {
    milimeter: _ => Space(_, 'milimeter'),
    meter: _ => Space(_, 'meter'),
}


// ---- velocity ------

type Velocity<S extends AnySpaceUnit, T extends AnyTimeUnit> = {
    readonly kind: 'Velocity'
    readonly scalar: number
    readonly spaceUnit: S
    readonly timeUnit: T 
}

const Velocity = <S extends AnySpaceUnit, T extends AnyTimeUnit>(scalar: number, spaceUnit: S, timeUnit:T ): Velocity<S,T> => 
    ({kind: 'Velocity', scalar, spaceUnit, timeUnit})

type VelocityConstructor = {
    readonly milimeterPerSecond: (_: number) => Velocity<'milimeter','second'>
    readonly meterPerSecond: (_: number) => Velocity<'meter','second'>
}

const VelocityConstructor: VelocityConstructor = {
    milimeterPerSecond: _ => Velocity(_, 'milimeter','second'),
    meterPerSecond: _ => Velocity(_, 'meter','second'),
}


// ---- acceleration ------

type Acceleration<S extends AnySpaceUnit, T extends AnyTimeUnit> = {
    readonly kind: 'Acceleration'
    readonly scalar: number
    readonly spaceUnit: S
    readonly timeUnit: T  
}

const Acceleration = <S extends AnySpaceUnit, T extends AnyTimeUnit>(scalar: number, spaceUnit:S, timeUnit: T): Acceleration<S,T> => 
    ({ kind: 'Acceleration', scalar, spaceUnit, timeUnit })

type AccelerationConstructor = {
    readonly milimeterPerSquaredSecond: (_: number) => Acceleration<'milimeter', 'second'>
    readonly meterPerSquaredSecond: (_: number) => Acceleration<'meter', 'second'>   
}

const AccelerationConstructor: AccelerationConstructor = {
    milimeterPerSquaredSecond: _ => Acceleration(_, 'milimeter', 'second'),
    meterPerSquaredSecond: _ => Acceleration(_, 'meter', 'second'),       
}

// informal test

const Test = () => {

    const milimetrosPorSegundo = AccelerationConstructor.milimeterPerSquaredSecond
    const minutos = TimeConstructor.minute

    const a = milimetrosPorSegundo(10)

    const b = minutos(10)


}



