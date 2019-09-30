import { A, C, B } from "ts-toolbelt"
import map from "ramda/es/map"
import { foldLeftArray } from "../array/foldLeftArray"
import either from "ramda/es/either"

// ================================================
// Haskell Either
// ================================================


//Either is just like Maybe
//Right is just like Some
//Left is just like None, except you can include content with it to describe the problem



// ----------------------------------------------------------------
//  BASE DATA TYPES
// ----------------------------------------------------------------

type _Right<A> = {
    readonly kind: 'Right'
    readonly value: A
}
const _Right = <A>(value:A):_Right<A> => ({kind:'Right', value})

type _Left<A> = {
    readonly kind: 'Left'
    readonly value: A
}
const _Left = <A>(value:A):_Left<A> => ({kind:'Left', value})


// ----------------------------------------------------------------
//  TYPE GUIARDS OF BASE DATA TYPES
// ----------------------------------------------------------------

const _isRight = <A,B>(data:  _Left<A> | _Right<B> ): data is _Right<B> => 
    (data as _Right<B>).kind === 'Right'

const _isLeft = <A,B>(data:  _Left<A> | _Right<B> ): data is _Left<A> => 
    (data as _Left<A>).kind === 'Left'


// ----------------------------------------------------------------
//  MAIN EITHER MONAD
// ----------------------------------------------------------------

export type Either<A, B> = {

    //readonly kind: 'Either'

    readonly map: <C>(f: (_:B) => C) => Either<A,C>

    readonly fmap: <C>(f: (_:B) => Either<A,C>) => Either<A,C>

    //readonly join: <C>(mmc: Either<A,Either<A,C>>) => Either<A,C>

    readonly isLeft: () => boolean

    readonly isRight: () => boolean 

    readonly fromLeft: (defaultValue: A) => A

    readonly fromRight: (defaultValue: B) => B

    readonly getValue: () => A | B

    readonly match: <C>(leftFn: (a:A) => C, rightFn: (b:B) => C ) => C

 
}

export const Either = <A,B>(value: _Left<A> | _Right<B>): Either<A,B> => {

    const main = (): Either<A,B> => ({

        map: <C>(f: (_:B) => C):Either<A,C> => 
            _isLeft(value) ? Either<A,C>(value) : Either<A,C>(_Right(f(value.value))),

        fmap: <C>(f: (_:B) => Either<A,C>): Either<A,C> =>
            _isLeft(value) ? Either<A,C>(value) : f(value.value),

        isLeft: ():boolean => _isLeft(value),

        isRight: ():boolean => _isRight(value),

        fromLeft: (defaultValue: A): A => _isLeft(value) ? value.value : defaultValue,

        fromRight: (defaultValue: B): B => _isRight(value) ? value.value : defaultValue,

        getValue: (): A | B => _isLeft(value) ? value.value : value.value,

        match: <C>(leftFn: (a:A) => C, rightFn: (b:B) => C ):C => value.kind === 'Left' ? leftFn(value.value) : rightFn(value.value)

    })

    return main()

}


// ----------------------------------------------------------------
//  HELPER CONSTRUCTORS
// ----------------------------------------------------------------

/** ATTENTION: Every time you create an Either you MUST type coerse to correct identify its left and right side.
 *  When you istantiate a Left side in Either, it could not infer correctly the right side,
 *  and vice-versa. See unit test for more examples. (To FIX if possible)
 */
export const Left = <A,B>(value:A): Either<A,B> => Either(_Left(value))

/** ATTENTION: Every time you create an Either you MUST type coerse to correct identify its left and right side.
 *  When you istantiate a Left side in Either, it could not infer correctly the right side,
 *  and vice-versa. See unit test for more examples. (To FIX if possible)
 */
export const Right = <A,B>(value:B): Either<A,B> => Either(_Right(value))

// ----------------------------------------------------------------
//  EITHER OPERATIONS
// ----------------------------------------------------------------

//

/** Extracts from a list of Either all the Left elements. All the Left elements are extracted in order. */
export const filterByLeft = <A,B>(es: readonly Either<A,B>[]): readonly A[] => {

    return foldLeftArray(es, [] as readonly A[], (acc, cur) => {
        return cur.isLeft() ? [...acc, cur.getValue() as A] : acc

    })

}

/** Extracts from a list of Either all the Right elements. All the Right elements are extracted in order */
export const filterByRight = <A,B>(es: readonly Either<A,B>[]): readonly B[] => {

    return foldLeftArray(es, [] as readonly B[], (acc, cur) => {
        return cur.isRight() ? [...acc, cur.getValue() as B] : acc
    })
    
}


/** Case analysis for the Either type. If the value is Left a, apply the first function to a; if it is Right b, apply the second function to b. */
export const matchEither = <A,B,C>(_: Either<A,B>, leftFn: (a:A) => C, rightFn: (b:B) => C): C => {

    return _.isLeft()
        ? leftFn( (_.getValue() as A) )
        : rightFn( (_.getValue() as B) )

}


// informal test


const Test1 = () => {

    // compose in an array and use filterBy...

    type Z = Either<number|string,string[]> //arbitrary type

    const a = Left(1) as Z
    const b = Left(2) as Z
    const c = Left('erro') as Z
    const d = Right(['hello','juca']) as Z
    const f = d.map( msg => [...msg, 'world'])
    const arr1 = [a,b,c,d,f]

    const _lefts = filterByLeft(arr1) // ok -> readonly (string | number)[]
    const _rights = filterByRight(arr1) // ok -> readonly string[][]

    console.log(`lefts`, _lefts)
    console.log(`rights`, _rights)

}

const Test2 = () => {

    type Z = Either<string, number> // //arbitrary type

    //map and fmap
    const a = Right(1) as Z
    const b = a.map( code => code+1 )
    const c = b.map( code => code*10 )
    const d = c.map( code => code+40 )
    const e = d.fmap( code => code >= 0 ? Left('juca') as Z: Right(code) )

    const arr1 = [a,b,c,d,e]

    const _lefts = filterByLeft(arr1) // ok -> readonly (string | number)[]
    const _rights = filterByRight(arr1) // ok -> readonly string[][]

    console.log(`lefts`, _lefts)
    console.log(`rights`, _rights)

}

// tslint:disable-next-line: no-expression-statement
//Test2()