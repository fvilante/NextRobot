// todo: how todo a static type check in this number ?
// see: https://github.com/Microsoft/TypeScript/issues/15480
// todo: Make all types and interface readonly and DeepReadOnlyArray<>
export type Size = number
export type Byte = number // must be an integer between 0 and 255
export type Bytes = Byte[]
export type Bit = number    
export type Word = number //16 bits unsiged integer


//helper
export function getNthBit(bitIndex: number, value: number ): boolean {
    const mask = 1 << bitIndex
    if ((value & mask) != 0)
        return true
    else
        return false
}


export const ByteC = (n: number): number => n
export const BytesC = (n: Array<number>): Array<number> => n