import { Maybe, Nothing, Just } from "./maybe"
import { foldLeftArray } from "../array/foldLeftArray"
import { flattenDeep } from "../array/ArrayFlattenDeep"
import { Pair } from "./pair"

type TKey = string | number | symbol    // todo: extract this type definition to a exclusive file 

export type List<A> = {
    readonly kind: 'List'

    readonly unsafeRun: () => readonly A[]

    readonly map: <B>(f: (_:A) => B) => List<B>
    readonly fmap: <B>(f: (_:A) => List<B>) => List<B>
    readonly foldLeft: <T>(initialValue: T, fn: (acc: T, cur: A) => T ) => T
    readonly pickByIndex: (index: number) => Maybe<A>
    readonly length: () => number
    readonly every: (predicate: (_:A) => boolean ) => boolean

    readonly mapMaybe: <B>(f: (_:A) => Maybe<B>) => List<B> //do not transfer if 'nothing'

    readonly head: () => Maybe<A> 

    readonly toPairs: () => List<Pair<number,A>> 

}

/** Similar to ReadonlyArray<T> but more type constrained and functional (but not lazy)
 * todo: make construction less dependent from JS array implementation. 
 * todo: verify if would have positive side to have a Lazy list. What pros and cons evolved?
 * ATTENTION: Eager evaluation here!*/
export const List = <A>(arr: readonly A[]): List<A> => {

    type T = List<A>

    const unsafeRun: T['unsafeRun'] = () => {
        return arr
    }

    const pickByIndex: T['pickByIndex'] = index => {
        const arr = unsafeRun()
        const isOutOfRange = (arr.length-1) > index 
        return isOutOfRange ? Nothing<A>() : Just(arr[index])
    }

    const map: T['map'] = f => {
        const arr = unsafeRun()
        return List( arr.map(f) )
    }

    const fmap: T['fmap'] = f => {
        return List_.flatten( map(f) )
    }

    const foldLeft: T['foldLeft'] = (initial, fn) => {
        const arr = unsafeRun()
        return foldLeftArray(arr, initial, fn )
    }

    const every: T['every'] = f => {
        const arr = unsafeRun()
        return arr.every(f)
    }

    const length: T['length'] = () => {
        const arr = unsafeRun()
        return arr.length
    }

    const mapMaybe: T['mapMaybe'] = f => {
        type B = ReturnType<ReturnType<typeof f>['_fromJust']>
        const r = foldLeft([] as readonly B[], (acc, cur) => {
            const mb = f(cur)
            return mb.match({
                Just: val => [...acc, val],
                Nothing:     acc,
            }) 
        })
        return List(r)
    }

    const head: T['head'] = () => { 
        return pickByIndex(0)
    }

    const toPairs: T['toPairs'] = () => {
        const arr = unsafeRun()
        const a = arr.map( (value, index) => Pair(index, value))
        const b = List(a)
        return b 
    }


    return {
        kind: 'List',
        unsafeRun,
        map,
        fmap,
        foldLeft,
        pickByIndex,
        length,
        every,
        mapMaybe,
        head,
        toPairs,
    }
}

// static part

export type List_ = {
    readonly flatten: <A>(mma: List<List<A>>) => List<A>
    readonly head: <A>(_: List<A>) => Maybe<A> // inspired in Elm language (Note: Check performance, don't think is it so performant)
}


const flatten: List_['flatten'] = mma => {
    type List = ReturnType<(typeof mma)['unsafeRun']>[0]
    type A = ReturnType<List['unsafeRun']>[0]
    const arr = mma.unsafeRun()
    const a = arr.map( x => x.unsafeRun())
    const b = flattenDeep<readonly A[],A>(a)
    return List(b)
}

const head: List_['head'] = a => { 
    return a.head()
}

export const List_: List_ = {
    flatten,
    head,
}


// informal test

const Test = () => {

    const a = List([1,2,3,4,5,8]).map( x => String(x))

}


// tslint:disable-next-line: no-expression-statement
// Test()