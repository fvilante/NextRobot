import { flattenDeep } from "@nextrobot/core-utils";

export type OnePredicate<T> = (element  : T) => boolean
export type ManyPredicate<T> = (elements: readonly T[]) => boolean

export const run = <T>(p: OnePredicate<T>, element: T): boolean => {
    return p(element)
}


const isOneOrElse = <T>(ps: readonly OnePredicate<T>[]): OnePredicate<T> => {
    return (element: T) => ps.map( p => p(element)).some( test => test === true)
}

const isOneAndThen = <T>(ps: readonly OnePredicate<T>[]): OnePredicate<T> => {
    return (element: T) => ps.map( p => p(element)).every( test => test === true)
}

const matchAll = <T>(ps: readonly OnePredicate<T>[]): ManyPredicate<T> => {
    return (elements: readonly T[]) => {
        // tslint:disable-next-line: no-if-statement
        if (ps.length !== elements.length) return false
        return flattenDeep(ps.map( p => elements.map( e => p(e)))).every( test => test===true)
    }
}
