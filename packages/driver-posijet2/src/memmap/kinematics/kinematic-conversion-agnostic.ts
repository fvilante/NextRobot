
import { PhysicalArm } from '../../core-models/physical-arm'

import { 
    AnySpaceUnit as __AnySpaceUnit, 
    AnyTimeUnit as __AnyTimeUnit, 


    Time, Space, Velocity, Acceleration, VelocityConstructor,


} from './kinematic-types'
import { exhaustiveSwitch } from '@nextrobot/core-utils';



// ============= 
// This module do not do conversion of MpcTick and Pulses 
// the intention is to do this module application agnostic
// cmpp particular conversion types are considered in a particular
// module near this one
// =====

export type AnyTimeUnit = Exclude<__AnyTimeUnit, 'mpcTick'>
export type AnySpaceUnit =  Exclude<__AnySpaceUnit, 'pulse'>


// ==================================

export type ConversorBase<T extends string> = {
    [K in T]: {
        readonly fromBase: (_: number) => number
        readonly toBase: (_: number) => number
    }
}


// ============= Time Unit =============



const TimeConvertionBase: ConversorBase<AnyTimeUnit> = {
    
    // base
    'second': {
        fromBase: x => x,
        toBase: x => x,
    },

    'minute': {
        fromBase: x => x/60,
        toBase: x => x*60,
    },

}



const convertTimeUnit = (scalar: number, currentUnit: AnyTimeUnit, newUnit: AnyTimeUnit ): number => {

    const currentEntry = TimeConvertionBase[currentUnit]
    const newEntry = TimeConvertionBase[newUnit]

    const toBase = currentEntry.toBase
    const fromBase = newEntry.toBase

    const newScalar = fromBase(toBase(scalar))
    return newScalar


}



// ============= Space Unit =============


type SpaceConvertionBase = {
    [Unit in AnySpaceUnit]: {
        readonly fromBase: (_: number) => number
        readonly toBase: (_: number) => number
    }
}


const SpaceConvertionBase: ConversorBase<AnySpaceUnit> = {
    
    // base
    'milimeter': {
        fromBase: x => x,
        toBase: x => x,
    },

    'meter': {
        fromBase: x => x/60,
        toBase: x => x*60,
    },

}


const convertSpaceUnit = (scalar: number, currentUnit: AnySpaceUnit, newUnit: AnySpaceUnit ): number => {

    const currentEntry = SpaceConvertionBase[currentUnit]
    const newEntry = SpaceConvertionBase[newUnit]

    const toBase = currentEntry.toBase
    const fromBase = newEntry.toBase

    const newScalar = fromBase(toBase(scalar))
    return newScalar

}


// ============= General =============

const convertTime = <T extends AnyTimeUnit, N extends AnyTimeUnit>(o: Time<T>, newTimeUnit: N): Time<N> => {
    const {scalar, unit} = o
    const newScalar = convertTimeUnit(scalar, unit, newTimeUnit)
    const newTime = Time(newScalar, newTimeUnit)
    return newTime
}

const convertSpace = <S extends AnySpaceUnit, N extends AnySpaceUnit>(o: Space<S>, newSpaceUnit: N): Space<N> => {
    const {scalar, unit} = o
    const newScalar = convertSpaceUnit(scalar, unit, newSpaceUnit)
    const newTime = Space(newScalar, newSpaceUnit)
    return newTime
}

const convertVelocity = <
    S0 extends AnySpaceUnit, 
    T0 extends AnyTimeUnit, 
    S1 extends AnySpaceUnit, 
    T1 extends AnyTimeUnit
    >(o: Velocity<S0,T0>, newSpaceUnit: S1, newTimeUnit: T1): Velocity<S1,T1> => {
        const {scalar, timeUnit, spaceUnit} = o
        const newScalarSpace = convertSpaceUnit(1, spaceUnit, newSpaceUnit)
        const newScalarTime = convertTimeUnit(1, timeUnit, newTimeUnit)
        const fn = (space:number, time:number) => space/time
        const newScalar = fn(scalar*newScalarSpace, newScalarTime)
        const result = Velocity(newScalar, newSpaceUnit, newTimeUnit)
        return result
}

const convertAcceleration = <
    S0 extends AnySpaceUnit, 
    T0 extends AnyTimeUnit, 
    S1 extends AnySpaceUnit, 
    T1 extends AnyTimeUnit,
    >(o: Acceleration<S0,T0>, newSpaceUnit: S1, newTimeUnit: T1): Acceleration<S1,T1> => {
        const {scalar, timeUnit, spaceUnit} = o
        const newScalarSpace = convertSpaceUnit(1, spaceUnit, newSpaceUnit)
        const newScalarTime = convertTimeUnit(1, timeUnit, newTimeUnit)
        const fn = (space:number, time:number) => space/(time^2)
        const newScalar = fn(scalar*newScalarSpace, newScalarTime)
        const result = Acceleration(newScalar, newSpaceUnit, newTimeUnit)
        return result
}


type KinematicObject<S extends AnySpaceUnit, T extends AnyTimeUnit> = 
    Time<T> | Space<S> | Velocity<S,T> | Acceleration<S,T>

const convert = <
        S0 extends AnySpaceUnit, 
        T0 extends AnyTimeUnit, 
        S1 extends AnySpaceUnit, 
        T1 extends AnyTimeUnit,
    > (o: KinematicObject<S0,T0>, newSpaceUnit: S1, newTimeUnit: T1): KinematicObject<S1,T1> => {

        switch(o.kind) {

            case 'Space':
                return convertSpace(o, newSpaceUnit)
            case 'Time':
                return convertTime(o, newTimeUnit)
            case 'Velocity':
                return convertVelocity(o, newSpaceUnit, newTimeUnit)
            case 'Acceleration':
                return convertAcceleration(o, newSpaceUnit, newTimeUnit)
            default:
                return exhaustiveSwitch(o)

        }

}


const Test = () => {

    const o = VelocityConstructor.meterPerSecond(10)

    const b1 = convertVelocity(o, 'milimeter', 'second')

    const b2 = convert(o, 'milimeter', 'second')

    console.table(o)

    console.table(b1)

    console.table(b2)

}

// tslint:disable-next-line: no-expression-statement
Test()