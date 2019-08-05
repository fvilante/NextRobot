import { PhysicalQuantityUtility, GetUnitsByDimension, PhysicalQuantity} from './quantity'
import { VectorSpace } from './vector-space'



// helpers and alias
type Vector = ReturnType<VectorSpace['Vector']>
const Vector = VectorSpace.Vector
type AnySpace = GetUnitsByDimension<'Space'>
type AnyTime = GetUnitsByDimension<'Time'>
type AnyUnit = AnySpace | AnyTime

type Constructor<_Type> = (value: any) => _Type

// --------


export type Position<T extends AnySpace> = {
    readonly kind: 'Position'
    readonly vector: Vector
    readonly unit: T
}

export const Position = <T extends AnySpace>(vector: Vector, unit: T): Position<T> => 
    ({kind:'Position', vector, unit})




// --------

/** Note: 'Time' type is a reserved world, this is reason for initial underscore character */
export type Time_<T extends AnyTime> = {
    readonly kind: 'Time'
    readonly scalar: number
    readonly unit: T
}

/** Note: 'Time' type is a reserved world, this is reason for initial underscore character */
export const Time_ = <T extends AnyTime>(scalar: number, unit: T): Time_<T> => 
    ({kind: 'Time', scalar, unit})



// --------


export type Displacement<T extends AnySpace> = {
    readonly kind: 'Displacement'
    readonly initial: Position<T>
    readonly final: Position<T>
}

export const Displacement = <
    T extends AnySpace
    >
    (initial: Position<T>, final: Position<T>): Displacement<T> =>
        ({ kind: 'Displacement', initial, final})



// ----

export type Velocity<S extends AnySpace, T extends AnyTime> = {
    readonly kind: 'Velocity'
    readonly value: {
        readonly displacement: Displacement<S>
        readonly time: Time_<T> 
    }
}


export const Velocity = <
    S extends AnySpace, 
    T extends AnyTime, 
    >
    (displacement: Displacement<S>, time: Time_<T> ): Velocity<S, T> => 
        ({
            kind: 'Velocity',
            value: { displacement, time }
        })


//helper
type AnyVelocity = Velocity<AnySpace, AnyTime>



// --------


export type Acceleration<V extends AnyVelocity, T extends AnyTime> = {
    readonly kind: 'Acceleration'
    readonly value: {
        readonly velocity: V
        readonly time: Time_<T>
    }
}


export const Acceleration = <
    V extends AnyVelocity, 
    T extends AnyTime,
    >
    (velocity: V, time: Time_<T> ): Acceleration<V, T> => 
        ({
            kind: 'Acceleration',
            value: { 
                velocity, 
                time 
            }
        })




