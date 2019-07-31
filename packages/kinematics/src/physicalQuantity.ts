
import { FilterKeysByValue } from '@nextrobot/core-utils'



// --------------
//  Units
// --------------

interface UnitsCore  {
    readonly [Unit: string]: string
}

const Units = {
    // Space Dimension
    'milimeter': 'Space',
    'meter': 'Space',
    'inch': 'Space',

    // Time Dimension
    'second': 'Time',
    'minute': 'Time',
    'milisecond': 'Time',

} as const

type Units = typeof Units

// todo: make this module generic to works with any conversion system


// helpers
type AnyUnit = keyof Units
type GetDimension<T extends AnyUnit> = Units[T]
type GetUnits<T extends AnyDimension> = FilterKeysByValue<Units, T>
type AnyDimension = GetDimension<AnyUnit>


// given a unit get all units that pertain to same dimension of the given unit
type GetUnitsFromUnit<T extends AnyUnit> = GetUnits<GetDimension<T>>


// ------------
// Dimension
// ------------

const getDimension = <T extends AnyUnit>(unit: T): GetDimension<T> => Units[unit]


// -------------------
//  Physical Quantity 
// -------------------

type PhysicalQuantity<T extends AnyUnit> = {
    readonly quantity: number
    readonly unit: T
}

const PhysicalQuantity = <T extends AnyUnit>(quantity: number, unit: T): PhysicalQuantity<T> => 
    ({quantity, unit})




// -----------------------------------------
//  Units Profile: Unit Conversions and Captions
// -----------------------------------------

type Conversor = (_: number) => number

type UnitConversor = {
    readonly toBase: Conversor
    readonly fromBase: Conversor
}

type PhysicalQuantityConstructor<T extends AnyUnit> = (_: number, unit: T) => PhysicalQuantity<T>

type UnitsProfile = {

        [Unit in AnyUnit]: {
            readonly unitConversor: UnitConversor
            readonly constructor: PhysicalQuantityConstructor<Unit>
        }

}


const UnitsProfile: UnitsProfile = {

    // Space

        'milimeter': { // base
            unitConversor: {
                toBase: value => value,
                fromBase: value => value,
            },

            constructor: value => PhysicalQuantity(value, 'milimeter')
        },

        'meter': {
            unitConversor: {
                toBase: value => value*1000,
                fromBase: value => value/1000,
            },
            
            constructor: value => PhysicalQuantity(value, 'meter')
        },

        'inch': { 
            unitConversor: {
                toBase: value => value*25.4,
                fromBase: value => value/25.4,
            },

            constructor: value => PhysicalQuantity(value, 'inch')
        },


    // Time
        
        'second': { // base
            unitConversor: {
                toBase: value => value,
                fromBase: value => value,
            },

            constructor: value => PhysicalQuantity(value, 'second')
        },

        'minute': {
            unitConversor: {
                toBase: value => value*60,
                fromBase: value => value/60,
            },

            constructor: value => PhysicalQuantity(value, 'minute')
        },

        'milisecond': { 
            unitConversor: {
                toBase: value => value/1000,
                fromBase: value => value*1000,
            },

            constructor: value => PhysicalQuantity(value, 'milisecond')
        },

}


// helpers
const getUnitConversor = (unit: AnyUnit): UnitConversor => UnitsProfile[unit]['unitConversor']
const getToBaseConversor = (unit: AnyUnit): Conversor => getUnitConversor(unit)['toBase']
const getFromBaseConversor = (unit: AnyUnit): Conversor => getUnitConversor(unit)['fromBase']



// --------------------------------
// Physical Quantity Conversor
// -------------------------------

const PhysicalQuantityConversor = <
    T extends PhysicalQuantity<AnyUnit>,
    U extends GetUnitsFromUnit<T['unit']>,
    >
    (phyQtd: T, to: U): PhysicalQuantity<U> => {
        
        const oldUnit = phyQtd.unit
        const newUnit = to

        const toBaseConversor =  getToBaseConversor(oldUnit)
        const fromBaseConversor = getFromBaseConversor(newUnit)
     
        const runConversion: Conversor = value => fromBaseConversor( toBaseConversor(value) ) 

        const newQuantity = runConversion(phyQtd.quantity)   
        
        const newPhysicalQuantity = PhysicalQuantity(newQuantity, newUnit)

        return newPhysicalQuantity

}



// example of use
// fix: move bellow code to documentation 

const tenMeters = PhysicalQuantity(10, 'meter')

const tenMinutes = PhysicalQuantity(10, 'minute')

const a = PhysicalQuantityConversor(tenMeters, 'milimeter')
const b = PhysicalQuantityConversor(tenMeters, 'inch')

console.log(tenMeters, a,b)





