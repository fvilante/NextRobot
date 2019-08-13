
/** generate a number from start to end (end not included) */
type StartEnd  = readonly [number, number]
type ZeroToEnd = readonly [number]
type StartEndStep = readonly [number, number, number]
/**
 * 
 * @param args 
    range(stop) takes one argument.
    range(start, stop) takes two arguments.
    range(start, stop, step) takes three arguments.

 */
export const range = function* (...args: StartEnd | ZeroToEnd | StartEndStep ):IterableIterator<number> {

    // tslint:disable: no-let no-if-statement no-expression-statement

    const __range = function* (start:number, end:number, step:number):IterableIterator<number> {
        for (let k=start; k<end; k=k+step) {
            yield k
        }
    }
    
    // initialize
    let start: number = 0
    let end: number = 0
    let step: number = 1


    const length = args['length']
    
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

export const generatorToList = <T>(range: IterableIterator<T>): readonly T[] => {
    let r: T[] = []
    for (const each of range)
        r = [...r, each]
    return r
}

export const listToGenerator = function* <T>(list: readonly T[]): IterableIterator<T> {
    yield* list
}


type GeneratorMapper<A,B> = (_:A) => B

export const mapGenerator = function* <A,B>(generator: IterableIterator<A>, fn: GeneratorMapper<A,B>): IterableIterator<B> {
    for (const each of generator)
        yield fn(each)
}

