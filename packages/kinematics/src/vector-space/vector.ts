
import { Scalar } from './scalar'

export type Vector = {
    readonly x: Scalar
    readonly y: Scalar
    readonly z: Scalar
}

export const Vector = (x:number, y:number, z:number): Vector => ({x: Scalar(x), y: Scalar(y), z: Scalar(z) }) 


