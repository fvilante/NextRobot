import { InternationalUnitSystem } from './kinetics/measure'

// --------------------------------------------------------
// DEFINITION
// --------------------------------------------------------

/** Use International System as a standard from wave convertion
 * when using kinematic types
*/
export const US0 = InternationalUnitSystem
export type US0 = typeof US0

export type AnyUserProgram = {
    [K in string]: any
}

export type Memmap<U extends AnyUserProgram> = {
    readonly [ParamName in keyof U]: SingleMemmap<U, ParamName>
}


// --------------------------------------------------------
// OPERATIONS
// --------------------------------------------------------

export type SingleMemmap<U extends AnyUserProgram, K extends keyof U> = {

    // memory region
    readonly startWord: number // word onde o parametro começa
    readonly startBit: number // bit onde o parametro começa a partir da startWord (0 é igual startWord)
    readonly bitSize: number // tamanho do dado em bits

    // description
    //readonly helpMsg?: string // texto descritivo do parametro

    // memory class
    // todo: implement bellow
    //readonly memoryType: 'volatile' | 'stable'
    //readonly accessType: 'read-only' | 'read-write' | 'write-only'  
    
    // conversor
    readonly toWave: (_: GetParameterType<U,K>) => number,
    readonly fromWave: (_: number) => GetParameterType<U,K>, 

}

export type SingleParameter<U extends AnyUserProgram, K extends keyof U> = {
    readonly name: K
    readonly value: GetParameterType<U, K>
}

// helpers

const GetParameterMemmap = <U extends AnyUserProgram>(memmap:Memmap<U>, paramName: keyof U) => memmap[paramName]

export type GetParameterType<U extends AnyUserProgram, K extends keyof U> = U[K]



