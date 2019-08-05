import { Vector } from './vector'
import { Scalar } from './scalar'
import { mapObjectIndexed } from '@nextrobot/core-utils'
import { HomeomorphicMap } from '../utils';


type ScalarOperation = HomeomorphicMap<Scalar>

// Scalar operations primitives
const addScalar: ScalarOperation = (a,b) => Scalar(a.scalar + b.scalar)
const subtractScalar: ScalarOperation = (a,b) => Scalar(a.scalar - b.scalar)
const multiplyScalar: ScalarOperation = (a,b) => Scalar(a.scalar * b.scalar)


// 3d vector operations

export const add = (vecA: Vector, vecB: Vector): Vector => 
    mapObjectIndexed(vecA, (eachScalar, eachAxis) => 
        addScalar(eachScalar, vecB[eachAxis]))

export const multByScalar = (vecA: Vector, B: Scalar): Vector => 
    mapObjectIndexed(vecA, scalar => 
        multiplyScalar(scalar, B)
    )

/** Note: subtract vector B from vector A */
export const subtract = (vecA: Vector, vecB: Vector): Vector => 
mapObjectIndexed(vecA, (eachScalarA, eachAxis) => {
    const eachScalarB = vecB[eachAxis]
    return subtractScalar(eachScalarA, eachScalarB)
})

