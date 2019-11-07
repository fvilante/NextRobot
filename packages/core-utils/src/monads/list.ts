import { Maybe, Nothing, Just } from "./maybe"
import { foldLeftArray } from "../array/foldLeftArray"
import { flattenDeep } from "../array/ArrayFlattenDeep"


export type List<A> = {
    readonly kind: 'List'

    readonly map: <B>(f: (_:A) => B) => List<B>
    readonly fmap: <B>(f: (_:A) => List<B>) => List<B>
    readonly foldLeft: <T>(initialValue: T, fn: (acc: T, cur: A) => T ) => T
    readonly pickByIndex: (index: number) => Maybe<A>
    readonly _unsafePickByIndex: (index: number) => A //will throw if at index no parameter exists
    readonly length: () => number
    readonly toArray: () => readonly A[]
    readonly every: (predicate: (_:A) => boolean ) => boolean

    readonly mapMaybe: <B>(f: (_:A) => Maybe<B>) => List<B> //do not transfer if 'nothing'
}



/** Similar to ReadonlyArray<T> but more type constrained and functional (but not lazy)
 * todo: make construction less dependent from JS array implementation. */
export const List = <A>(arr: readonly A[]): List<A> => {

    const map: List<A>['map'] = f => {
        return List( arr.map(f) )
    }

    const fmap: List<A>['fmap'] = f => {
        return List_.flatten( map(f) )
    }

    const foldLeft: List<A>['foldLeft'] = (initial, fn) => {
        return foldLeftArray(arr, initial, fn )
    }

    const pickByIndex: List<A>['pickByIndex'] = index => {
        const isOutOfRange = (arr.length-1) > index 
        return isOutOfRange ? Nothing<A>() : Just(arr[index])
    }

    const every: List<A>['every'] = f => {
        return arr.every(f)
    }

    const _unsafePickByIndex: List<A>['_unsafePickByIndex'] = index => arr[index]

    const length: List<A>['length'] = () => arr.length

    const toArray: List<A>['toArray'] = () => arr

    const mapMaybe: List<A>['mapMaybe'] = f => {
        type B = ReturnType<ReturnType<typeof f>['_fromJust']>
        const r = foldLeft([] as readonly B[], (acc, cur) => {
            const mb = f(cur)
            return mb.isJust ? [...acc, mb._fromJust()] : acc
        })
        return List(r)
    }

    return {
        kind: 'List',
        map,
        fmap,
        foldLeft,
        pickByIndex,
        _unsafePickByIndex,
        length,
        toArray,
        every,
        mapMaybe,

    }
}

// static part

export type List_ = {
    readonly flatten: <A>(mma: List<List<A>>) => List<A> 
}


const flatten: List_['flatten'] = mma => {
    type A = ReturnType<ReturnType<typeof mma._unsafePickByIndex>['_unsafePickByIndex']>
    const arrarr = mma.toArray().map( x => x.toArray())
    const arr = flattenDeep<readonly A[],A>(arrarr)
    return List(arr)

}

export const List_: List_ = {
    flatten,
}


// informal test

const Test = () => {

    const a = List([1,2,3,4,5,8]).map( x => String(x))

}


// tslint:disable-next-line: no-expression-statement
// Test()