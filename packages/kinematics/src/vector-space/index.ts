import { Vector, addVector as add, multByScalar, subtract } from './euclidean-vector-space-R3'


type VectorConstructor = (x: number, y: number, z: number) => Vector

type AdditionOperation = (vecA: Vector, vecB: Vector) => Vector

type MultiplyByScalar = (scalar: number, vec: Vector) => Vector


// Vector api

/** Note: This is a particular instance of vector-space, more specificaly 
 * Euclidean Vector Space on R3 */
export interface VectorSpace {
    readonly Vector: VectorConstructor
    readonly add: AdditionOperation
    readonly multByScalar: MultiplyByScalar 
    readonly subtract: AdditionOperation // (subtract is same of sum by (-1)*vec). Is here just for convenience
}

export const VectorSpace: VectorSpace = {
    Vector,
    add,
    multByScalar,
    subtract
}