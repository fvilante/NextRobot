// Unit API

import { 
    getConstructor, 
    physicalQuantityConversor as Conversor, 
    PhysicalQuantityConstructor, 
    PhysicalQuantityUtility as Utility,
} from './physical-quantity-core'


export { PhysicalQuantity } from './physical-quantity-core'

//todo: My original intention was to design an unit api that was very generic to admit any
//      kind of physical quantity. Altough I attained this result I think I can refactor
//      to obtain a more concise and less code. I don't have time to it now maybe on future.

const Milimeter = getConstructor('Milimeter')
const Meter = getConstructor('Meter')
const Inch = getConstructor('Inch')
const Second = getConstructor('Second')
const Minute = getConstructor('Minute')
const Milisecond = getConstructor('Milisecond')

// API
export const PhysicalQuantityUtility: Utility = {

    Space: { 
        Milimeter, 
        Meter, 
        Inch 
    }, 
    
    Time: { 
        Second, 
        Minute, 
        Milisecond 
    } ,
    
    Conversor

}

type PhysicalQuantityUtility = typeof PhysicalQuantityUtility
type AnyDimension = Exclude<keyof PhysicalQuantityUtility, 'Conversor'>

// helpers
type GetConstructorsByDimension<T extends AnyDimension> = PhysicalQuantityUtility[T][keyof PhysicalQuantityUtility[T]]
export type GetUnitsByDimension<T extends AnyDimension> = 
    GetConstructorsByDimension<T> extends PhysicalQuantityConstructor<infer R> ? R : never


// informal test

const Test = () => {


    type A = GetConstructorsByDimension<'Time'>
    type B = GetUnitsByDimension<'Space'>
    
    const units = PhysicalQuantityUtility
    
    const a = units.Space.Meter(10)
    const b = units.Conversor(a,'Inch')
    
}

// todo: Move bellow code to documentation
