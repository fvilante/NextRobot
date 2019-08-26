import { Observed } from '../core-types'


/** todo: throw an error if count is negative number  */
export const take = async function* <T>(o: Observed<T>, count: number ): Observed<T> {
    // tslint:disable: no-let no-expression-statement
    let counter: number = 0
        for await (const each of o) {
            counter = counter+1
            // tslint:disable-next-line: no-if-statement
            if (counter > count) break
            yield each

        }
}  





//informal test


/*

import { range as rangeAsync} from './range'
import { subscribe } from './subscribe'

console.log('sync zica')
const a = take(rangeAsync(0,3),5)
const b = take(rangeAsync(0,10),5)

subscribe(a, val => console.log("a;",val))

subscribe(b, val => console.log("b:",val))



*/