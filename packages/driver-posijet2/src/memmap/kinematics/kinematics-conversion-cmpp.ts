import {
    ConversorBase
} from './kinematic-conversion-agnostic'

import {
    AnySpaceUnit as __AnySpaceUnit,
    AnyTimeUnit as __AnyTimeUnit,

    Time, Space, Velocity, Acceleration, VelocityConstructor,

} from './kinematic-types'

import { PhysicalArm } from '../../memmap_OLD/core-models/physical-arm';
import { exhaustiveSwitch } from '@nextrobot/core-utils';


/**
 * In this module we deal with the convertion of time-space from milimeter and second
 * to microcontroler-tick-clock and pulse which are CMPP data types (and vice-versa)
 */

// ============== parametrization ==================


type CMPPSpaceUnit = Extract<__AnySpaceUnit, 'pulse'>
type CMPPTimeUnit = Extract<__AnyTimeUnit, 'mpcTick'>

type BaseSpaceUnit = Extract<__AnySpaceUnit, 'milimeter'>
type BaseTimeUnit = Extract<__AnyTimeUnit, 'second'>

type AnySpaceUnit = CMPPSpaceUnit | BaseSpaceUnit
type AnyTimeUnit = CMPPTimeUnit | BaseTimeUnit

// ---------------------------------------------


const TimeConversor = (mpcTimeRatio: number): ConversorBase<AnyTimeUnit> => {

    return  { 
        // base    
        'second': {
            fromBase: _ => _,
            toBase: _ => _,
        },

        'mpcTick': {
            fromBase: _ => _,
            toBase: _ => _,
        },  
    }

}


const convertTimeUnit = (mpcTimeRatio: number) => (scalar: number, currentUnit: AnyTimeUnit, newUnit: AnyTimeUnit ): number => {
    
    const _TimeConversor = TimeConversor(mpcTimeRatio) 

    const currentUnitEntry = _TimeConversor[currentUnit]
    const newUnitEntry = _TimeConversor[newUnit]

    const toBase = currentUnitEntry.toBase
    const fromBase = newUnitEntry.fromBase

    const newScalar = fromBase(toBase(scalar))

    return newScalar

}



// ---------------------------------------------


const SpaceConversor = (p: PhysicalArm): ConversorBase<AnySpaceUnit> => {

    return  { 
        // base    
        'milimeter': {
            fromBase: _ => _,
            toBase: _ => _,
        },

        'pulse': {
            fromBase: _ => _,
            toBase: _ => _,
        }, 
    }

}



const convertSpaceUnit = (p: PhysicalArm) => (scalar: number, currentUnit: AnySpaceUnit, newUnit: AnySpaceUnit ): number => {
    
    const _SpaceConversor = SpaceConversor(p) 

    const currentUnitEntry = _SpaceConversor[currentUnit]
    const newUnitEntry = _SpaceConversor[newUnit]

    const toBase = currentUnitEntry.toBase
    const fromBase = newUnitEntry.fromBase

    const newScalar = fromBase(toBase(scalar))

    return newScalar

}


// ============= General =============

const convertTime = (mpcTimeRatio: number) => <T extends AnyTimeUnit, N extends AnyTimeUnit>(o: Time<T>, newTimeUnit: N): Time<N> => {
    const {scalar, unit} = o
    const newScalar = convertTimeUnit(mpcTimeRatio)(scalar, unit, newTimeUnit)
    const newTime = Time(newScalar, newTimeUnit)
    return newTime
}

const convertSpace = (p: PhysicalArm) => <S extends AnySpaceUnit, N extends AnySpaceUnit>(o: Space<S>, newSpaceUnit: N): Space<N> => {
    const {scalar, unit} = o
    const newScalar = convertSpaceUnit(p)(scalar, unit, newSpaceUnit)
    const newTime = Space(newScalar, newSpaceUnit)
    return newTime
}

//todo: Refactor! 1) It's not necessary that much type-parameters 2) remove redundance among this function and other modules: there would exist a less prolix solution that stil assure decoupling
const convertVelocity = (mpcTimeRatio: number, p: PhysicalArm) => <
    S0 extends AnySpaceUnit, 
    T0 extends AnyTimeUnit, 
    S1 extends AnySpaceUnit, 
    T1 extends AnyTimeUnit
    > (o: Velocity<S0,T0>, newSpaceUnit: S1, newTimeUnit: T1): Velocity<S1,T1> => {
        const {scalar, timeUnit, spaceUnit} = o
        const newScalarSpace = convertSpaceUnit(p)(1, spaceUnit, newSpaceUnit)
        const newScalarTime = convertTimeUnit(mpcTimeRatio)(1, timeUnit, newTimeUnit)
        const fn = (space:number, time:number) => space/time
        const newScalar = fn(scalar*newScalarSpace, newScalarTime)
        const result = Velocity(newScalar, newSpaceUnit, newTimeUnit)
        return result
}

const convertAcceleration = (mpcTimeRatio: number, p: PhysicalArm) => <
    S0 extends AnySpaceUnit, 
    T0 extends AnyTimeUnit, 
    S1 extends AnySpaceUnit, 
    T1 extends AnyTimeUnit,
    > (o: Acceleration<S0,T0>, newSpaceUnit: S1, newTimeUnit: T1): Acceleration<S1,T1> => {
        const {scalar, timeUnit, spaceUnit} = o
        const newScalarSpace = convertSpaceUnit(p)(1, spaceUnit, newSpaceUnit)
        const newScalarTime = convertTimeUnit(mpcTimeRatio)(1, timeUnit, newTimeUnit)
        const fn = (space:number, time:number) => space/(time^2)
        const newScalar = fn(scalar*newScalarSpace, newScalarTime)
        const result = Acceleration(newScalar, newSpaceUnit, newTimeUnit)
        return result
}


type KinematicObject<S extends AnySpaceUnit, T extends AnyTimeUnit> = 
    Time<T> | Space<S> | Velocity<S,T> | Acceleration<S,T>

type AnyKinematicObject = KinematicObject<AnySpaceUnit,AnyTimeUnit>

const convert = <
        S0 extends AnySpaceUnit, 
        T0 extends AnyTimeUnit, 
        S1 extends AnySpaceUnit, 
        T1 extends AnyTimeUnit,
    > (mpcTimeRatio: number, p: PhysicalArm) =>  
    (o: KinematicObject<S0,T0>, newSpaceUnit: S1, newTimeUnit: T1): AnyKinematicObject => {

        switch(o.kind) {

            case 'Space':
                return convertSpace(p)(o, newSpaceUnit)
            case 'Time':
                return convertTime(mpcTimeRatio)(o, newTimeUnit)
            case 'Velocity':
                return convertVelocity(mpcTimeRatio,p)(o, newSpaceUnit, newTimeUnit)
            case 'Acceleration':
                return convertAcceleration(mpcTimeRatio,p)(o, newSpaceUnit, newTimeUnit)
            default:
                return exhaustiveSwitch(o)

        }

}


const Test = () => {

    const mpcTimeRatio = 1024
    const p: PhysicalArm = {
        beltStepInMilimeters: 5.08,
        pulsesPerMotorRevolution: 400,
        teethOnTheMotorPulley: 12,
    }

    const o = VelocityConstructor.milimeterPerSecond(10)

    const b1 = convertVelocity(mpcTimeRatio,p)(o, 'milimeter', 'second')

    const b2 = convert(mpcTimeRatio,p)(o, 'pulse', 'mpcTick')

    console.table(o)

    console.table(b1)

    console.table(b2)

}

// tslint:disable-next-line: no-expression-statement
Test()



