import { Bit8Value } from './common';
import { FunctionLike } from 'typescript';


// todo: how todo a static type check in this number ?
// see: https://github.com/Microsoft/TypeScript/issues/15480
// todo: Make all types and interface readonly and DeepReadOnlyArray<>
export type Byte = number // must be an integer between 0 and 255
export type Bytes = Byte[]
export type Size = number
export type Bit = number    
export type Word = number //16 bits unsiged integer

export type Func<T,R> = ((ft: T) => R)



// ============================

// ===================


//helper
function getNthBit(bitIndex: number, value: number ): boolean {
    const mask = 1 << bitIndex
    if ((value & mask) != 0)
        return true
    else
        return false
}


export interface Bit8Value {
    0: boolean
    1: boolean
    2: boolean
    3: boolean
    4: boolean
    5: boolean
    6: boolean
    7: boolean
}

export const bit8Value = (b: Byte): Bit8Value => ({
    0: getNthBit(0, b),
    1: getNthBit(1, b),
    2: getNthBit(2, b),
    3: getNthBit(3, b),
    4: getNthBit(4, b),
    5: getNthBit(5, b),
    6: getNthBit(6, b),
    7: getNthBit(7, b),
})


export interface Bit8Description {
    0: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    7: string
}


export interface Bit16Value  {
    0: boolean
    1: boolean
    2: boolean
    3: boolean
    4: boolean
    5: boolean
    6: boolean
    7: boolean

    8: boolean
    9: boolean
    10: boolean
    11: boolean
    12: boolean
    13: boolean
    14: boolean
    15: boolean
}

export const bit16Value = (b: Word): Bit16Value => ({
    0: getNthBit(0, b),
    1: getNthBit(1, b),
    2: getNthBit(2, b),
    3: getNthBit(3, b),
    4: getNthBit(4, b),
    5: getNthBit(5, b),
    6 :getNthBit(6, b),
    7: getNthBit(7, b),
    8: getNthBit(8, b),
    9: getNthBit(9, b),
    10: getNthBit(10, b),
    11: getNthBit(11, b),
    12: getNthBit(12, b),
    13: getNthBit(13, b),
    14: getNthBit(14, b),
    15: getNthBit(15, b),
})




export interface Bit16Description {
    0: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    7: string
    
    8: string
    9: string
    10: string
    11: string
    12: string
    13: string
    14: string
    15: string
}






