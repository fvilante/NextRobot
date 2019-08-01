// Unit API

import { 
    getConstructor, 
    physicalQuantityConversor as Conversor, 
    PhysicalQuantityConstructor, 
    PhysicalQuantityUtility as Utility
} from './physical-quantity-core'


const Milimeter = getConstructor('Milimeter')
const Meter = getConstructor('Meter')
const Inch = getConstructor('Inch')
const Second = getConstructor('Second')
const Minute = getConstructor('Minute')
const Milisecond = getConstructor('Milisecond')


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


const units = PhysicalQuantityUtility

const a = units.Space.Meter(10)