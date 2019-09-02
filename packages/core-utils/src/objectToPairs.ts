import { mapObjectIndexed } from "./mapObjectIndexed";
import { Pairs, Pair } from './pair'

export const objectToPairs = <T extends object>(o: T): Pairs<keyof T, T[keyof T]> => {

    const mapped = mapObjectIndexed(o, (value, key) => ({key, value}) )
    
    // tslint:disable-next-line: no-let
    let result = []
    
    for (const key in mapped) {
        // tslint:disable-next-line: no-expression-statement
        result.push(mapped[key])
    }

    return result
}

// informal test

const Test = () => {
    const input = {
        juca: 'nego',
        test: 2
    } 
    
    const result = objectToPairs(input)
    
    console.log(input)
    console.log(result)
}

