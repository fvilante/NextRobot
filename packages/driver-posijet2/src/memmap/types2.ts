
import { mapObjectIndexed, objectToPairs, foldLeftArray, Pair } from '@nextrobot/core-utils'

// ------------------- Helper


// generic TupledInterface

type TupledInterface<T,F> = {[K in keyof T]: readonly F[]}
type AnyTupledInterface = TupledInterface<any,any>
type UnionizeTupledInterface<T extends AnyTupledInterface> = {
    [K in keyof T]: T[K][number]
}
type FindKeyGivenValueInATupledInterface<T extends AnyTupledInterface, U extends T[keyof T][number]> = {
    [K in keyof T]: U extends UnionizeTupledInterface<T>[K] ? K : never
}[keyof T]

 
// ===================

const DimensionsDeclaration = {
    Time: ['minute', 'second'],
    Space: ['milimeter', 'meter'],
    //Mass: ['miligram', 'kilogram']
} as const

type DimensionsDeclaration = typeof DimensionsDeclaration
type AnyDimension = keyof DimensionsDeclaration
type AnyUnit = DimensionsDeclaration[AnyDimension][number]

type GetUnitsByDimension<D extends keyof DimensionsDeclaration> = DimensionsDeclaration[D][number]


type UnitEntry = {
    readonly toBase: (_: number) => number
    readonly fromBase: (_: number) => number
}

type DimensionsDefinition = { [K in AnyDimension]: {[ P in GetUnitsByDimension<K>]: UnitEntry }}


const Time: DimensionsDefinition['Time'] = {

    'minute': {
        toBase: (x) => x * 60,
        fromBase: (x) => x / 60,
    }, 

    'second': {
        toBase: x => x,
        fromBase: x => x,
    },

}

const Space: DimensionsDefinition['Space']  = {

    //base
    'meter': {
        toBase: x => x,
        fromBase: x => x,
    },

    'milimeter': {
        toBase: x => x*1000,
        fromBase: x => x/1000,
    },

}


const DimensionsDefinition: DimensionsDefinition = {
    Time,
    Space,
}

type GetDimensionGivenAUnit<U extends AnyUnit> = FindKeyGivenValueInATupledInterface<DimensionsDeclaration,U>


const GetDimensionGivenUnit = <U extends AnyUnit>(unit: U) => {

    const dimensions = Object.keys(DimensionsDeclaration) as (AnyDimension)[]
    const units = dimensions.map( (dimension: AnyDimension) => DimensionsDeclaration[dimension] )

}


// convert

const convert = (measure, newUnit) =>  {

    const currentUnit = measure.unit
    const currentValue = measure.value
    const dimension = GetDimensionGivenAUnit(currentUnit)
    const currentUnitEntry = DimensionsDefinition[dimension]
    const newUnitEntry = dimension[newUnit]
    const toBase = currentUnitEntry.toBase
    const fromBase = newUnitEntry.fromBase
    const baseValue = toBase(currentValue)
    const newValue = fromBase(baseValue)
    const newMeasure = Measure(dimension, newUnit, newValue)
    return newMeasure

}



const Test = () => {

    const azx = convert(Measure(10,'milimeter'), 'meter')

    const a = Measure('Time', 'minute', 1)

    const b = convert(a, 'second')

    console.log(a)
    console.log(b)

}

// tslint:disable-next-line: no-expression-statement
Test()




