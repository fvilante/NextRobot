
// tslint:disable: readonly-array

type Type<T extends string, N extends number> = [T, N]
const Type = <T extends string, N extends number>(type: T, expoent: N): Type<T,N> => [type, expoent]


type Dim<T extends {[K in string]: number}> = {
    [D in keyof T]: T[D]
}


const a = Type('mm',1)

const mm = Type('mm',1)
const sec = Type('sec',2)
const sec2 = Type('sec',2)
const mmsec2 = [Type('mm',1), Type('sec',-2)]


type TimeDim<E extends number> = {
    readonly T: E
}

type SpaceDim<E extends number> = {
    readonly S: E
}

type AngleDim<E extends number> = {
    readonly A: E
}


type VelocityDim = {
    readonly S: 1
    readonly T: -1
}

type Acceleration<S,T> = {
    readonly S:1, readonly T:-2
}

type A = VelocityDim
type B = 



type TypedNumber = { readonly number: number, readonly type: Type}