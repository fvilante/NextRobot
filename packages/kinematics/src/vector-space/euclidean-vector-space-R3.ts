
// ==================================
//  Euclidean 3D vector-sapce
// ==================================

// ---------------------------------
//  Vector constructor
// ---------------------------------


export type Vector = {
    readonly x: number
    readonly y: number
    readonly z: number
}

export const Vector = (x:number, y:number, z:number): Vector => ({x, y, z }) 


// ---------------------------
// Vector-Space Operations
// ---------------------------

import { mapObjectIndexed } from '@nextrobot/core-utils'
import { HomeomorphicMap } from '../utils';


type ScalarOperation = HomeomorphicMap<number>

// Scalar operations primitives
const addScalar: ScalarOperation = (a,b) => a+b
const multiplyScalar: ScalarOperation = (a,b) => a*b


// 3d vector operations

export const addVector = (vecA: Vector, vecB: Vector): Vector => 
    mapObjectIndexed(vecA, (eachScalar, eachAxis) => 
        addScalar(eachScalar, vecB[eachAxis]))

export const multByScalar = (scalar: number, vecA: Vector): Vector => 
    mapObjectIndexed(vecA, __scalar => 
        multiplyScalar(__scalar, scalar)
    )

/** Note: subtract vector B from vector A */
export const subtract = (vecA: Vector, vecB: Vector): Vector => 
    addVector(vecA, multByScalar(-1, vecB))







