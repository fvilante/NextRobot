import { Observed } from "../core-types"

const bufferCount = async function* <T>(o: Observed<T>, count: number): Observed<readonly T[]> {

    // tslint:disable: no-let no-expression-statement no-if-statement no-expression-statement
    let r: T[] = []

    for await (const each of o) {     
        r = [...r, each]      
        //console.log('a:',each, r)   
        if(r.length >= count) {
            //console.log('b:',each, r)
            yield r              
            r = []
        }
    }

}



// informal test

/*
import { subscribe, range, take } from '@nextrobot/core-utils'


const a = subscribe(bufferCount(take(range(100),20), 3), val => console.log("saca:", val))
*/

