
import { FilterKeysByValue } from '@nextrobot/core-utils'


// --------------
//  Units
// --------------

export const Units = {
    // Space Dimension
    'Milimeter': 'Space',
    'Meter': 'Space',
    'Inch': 'Space',

    // Time Dimension
    'Second': 'Time',
    'Minute': 'Time',
    'Milisecond': 'Time',

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

export const getDimension = <T extends AnyUnit>(unit: T): GetDimension<T> => Units[unit]


// -------------------
//  Physical Quantity 
// -------------------

type PhysicalQuantity<T extends AnyUnit> = {
    readonly quantity: number
    readonly unit: T
}

const PhysicalQuantity = <T extends AnyUnit>(quantity: number, unit: T): PhysicalQuantity<T> => 
    ({quantity, unit})

export type PhysicalQuantityConstructor<T extends AnyUnit> = (quantity: number) => PhysicalQuantity<T>



// -----------------------------------------
//  Units Profile: Unit Conversions and Captions
// -----------------------------------------

// Conversions

type Conversor = (_: number) => number

type UnitConversor = {
    readonly toBase: Conversor
    readonly fromBase: Conversor
}

// Unit Captions

type UnitCaptions = {
    readonly singular: string
    readonly plural: string
    readonly abreviated: string
}


type UnitProfile = {
    readonly unitConversor: UnitConversor
    readonly captions: UnitCaptions
}

type UnitsProfile = {
    [Unit in AnyUnit]: UnitProfile
}


const UnitsProfile: UnitsProfile = {

    // Space

        'Milimeter': { // base
            unitConversor: {
                toBase: value => value,
                fromBase: value => value,
            },
            captions: {
                singular: 'milimetro',
                plural: 'milimetros',
                abreviated: 'mm',
            },
        },

        'Meter': {
            unitConversor: {
                toBase: value => value*1000,
                fromBase: value => value/1000,
            },
            captions: {
                singular: 'metro',
                plural: 'metros',
                abreviated: 'm',
            },
     
        },

        'Inch': { 
            unitConversor: {
                toBase: value => value*25.4,
                fromBase: value => value/25.4,
            },
            captions: {
                singular: 'polegada',
                plural: 'polegadas',
                abreviated: 'pol',
            },
           
        },


    // Time
        
        'Second': { // base
            unitConversor: {
                toBase: value => value,
                fromBase: value => value,
            },
            captions: {
                singular: 'segundo',
                plural: 'segundos',
                abreviated: 's',
            },
           
        },

        'Minute': {
            unitConversor: {
                toBase: value => value*60,
                fromBase: value => value/60,
            },
            captions: {
                singular: 'minuto',
                plural: 'minutos',
                abreviated: 'min',
            },
        },

        'Milisecond': { 
            unitConversor: {
                toBase: value => value/1000,
                fromBase: value => value*1000,
            },
            captions: {
                singular: 'milisegundo',
                plural: 'milisegundos',
                abreviated: 'ms',
            },
           
        },

}


// helpers
const getUnitProfile = (unit: AnyUnit): UnitProfile => UnitsProfile[unit]
const getUnitConversor = (unit: AnyUnit): UnitConversor => getUnitProfile(unit)['unitConversor']
const getToBaseConversor = (unit: AnyUnit): Conversor => getUnitConversor(unit)['toBase']
const getFromBaseConversor = (unit: AnyUnit): Conversor => getUnitConversor(unit)['fromBase']
const getUnitCaption = (unit: AnyUnit): UnitCaptions => getUnitProfile(unit)['captions']
export const getConstructor = <T extends AnyUnit>(unit: T):PhysicalQuantityConstructor<T> => 
    (quantity: number) => PhysicalQuantity(quantity, unit)


// constructors

// --------------------------------
// Physical Quantity Conversor
// -------------------------------

/**
 * 
 * Type-safe conversor to any Physical Quantity 
 * 
 * Example of use:
 * 
 *  const tenMeters = PhysicalQuantity(10, 'meter')

    const tenMinutes = PhysicalQuantity(10, 'minute')

    const a = physicalQuantityConversor(tenMeters, 'milimeter')
    const b = physicalQuantityConversor(tenMeters, 'inch')

    console.log(tenMeters, a,b) 

*/
export const physicalQuantityConversor = <
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



// API

type UnitConstructorsUtility = {
    [Dimension in GetDimension<AnyUnit>]: {
        [Unit in GetUnits<Dimension>]: PhysicalQuantityConstructor<Unit>
        
    }   
} 

type ConversorUnitility = { readonly Conversor: typeof physicalQuantityConversor }


export type PhysicalQuantityUtility = UnitConstructorsUtility & ConversorUnitility










