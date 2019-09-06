import { Pairs } from './pair'

// tslint:disable: no-let no-object-mutation no-expression-statement

const pairsToObject = <K extends keyof any,V>(pairs: Pairs<K,V>): Record<K,V>=> {

   let result = {} as Record<K,V>

   const keys = pairs.map( pair => pair.key)
   const values = pairs.map( pair => pair.value)

   for ( let i=0; i < keys.length; i++ ) {
        result[keys[i]] = values[i]
   }

   return result 
}


// informal test

import { objectToPairs } from './objectToPairs'

const Test = () => {

    const input = {
        juca: 'nego',
        test: 2
    }
    
    const o = objectToPairs(input)
    
    const output = pairsToObject(o)
    
    console.log('---')
    console.log(input)
    console.log(output)

}


