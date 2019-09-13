import { Maybe, Just, Nothing } from "@nextrobot/core-utils"


type ScalarTransformation = (scalar: number) => number

type UnitConversionFn<B> =  (scalar: number) => readonly [number, B]



// ------------- Time -------------

type Time<T> = {
    readonly kind: 'Time'
    readonly timeScalar: number
    readonly timeUnit: T
    readonly __timeTransformation: ScalarTransformation

}

const Time = <T>(scalarTime: number, timeUnit: T): Time<T> => 
    ({kind: 'Time', timeScalar: scalarTime, timeUnit, __timeTransformation: x => x})


type TimeMap = <A,B>(o: Time<A>, fn: UnitConversionFn<B>) => Time<B>
const TimeMap: TimeMap = (o, fn) => Time(...fn(o.timeScalar))


// ------------- LinearMotion -------------


type LinearMotion<M> = {
    readonly kind: 'LinearMotion'
    readonly motionScalar: number 
    readonly motionUnit: M
    readonly motionTransformation: ScalarTransformation
}

const LinearMotion = <M>(motionScalar: number, motionUnit: M): LinearMotion<M> => 
    ({kind: 'LinearMotion', motionScalar, motionUnit, motionTransformation: x => x})


type LinearMotionMap = <A,B>(o: LinearMotion<A>, fn: UnitConversionFn<B>) => LinearMotion<B>
const LinearMotionMap: LinearMotionMap = (o, fn) => LinearMotion(...fn(o.motionScalar))



type LinearVelocity<M,T> = {
    readonly kind: 'LinearVelocity'
    readonly motionScalar: number 
    readonly timeScalar: number
    readonly motionUnit: M 
    readonly timeUnit: T 
    readonly motionTransformation: ScalarTransformation
    readonly timeTransformation: ScalarTransformation
}

const LinearVelocity = <M,T>(scalar: number, motionUnit: M, timeUnit: T): LinearVelocity<M,T> => 
    ({kind: 'LinearVelocity', motionScalar: scalar, timeScalar: 1, motionUnit, timeUnit, motionTransformation: x => x, timeTransformation: x => x})

type LinearAcceleration<M,T> = {
    readonly kind: 'LinearAcceleration'
    readonly motionScalar: number 
    readonly timeScalar: number
    readonly motionUnit: M 
    readonly timeUnit: T 
    readonly motionTransformation: ScalarTransformation
    readonly timeTransformation: ScalarTransformation
}

const LinearAcceleration = <M,T>(scalar: number, motionUnit: M, timeUnit: T): LinearAcceleration<M,T> => 
    ({kind: 'LinearAcceleration', motionScalar: scalar, timeScalar: 1, motionUnit, timeUnit, motionTransformation: x => x, timeTransformation: x => x^2})


export type LinearKinematicCategory<M,T> = {
    readonly kind: 'LinearKinematicCategory'
    readonly __linearMotionUnit: M
    readonly __timeUnit: T 
    readonly Time: Time<T>
    readonly Motion: LinearMotion<M>
    readonly Velocity: LinearVelocity<M,T>
    readonly Acceleration: LinearAcceleration<M,T>

}



