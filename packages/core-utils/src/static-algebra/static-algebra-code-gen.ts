
// very poor code ! very fast implementation


// tslint:disable: no-let no-expression-statement no-if-statement readonly-array


// =============================================
//     PARAMETRIZATION OF CODE GENERATOR
//  
//
//  Basicaly you wanna change min and max values in
//  the MatrixGenerator interface.
//
//
//  the important output of this code generator are
//  the result functions named _add(a,b) and _sub(a,b)
//
//  To generate de code just run this generator script (with
//  ts-node for ex) and send the screen output to a file, ex:
//
//    c:/> ts-node this_script_name.ts > my_file_output.ts
//
// =============================================

type MatrixGenerator = {
    readonly space: readonly [number, number]
    readonly min: MatrixGenerator['space']
    readonly max: MatrixGenerator['space']
    readonly step: readonly 1[] // arbitrary constrained into 1
    readonly indexes: 0 | 1  // indexes of each dimensions of ,om/max array
}

const MatrixGenerator: MatrixGenerator = {
    space:  [ 0,  0], // not important
    min:    [-10, -10], // inclusive range
    max:    [+10, +10], // inclusive range
    step:   [+1, +1],
    indexes: 1 //put here last index for the min/max array
}


// =============================================

let INVTABLE_TEMP: Set<number> = new Set()


const gen = function*(index: MatrixGenerator['indexes']): IterableIterator<number> {

    const min:number = MatrixGenerator.min[index]
    const max:number = MatrixGenerator.max[index]
    const step:number = MatrixGenerator.step[index]

    for (let k=min; k<=max; k += step )
        yield k

    return
}


const Tab$ = (index: MatrixGenerator['indexes']) => `   `.repeat(index+1)


const make_static_SUM_part = () => {


    

    const FINAL_ONE = (index: MatrixGenerator['indexes'], lastArgs: readonly number[])  => {

        const counter = gen(index)

        const ADDER =  (acc:number, cur:number): number => acc+cur

        const RunReducer = (arr: readonly number[], reducer: (acc:number, cur:number) => number): number => {
            return arr.reduce(reducer,0)
        }


        //console.log('test',counter)
            
        const EACH = (n: number) => {
            const result = RunReducer(lastArgs, ADDER) + n
            const r = result < 0 ? `[${true}, ${(-1)*result}]` :  `[${false}, ${result}]`
            INVTABLE_TEMP.add(result)
            return `${Tab$(index)} readonly '${n}': '${result}'`
        }

        for (const k of counter) {
            //console.log('final')
            console.log(EACH(k))
        }


    }


    const HEADER = (index: MatrixGenerator['indexes'], n: number) => 
        { console.log(  `${Tab$(index)} readonly '${n}': {` ) }

    const FOOTER = (index: MatrixGenerator['indexes'], n: number) => 
        { console.log(`${Tab$(index)}}

        `)}


    const TABLE_HEADER = () => {
        console.log(`export type Table = {`)
    }

    const TABLE_FOOTER = () => {
        console.log(`}`)
    }


    // interation



    const idx0 = 0
    const idx1 = 1
    const idx2 = 2

    TABLE_HEADER()

    for (let a of gen(idx0)) {

        HEADER(idx0,a)

        //for (let b of gen(idx1)) {

            //HEADER(idx1,b)

            //for (let c of gen(idx2)) {
       
                FINAL_ONE(idx1,[a])

            //}

            //FOOTER(idx1,b)

        //}

        FOOTER(idx0,a)

    }
        
    TABLE_FOOTER()
}

const make_dynamic_SUM_part = () => {



    

    const FINAL_ONE = (index: MatrixGenerator['indexes'], lastArgs: readonly number[])  => {

        const counter = gen(index)

        const ADDER =  (acc:number, cur:number): number => acc+cur

        const RunReducer = (arr: readonly number[], reducer: (acc:number, cur:number) => number): number => {
            return arr.reduce(reducer,0)
        }


        //console.log('test',counter)

        const EACH = (n: number) => {
            const result = RunReducer(lastArgs, ADDER) + n
            const r = result < 0 ? `[${true}, ${(-1)*result}]` :  `[${false}, ${result}]`
            INVTABLE_TEMP.add(result)
            return `${Tab$(index)} '${n}': '${result}',`
        }

        for (const k of counter) {
            //console.log('final')
            console.log(EACH(k))
        }


    }


    const HEADER = (index: MatrixGenerator['indexes'], n: number) => 
        { console.log(  `${Tab$(index)} '${n}': {` ) }

    const FOOTER = (index: MatrixGenerator['indexes'], n: number) => 
        { console.log(`${Tab$(index)}},

        `)}


    const TABLE_HEADER = () => {
        console.log(`export const Table: Table = {`)
    }

    const TABLE_FOOTER = () => {
        console.log(`}`)
    }


    // interation



    const idx0 = 0
    const idx1 = 1
    const idx2 = 2

    TABLE_HEADER()

    for (let a of gen(idx0)) {

        HEADER(idx0,a)

        //for (let b of gen(idx1)) {

            //HEADER(idx1,b)

            //for (let c of gen(idx2)) {
       
                FINAL_ONE(idx1,[a])

            //}

            //FOOTER(idx1,b)

        //}

        FOOTER(idx0,a)

    }
        
    TABLE_FOOTER()
}

const SumConstEndPart = () => { console.log( `

/** first parameter aplication */
export type _A = keyof Table

/** second parameter aplication */
export type _B<A extends _A> = keyof Table[A]

/** Get Result of all aplications */
export type _R<A extends _A, B extends _B<A>> = Table[A][B]


export const _add = <A extends _A, B extends _B<A>>(a: A, b: B): _R<A,B> => Table[a][b]


`)}






const make_static_SUB_part = () => {



    const FINAL_ONE = (index: MatrixGenerator['indexes'], lastArgs: readonly number[])  => {

        const counter = gen(index)

        const SUBTRACTER =  (acc:number, cur:number): number => acc-cur

        const RunReducer = (arr: readonly number[], reducer: (acc:number, cur:number) => number): number => {
            return arr.reduce(reducer,0)
        }


        //console.log('test',counter)
        
        const EACH = (n: number) => {
            const result = lastArgs[0] - n //RunReducer(lastArgs, SUBTRACTER) - n
            const r = result < 0 ? `[${true}, ${(-1)*result}]` :  `[${false}, ${result}]`
            INVTABLE_TEMP.add(result)
            return `${Tab$(index)} readonly '${n}': '${result}'`
        }


        for (const k of counter) {
            //console.log('final')
            console.log(EACH(k))
        }


    }


    const HEADER = (index: MatrixGenerator['indexes'], n: number) => 
        { console.log(  `${Tab$(index)} readonly '${n}': {` ) }

    const FOOTER = (index: MatrixGenerator['indexes'], n: number) => 
        { console.log(`${Tab$(index)}}

        `)}


    const TABLE_HEADER = () => {
        console.log(`export type TableSub = {`)
    }

    const TABLE_FOOTER = () => {
        console.log(`}`)
    }


    // interation



    const idx0 = 0
    const idx1 = 1
    const idx2 = 2

    TABLE_HEADER()

    for (let a of gen(idx0)) {

        HEADER(idx0,a)

        //for (let b of gen(idx1)) {

            //HEADER(idx1,b)

            //for (let c of gen(idx2)) {
       
                FINAL_ONE(idx1,[a])

            //}

            //FOOTER(idx1,b)

        //}

        FOOTER(idx0,a)

    }
        
    TABLE_FOOTER()
}

const make_dynamic_SUB_part = () => {



    

    const FINAL_ONE = (index: MatrixGenerator['indexes'], lastArgs: readonly number[])  => {

        const counter = gen(index)

        const SUBTRACTER =  (acc:number, cur:number): number => acc-cur

        const RunReducer = (arr: readonly number[], reducer: (acc:number, cur:number) => number): number => {
            return arr.reduce(reducer,0)
        }


        //console.log('test',counter)

        const EACH = (n: number) => {
            const result = lastArgs[0] - n //RunReducer(lastArgs, SUBTRACTER) - n
            const r = result < 0 ? `[${true}, ${(-1)*result}]` :  `[${false}, ${result}]`
            INVTABLE_TEMP.add(result)
            return `${Tab$(index)} '${n}': '${result}',`
        }

        for (const k of counter) {
            //console.log('final')
            console.log(EACH(k))
        }


    }


    const HEADER = (index: MatrixGenerator['indexes'], n: number) => 
        { console.log(  `${Tab$(index)} '${n}': {` ) }

    const FOOTER = (index: MatrixGenerator['indexes'], n: number) => 
        { console.log(`${Tab$(index)}},

        `)}


    const TABLE_HEADER = () => {
        console.log(`export const TableSub: TableSub = {`)
    }

    const TABLE_FOOTER = () => {
        console.log(`}`)
    }


    // interation



    const idx0 = 0
    const idx1 = 1
    const idx2 = 2

    TABLE_HEADER()

    for (let a of gen(idx0)) {

        HEADER(idx0,a)

        //for (let b of gen(idx1)) {

            //HEADER(idx1,b)

            //for (let c of gen(idx2)) {
       
                FINAL_ONE(idx1,[a])

            //}

            //FOOTER(idx1,b)

        //}

        FOOTER(idx0,a)

    }
        
    TABLE_FOOTER()
}

const SubConstEndPart = () => { console.log( `

/** first parameter aplication */
export type __A = keyof Table

/** second parameter aplication */
export type __B<A extends __A> = keyof TableSub[A]

/** Get Result of all aplications */
export type __R<A extends __A, B extends __B<A>> = TableSub[A][B]

export const _sub = <A extends __A, B extends __B<A>>(a: A, b: B): __R<A,B> => TableSub[a][b]


`)}



const HEAD_COMMENTS = () => { console.log(`

// THIS CODE WAS AUTOMATIC GENERATED
// HIS INTENTION IS TO BE AN STATIC INTEGER ALGEBRA
// AUTHOR: @fvilante

//
//  the important output of this generated code are
//  the functions named: 
//
//      1) _add(a,b) 
//      2) _sub(a,b)
//

/*

Bellow is the parametrization and min-to-max range you can 
use in algebraic operations:

RANGE: 
min: [${MatrixGenerator.min[0]},${MatrixGenerator.min[1]}]
max: [${MatrixGenerator.max[0]},${MatrixGenerator.max[1]}]


EXAMPLE OF USE:

const c = '-2'
const a = _add('-1', '2') // 1
const b = _sub(a,c) // 3


*/


`)}

// run effects

HEAD_COMMENTS()

//Addition part
make_static_SUM_part()
make_dynamic_SUM_part() 
SumConstEndPart()

// Subtraction part
make_static_SUB_part()
make_dynamic_SUB_part()
SubConstEndPart()






