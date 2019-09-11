import { AnyRotationUnit } from "./unit-core"




// ---- Rotation ------


export type Rotation<T extends AnyRotationUnit> = { readonly kind: 'Rotation', readonly scalar: number, readonly rotationUnit: T }
export const Rotation = <T extends AnyRotationUnit>(scalar: number, rotationUnit: T): Rotation<T> => ({kind: 'Rotation', scalar, rotationUnit})

export type AnyRotation = Rotation<AnyRotationUnit>


export type AngleConstructor = {
    readonly radian: (_: number) => Rotation<'radian'> 
    readonly degree: (_: number) => Rotation<'degree'>
    readonly angularPulse: (_: number) => Rotation<'angular-pulse'>
}
export const AngleConstructor: AngleConstructor = {
    radian: _ => Rotation(_, 'radian'),
    degree: _ => Rotation(_, 'degree'),
    angularPulse: _ => Rotation(_, 'angular-pulse'),
}
