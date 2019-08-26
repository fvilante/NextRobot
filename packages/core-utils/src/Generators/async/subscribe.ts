import { Observed } from '../core-types'

export const subscribe = async <T>(o: Observed<T>, fn: (_:T) => void): Promise<void> => {
    while(true) {
        const i = await o.next()
        // tslint:disable-next-line: no-if-statement
        if (i.done === true) 
            break
        else 
            // tslint:disable-next-line: no-expression-statement
            fn(i.value)
    }
}


//informal test

/*

import { range } from './range'
import { map } from './map'

console.log('sync zica')
const a = range(1,20,5)

const b = map(a, val => [0,val,0])

// tslint:disable-next-line: no-expression-statement
subscribe(b, val => console.log(val))

*/