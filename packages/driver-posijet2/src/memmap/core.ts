import { InternationalUnitSystem } from './kinetics/measure'

// --------------------------------------------------------
// DEFINITION
// --------------------------------------------------------

/** Use International System as a standard from wave convertion
 * when using kinematic types
*/
export const US0 = InternationalUnitSystem
export type US0 = typeof US0

/** Any valid parameter type for any CMPP parameter */
type AnyParameterType = any

/** Registers the parameters that are available on cmpp*/
export type AnyUserProgram = {
    [ParameterName in string]: AnyParameterType
}

/** Given a UserProgram get the particular ParameterType */
export type GetParameterType<U extends AnyUserProgram, ParameterName extends keyof U> = U[ParameterName]


// --------------------------------------------------------
// OPERATIONS
// --------------------------------------------------------


/** Cast a single parameter */
type Caster<U extends AnyUserProgram, K extends keyof U> = {
    readonly unCast: (_: GetParameterType<U,K>) => number,
    readonly cast:  (_: number) => GetParameterType<U,K>,
}


export type SingleMemmap<U extends AnyUserProgram, K extends keyof U> = {

    // memory region
    readonly startWord: number // word where the parameter begin
    readonly startBit: number // bit where parameter's begin starting from startWord (0 is equals startWord)
    readonly bitSize: number // Length of data in bits

    // memory class
    // todo: implement bellow
    //readonly memoryType: 'volatile' | 'stable'
    //readonly accessType: 'read-only' | 'read-write' | 'write-only'  
    
    // conversor (cast / uncasting)
    readonly caster: Caster<U, K>

}

/** Register a instance of a parameter in the user-space */
export type SingleParameter<U extends AnyUserProgram, ParameterName extends keyof U> = {
    readonly name: ParameterName
    readonly value: GetParameterType<U, ParameterName>
}


/** Determine a memory-information to each parameter available on cmpp */
export type Memmap<U extends AnyUserProgram> = {
    readonly [ParameterName in keyof U]: SingleMemmap<U, ParameterName>
}


// helpers

const GetParameterMemmap = <U extends AnyUserProgram>(memmap:Memmap<U>, paramName: keyof U) => memmap[paramName]




