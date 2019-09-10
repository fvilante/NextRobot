import { PhysicalQuantityUtility } from "@nextrobot/kinematics/lib/quantity/physical-quantity-core"
import { PhysicalArm } from "../../core-models/physical-arm"

export type ConversorBase<T extends string> = {
    [K in T]: {
        readonly fromBase: (_: number) => number
        readonly toBase: (_: number) => number
    }
}


type FromTo<T extends string> = {
    readonly kind: T
    readonly fromBase: (_: number) => number
    readonly toBase: (_: number) => number
}


// base
const milimeter: FromTo<'milimeter'> = {
    kind: 'milimeter',
    fromBase: x => x,
    toBase: x => x
}

const meter: FromTo<'meter'> = {
    kind: 'meter',
    fromBase: x => x*1000,
    toBase: x => x/1000,
}

const pulse = (p: PhysicalArm): FromTo<'pulse'> => {
    return {
        kind: 'pulse',
        fromBase: x => x*1000,
        toBase: x => x/1000,
    }
}

type Space = 'milimeter' | 'meter' | 'pulse'

const convertSpace = <T extends Space>(scalar: number, source: FromTo<T>, target: FromTo<T> ): number => {

    const toBase = source.toBase
    const fromBase = target.fromBase

    const newScalar = fromBase(toBase(scalar))

    return newScalar

}


