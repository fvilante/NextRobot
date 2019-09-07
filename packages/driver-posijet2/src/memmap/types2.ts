
import { mapObjectIndexed, objectToPairs, foldLeftArray, Pair, hasValueInArray } from '@nextrobot/core-utils'

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

/**IMPORTANT: Unit name must be unique to all dimensions */
const DimensionsDeclaration = {
    Time: ['minute', 'second'],
    Space: ['milimeter', 'meter'],
    //Mass: ['miligram', 'kilogram']
} as const

type DimensionsDeclaration = typeof DimensionsDeclaration
type AnyDimension = keyof DimensionsDeclaration
type AnyUnit = DimensionsDeclaration[AnyDimension][number]

type GetUnitsGivenDimension<D extends keyof DimensionsDeclaration> = DimensionsDeclaration[D][number]
type GetDimensionGivenAUnit<U extends AnyUnit> = FindKeyGivenValueInATupledInterface<DimensionsDeclaration,U>
type GetUnitsOfSameDimensionGivenAUnit<U extends AnyUnit> = GetUnitsGivenDimension<GetDimensionGivenAUnit<U>> // result is unionized

// ----------

type UnitEntry = {
    readonly toBase: (_: number) => number
    readonly fromBase: (_: number) => number
}

type DimensionsDefinition = { [K in AnyDimension]: {[ P in GetUnitsGivenDimension<K>]: UnitEntry }}


const Time: DimensionsDefinition['Time'] = {

    'minute': {
        toBase: (x) => x * 60,
        fromBase: (x) => x / 60,
    }, 

    // base
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
        toBase: x => x/1000,
        fromBase: x => x*1000,
    },

}


const DimensionsDefinition: DimensionsDefinition = {
    Time,
    Space,
}



const GetDimensionGivenAUnit = <U extends AnyUnit>(unit: U): GetDimensionGivenAUnit<U> => {

    const hasMatch = mapObjectIndexed(DimensionsDeclaration, (units, _) => {
        return hasValueInArray(units as readonly string[], unit)
    })

    const pair = objectToPairs(hasMatch)
    const dimensionsMatched = foldLeftArray(pair, [] as readonly string[], (acc, cur) => {
        const _dimension = cur.key
        const _hasMatch = cur.value
        return _hasMatch ? [...acc, _dimension] : acc
    })

    return dimensionsMatched[0] as GetDimensionGivenAUnit<U>

}


const getUnitEntry = <U extends AnyUnit, D extends GetDimensionGivenAUnit<U>>(unit: U): UnitEntry => {
    const dimension = GetDimensionGivenAUnit(unit)
    // Fix: I don't like bellow type coersion (and can't see why it is necessary)
    const r: UnitEntry = (DimensionsDefinition as any)[dimension][unit]
    return r
}

// measure


type Measure<U extends AnyUnit> = { readonly value: number, readonly unit: U}
const Measure = <U extends AnyUnit>(value: number, unit: U): Measure<U> => ({value, unit})
type AnyMeasure = Measure<any>



// convert


const convert = <
    A extends AnyUnit, 
    B extends GetUnitsOfSameDimensionGivenAUnit<A>
    >
    (measure: Measure<A>, newUnit: B): Measure<B> =>  {

        const currentUnit = measure.unit
        const currentValue = measure.value
        const dimension = GetDimensionGivenAUnit(currentUnit)
        const currentUnitEntry = getUnitEntry(currentUnit)
        const newUnitEntry = getUnitEntry(newUnit)
        const toBase = currentUnitEntry.toBase
        const fromBase = newUnitEntry.fromBase
        const baseValue = toBase(currentValue)
        const newValue = fromBase(baseValue)
        const newMeasure = Measure(newValue, newUnit)
        return newMeasure

}



const Test = () => {


    const testA = () => {
        const measure = Measure(1, 'minute')
        const converted = convert(measure, 'second')
        console.log(measure)
        console.log(converted)
    }

    const testB = () => {
        const measure = Measure(1, 'milimeter')
        const converted = convert(measure, 'meter')
        console.log(measure)
        console.log(converted)
    }
    // tslint:disable-next-line: no-expression-statement
    testA() ; testB()



}

// tslint:disable-next-line: no-expression-statement
Test()




