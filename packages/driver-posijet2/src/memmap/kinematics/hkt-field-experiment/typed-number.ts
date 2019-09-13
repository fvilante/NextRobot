
// one order

import {TypeScriptBuiltInTypes as TypeOf, isArrayEqual } from '@nextrobot/core-utils'

type Types = string | Multiplied<string,string> | Powered<string, number> //| Inverse<string> | Squared<string> | SquaredRoot<string>

const isTypesEqual = (a: Types, b:Types): boolean => {
    // tslint:disable: no-if-statement
    if( TypeOf.isString(a) && TypeOf.isString(b))
        return a===b ? true : false
    if ( TypeOf.isArray(a) && TypeOf.isArray(b))
        if( isArrayEqual(a,b) ) return true
    return false
    // tslint:enable: no-if-statement
}


export type TypedNumber<T extends Types> = {readonly number: number,  readonly type: T }
export const TypedNumber = <T extends Types>(number: number, type: T): TypedNumber<T> => ({ number, type })

type AnyTypedNumber = TypedNumber<Types>

// ----

// tslint:disable-next-line: readonly-array
type UniqueType<T> = [T] 
type Multiplied<A,B> = [A,B] //NOTE: Avoiding readonly keyword here is experimental. The reason is to clear user reading of type-inferenced
type Powered<T,Exp extends number> = Multiplied<T, Exp>
type Inverse<A> = Powered<A, -1>

type Squared<T> = Powered<T,2>
type SquaredRoot<T> = Powered<T,-2>


type MultType<A,B> = A extends B ? B extends A ?  Squared<A> :  Multiplied<A,B> :  Multiplied<A,B>
type DivType<A,B> = A extends B ? B extends A ? SquaredRoot<A> : Multiplied<A, Inverse<B>> : Multiplied<A, Inverse<B>>


type TypesField = {
    readonly Sum: <T extends Types>(a: T, b: T) => T
    readonly Sub: <T extends Types>(a: T, b: T) => T
    readonly Mult: <A extends Types, B extends Types>(a: A, b: B) => MultType<A,B>
    readonly Div: <A extends Types, B extends Types>(a: A, b: B) => DivType<A,B>

}


const TypesField: TypesField = {
    Sum: (a,b) => a,
    Sub: (a,b) => a,
    Mult: <A extends Types, B extends Types>(a: A, b: B):MultType<A,B> => isTypesEqual(a,b) ? [a,2] as MultType<A,B> : [a,b] as MultType<A,B>,
    Div:  <A extends Types, B extends Types>(a: A, b: B):DivType<A,B> => isTypesEqual(a,b) ? [a,-2] as DivType<A,B> : [a,[b,-1]] as DivType<A,B>,
}

const T0: Types = ['mm',2]

type AnyTypeFieldFunction = TypesField[keyof TypesField]

type AnyTypeFieldResult = ReturnType<AnyTypeFieldFunction>


const ff = <A extends Types, B extends Types>(a:A, b: B): MultType<A,B> => TypesField.Mult(a,b)

const aaa = ff('mm',['sec'.-2])


const TypedNumberField = {

    Sum: <T extends AnyTypedNumber>(a: T, b: T): T => TypedNumber(a.number+b.number, a.type) as T,
    Sub: <T extends AnyTypedNumber>(a: T, b: T): T => TypedNumber(a.number-b.number, a.type) as T,
    Mult: <A extends AnyTypedNumber, B extends AnyTypedNumber>(a: A, b: B) => TypedNumber(a.number*b.number, ff(['mm',2], ['mm',1]))

}

type AA = MultType<'mm', Types>

const a = TypedNumber(10,'mm')






