import { AnyUnit } from "./unit-core"



// -------------- core -------------- 

export type FromTo<T extends AnyUnit> = {
    readonly kind: T
    readonly fromBase: (_: number) => number
    readonly toBase: (_: number) => number
}

export const __unsafeConvert = <T extends AnyUnit>(scalar: number, source: FromTo<T>, target: FromTo<T> ): number => {

    const toBase = source.toBase
    const fromBase = target.fromBase

    const newScalar = fromBase(toBase(scalar))

    return newScalar

}

/** intended to instantiate a type-safe converter */
export type Converter<T extends AnyUnit> = (scalar:number, source: FromTo<T>, target: FromTo<T>) => number
