import { Observed } from "../core-types"


export const bufferCount = async function* <T>(o: Observed<T>, count: number, step: number): Observed<readonly T[]> {

    // tslint:disable: no-let no-expression-statement no-if-statement no-expression-statement
    let r: T[] = []

    for await (const each of o) {     
        r = [...r, each]      
        //console.log('a:',each, r)   
        if(r.length >= count) {
            //console.log('b:',each, r)
            //console.log(`antes`, r)
            yield r              
            const a = r.slice(step, r.length)
            r = a
            //console.log(`depois`, r)
        }
    }

}



// informal test

import { subscribe } from './subscribe'
import { range } from './range'
import { take } from './take'

const test = () => {


    const input = range(10)
    const a = subscribe(bufferCount(input, 2, 1), val => console.log("saca:", val))
    
}

//test()

