import { StartEnd, StartEndStep, ZeroToEnd, Observed } from '../core-types'

/** Async range */
export const range = async function* (...args: StartEnd | ZeroToEnd | StartEndStep ):Observed<number> {
    
    // tslint:disable: no-let no-if-statement no-expression-statement

    const __range = async function* (start:number, end:number, step:number):Observed<number> {
        for (let k=start; k<end; k=k+step) {
            yield k
        }
    }

    // initialize
    let start: number = 0
    let end: number = 0
    let step: number = 1

    //configure
    if (args[0]!==undefined && args[1]!==undefined && args[2]!==undefined) {
        start = args[0]
        end = args[1]
        step = args[2]
    } else if (args[0]!==undefined && args[1]!==undefined && args[2]===undefined) {
        console.log('juca')
        start = args[0]
        end = args[1]
        step = 1
    } else if (args[0]!==undefined && args[1]===undefined && args[2]===undefined) {
        start = 0
        end = args[0]
        step = 1   
    }



    // run
    yield* __range(start,end,step)


}





// informal test

/*

const a = range(10,12) 


const b = a.next().then(console.log)

const c = a.next().then(console.log)
const d = a.next().then(console.log)

const f = async function(): Promise<void> {
    const set = range(20,23)
    for await (const each of set)
        console.log(each)

}



console.log('Segura esta:')

f()
*/