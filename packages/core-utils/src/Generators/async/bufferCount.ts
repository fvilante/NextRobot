import { Observed } from "../core-types"


export const bufferCount = async function* <T>(o: Observed<T>, count: number, step: number=0): Observed<readonly T[]> {

    // tslint:disable: no-let no-expression-statement no-if-statement no-expression-statement
    let r: T[] = []

    for await (const each of o) {     
        r = [...r, each]      
        //console.log('a:',each, r)   
        if(r.length >= count) {
            //console.log('b:',each, r)
            yield r              
            r = r.slice(step)
        }
    }

}



// informal test

/*
import { subscribe, range, take } from '@nextrobot/core-utils'


const a = subscribe(bufferCount(take(range(100),20), 3), val => console.log("saca:", val))
*/

