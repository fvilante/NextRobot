import { AnyParamType } from './application-types'

// ==============
//  Core 
// ==============

// For general reference/example of use of this structure see: 
// https://gist.github.com/fvilante/a4652afc92114d1440649bd325a9174b

// core abstraction
type AnyEntry = { readonly type: AnyParamType }
export type AnyDrive = { readonly [ParameterName in string]: AnyEntry }

// helpers
type GetParameters<T extends AnyDrive> = Extract<keyof T, string>
type GetEntry<T extends AnyDrive, K extends GetParameters<T>> = T[K]
type GetParameterType<T extends AnyDrive, K extends GetParameters<T>> = GetEntry<T, K>['type']
type GetAllParameterType<T extends AnyDrive> = GetParameterType<T, GetParameters<T>>


// User-program derived from core
export type UserProgram<T extends AnyDrive> = {
    [K in GetParameters<T>]: GetParameterType<T, K>
}

// Wave is the agnostic stream type format (normally `Binary`)
export type Wave = { readonly wave: number }

// Memory map derived from core
export type Memmap<Drive extends AnyDrive> = {
    [Parameter in GetParameters<Drive>]: {

        // memory region
        readonly startWord: number // word onde o parametro começa
        readonly startBit: number // bit onde o parametro começa a partir da startWord (0 é igual startWord)
        readonly bitSize: number // tamanho do dado em bits

        // description
        readonly helpMsg?: string //texto descritivo do parametro

        // conversor
        readonly toWave: (value: GetParameterType<Drive, Parameter>) => Wave
        readonly fromWave: (value: Wave) => GetParameterType<Drive, Parameter>

        // memory class
        // todo: implement bellow
        readonly memoryType?: 'volatile' | 'stable'
        readonly accessType?: 'read-only' | 'read-write' | 'write-only'  
    }
}










