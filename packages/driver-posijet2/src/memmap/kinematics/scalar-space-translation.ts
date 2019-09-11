import { AnyTranslationUnit } from "./unit-core"

// ---- Translation ------


export type Translation<T extends AnyTranslationUnit> = { readonly kind: 'Translation', readonly scalar: number, readonly translationUnit: T }
export const Translation = <T extends AnyTranslationUnit>(scalar: number, translationUnit: T): Translation<T> => ({kind: 'Translation', scalar, translationUnit})

export type AnyTranslation = Translation<AnyTranslationUnit>


export type TranslationConstructor = {
    readonly milimeter: (_: number) => Translation<'milimeter'> 
    readonly meter: (_: number) => Translation<'meter'>
    readonly pulse: (_: number) => Translation<'linear-pulse'>
}

export const TranslationConstructor: TranslationConstructor = {
    milimeter: _ => Translation(_, 'milimeter'),
    meter: _ => Translation(_, 'meter'),
    pulse: _ => Translation(_, 'linear-pulse'),
}
