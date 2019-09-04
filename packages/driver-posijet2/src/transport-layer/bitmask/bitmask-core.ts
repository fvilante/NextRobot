import { mapObjectIndexed } from '@nextrobot/core-utils'

/** Helper to represent bitwise data from a core type where key represents the bit position and value represents a label describing that bit*/

/** a base representation. everything starts here */
type AnyBitmaskBase = {readonly [bit: number]: string}

export type Bitmask<T extends AnyBitmaskBase > = {
    [Bit in keyof T]: {readonly label: T[Bit], readonly value: boolean}
}

export const Bitmask = <T extends AnyBitmaskBase>(bitmaskBase: T, value: number): Bitmask<T> => {
    const getBit = (bitPosition: number, value: number):boolean => 
        (value & (1 << bitPosition)) === 0 ? false : true     
    const t = mapObjectIndexed(bitmaskBase, (label, bit) => ({
        label,
        value: getBit(bit as number, value),
    }) )
    return t as Bitmask<T> //todo: is it possible to remove this type coersion ? Maybe this result in a improvement in mapObjectIndexed
}

/** factory */
export type BitmaskCreator<T extends AnyBitmaskBase> = (_: number) => Bitmask<T>