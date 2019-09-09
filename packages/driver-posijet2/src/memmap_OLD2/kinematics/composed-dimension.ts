import { Measure, GetUnitsGivenDimension, convertMeasure, GetUnitsOfSameDimensionGivenAUnit } from './base-dimensions'
import { Maybe, Just, Nothing } from '@nextrobot/core-utils'


type AnyTimeUnit = GetUnitsGivenDimension<'Time'>
type AnySpaceUnit = GetUnitsGivenDimension<'Space'>

// function time space: it relations space time scalars
type FTS = <
    S0 extends AnySpaceUnit, 
    T0 extends AnyTimeUnit,
    S1 extends AnySpaceUnit, 
    T1 extends AnyTimeUnit,
    >(space: number, time: number) => 
        {   readonly space: Maybe<Measure<S1>>, 
            readonly time: Maybe<Measure<T1>>,
        }


type Time<S extends undefined, T extends AnyTimeUnit> = 
    { readonly kind: 'Time', readonly space: S, readonly time: Measure<T>, readonly fts: FTS}
const Time = <T extends AnyTimeUnit>(scalar: number, time:T): Time<undefined, T> => 
    ({  kind: 'Time', 
        space: undefined, 
        time: Measure(scalar, time), 
        fts: (_,_time) => {
            return { 
                space: Nothing(),
                time: Just( Measure(_time.quantity, _time.unit) )
            }
        }
    
    })

    

type AnyTime = Time<AnyTimeUnit>




type _Space<S extends AnySpaceUnit, T extends undefined> = 
    { readonly kind: 'Space', readonly scalar: number, readonly space: S, readonly time: T,  readonly fts: FTS}
type Space<S extends AnySpaceUnit> = _Space<S,undefined>
const Space = <T extends AnySpaceUnit>(scalar: number, space: T): Space<T> => 
    ({kind: 'Space', scalar, space, time: undefined, fts: (_space,_)=>_space})


type AnySpace = Space<AnySpaceUnit>



type Velocity<S extends AnySpaceUnit, T extends AnyTimeUnit> = 
    {readonly kind: 'Velocity', readonly scalar: number, readonly space: S, readonly time: T, readonly fts: FTS}

const Velocity = <S extends AnySpaceUnit, T extends AnyTimeUnit>(scalar: number, space: S, time: T): Velocity<S,T> => 
    ({kind: 'Velocity', scalar, space, time, fts: (_space,_time) => _space/_time})


type AnyVelocity = Velocity<AnySpaceUnit, AnyTimeUnit>


type Acceleration<S extends AnySpaceUnit, T extends AnyTimeUnit> = 
    {readonly kind: 'Acceleration', readonly scalar: number, readonly space: S, readonly time: T, readonly fts: FTS }

const Acceleration = <S extends AnySpaceUnit, T extends AnyTimeUnit>(scalar: number, space: S, time: T): Acceleration<S,T> => 
    ({ kind: 'Acceleration', scalar, space, time, fts: (_space, _time) => (_space/_time)/_time})



type AnyAcceleration = Acceleration<AnySpaceUnit, AnyTimeUnit>



// ------------------------


// tslint:disable: no-if-statement no-let no-expression-statement  no-var-keyword

type KinamaticObject<S extends AnySpaceUnit, T extends AnyTimeUnit> = 
    /*Time<T>*/ | Space<S> | Velocity<S,T> | Acceleration<S,T>
type AnyKinematicObject = KinamaticObject<AnySpaceUnit, AnyTimeUnit>
const KinamaticObject = <
    S extends AnySpaceUnit, 
    T extends AnyTimeUnit,
    >(  kind: AnyKinematicObject['kind'], 
        scalar: AnyKinematicObject['scalar'], 
        space: AnyKinematicObject['space'],
        time: AnyKinematicObject['time'],
        fts: AnyKinematicObject['fts'],
         ) => ({kind, scalar, space, time, fts})


const convert2 = <
    S0 extends AnySpaceUnit, 
    T0 extends AnyTimeUnit,
    S1 extends GetUnitsOfSameDimensionGivenAUnit<S0>,
    T1 extends GetUnitsOfSameDimensionGivenAUnit<T0>,
    >(o: KinamaticObject<S0,T0>, newSpaceUnit: S1, newTimeUnit: T1) => {

        const kind = o.kind
        const scalar = o.scalar
        const spaceUnit = o.space
        const timeUnit = o.time
        const fts = o.fts

        const ms = spaceUnit ? Measure(scalar, spaceUnit) : undefined
        const mt = timeUnit ? Measure(scalar, timeUnit) : undefined

        //const newSpaceMeasure = spaceUnit ? convertMeasure(, newTimeUnit as any) : undefined

        
    }

const a = convert2(Velocity(10,'meter','second'),)


// informal test

const Test = () => {

    const acce = AccelerationConstructor.meterPerSquareSecond(10)
    const vel = VelocityConstructor.milimeterPerSecond(10)

    const a = vel.space.unit 

    const conv = convertTimeDimension(vel, 'minute')

    const c2 = convertSpaceDimension(vel, 'minute')


}

// tslint:disable-next-line: no-expression-statement
Test()

