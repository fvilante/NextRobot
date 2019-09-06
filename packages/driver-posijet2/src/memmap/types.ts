
import { mapObjectIndexed, objectToPairs, foldLeftArray} from '@nextrobot/core-utils'



// helpers


// todo: move to core-utils


// generic MappedInterface


type MappedInterface<T,F> = {[K in keyof T]: F} // todo: same as core-utils MappedObject (should be a better name for one of both)


// generic TupledInterface

type TupledInterface<T,F> = {[K in keyof T]: readonly F[]}

type AnyTupledInterface = TupledInterface<any,any>

type UnionizeTupledInterface<T extends AnyTupledInterface> = {
    [K in keyof T]: T[K][number]
}

type FindKeyGivenValueInATupledInterface<T extends AnyTupledInterface, U extends T[keyof T][number]> = {
    [K in keyof T]: U extends UnionizeTupledInterface<T>[K] ? K : never
}[keyof T]


// generic - StringedTupledInterface

type StringedTupledInterface<T> = TupledInterface<T,string>

type AnyStringedTupledInterface = StringedTupledInterface<any>

type MapStringedTupledInterface<T extends AnyStringedTupledInterface, F> = {
    [K in keyof T]: Record<T[K][number], F>

} 






// dimension - declaration


const DimensionsDeclaration = {
    Time: ['minute', 'second'],
    Space: ['milimeter', 'meter'],
    //Mass: ['miligram', 'kilogram']
} as const


type DimensionsDeclaration = typeof DimensionsDeclaration

type AnyDimension = keyof DimensionsDeclaration

type AnyUnit = DimensionsDeclaration[AnyDimension][number]

type GetDimensionGivenAUnit<U extends AnyUnit> = FindKeyGivenValueInATupledInterface<DimensionsDeclaration,U>

type GetUnitsGivenDimension<D extends keyof DimensionsDeclaration> = DimensionsDeclaration[D][number]

type GetUnitsOfSameDimensionGivenAUnit<U extends AnyUnit> = GetUnitsGivenDimension<GetDimensionGivenAUnit<U>> // result is unionized

const GetDimensionGivenAUnit = <U extends AnyUnit>(unit: U): AnyDimension => {
 
    const pairs = objectToPairs(DimensionsDeclaration)
    const c = foldLeftArray(pairs, undefined , (acc: keyof DimensionsDeclaration | undefined, cur) => {

        const dim = cur.key
        const units = cur.value
        const doesExists = (units as readonly string[]).map( _unit => unit === unit ? true : false).some( value => value === true)
        return doesExists ? dim : acc

     })

    // tslint:disable-next-line: no-if-statement
    if (c) 
        return c
    else 
        throw new Error('Given unit not found') //this error is suposed to never occur
}



// dimension - definition

type UnitEntry = {
    readonly toBase: (_: number) => number
    readonly fromBase: (_: number) => number
}

type DimensionsDefinition = MapStringedTupledInterface<DimensionsDeclaration, UnitEntry>


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

const Space: DimensionsDefinition['Space'] = {

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


// Measure type

type Measure<U extends AnyUnit> = { readonly value: number, readonly unit: U}
const Measure = <U extends AnyUnit>(value: number, unit: U): Measure<U> => ({value, unit})
type AnyMeasure = Measure<any>


// conversion generic algoritm

const convert = <A extends AnyUnit, B extends GetUnitsOfSameDimensionGivenAUnit<A>>(measure: Measure<A>, newUnit: B): Measure<B> =>  {

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

const azx = convert(Measure(10,'milimeter'), 'meter')







const a = Measure('Time', 'minute', 1)

const b = convert(a, 'second')

console.log(a)
console.log(b)



