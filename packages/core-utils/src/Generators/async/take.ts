import { Observed } from '../core-types'
import { range as rangeSync } from '../number-generator-sync'

/** todo: throw an error if count is negative number  */
export const take = async function* <T>(o: Observed<T>, count: number ): Observed<readonly T[]> {

    // tslint:disable: no-let no-expression-statement
    let r: T[] = []

    const read = async function(): Promise<readonly T[]> {
        // sink to buffer asyncronously with no backpressure
        for (const _ of rangeSync(count)) {
            const each = (await o.next()).value
            r = [...r, each]
        }
            
        return r
    }
   
    yield read()


}  


const subscribe = async <T>(o: Observed<T>, fn: (_:T) => void): Promise<void> => {
    while(true) {
        const i = await o.next()
        // tslint:disable-next-line: no-if-statement
        if (i.done === true) 
            break
        else 
            fn(i.value)
    }
}



//informal test

/*

import { map } from './map'
import { range } from './range'

console.log('sync zica')
const a = range(1,20,5)

const b = map(a, val => [0,val,0])

subscribe(b, val => console.log(val))


*/