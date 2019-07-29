import { CmppParamType } from './application-types'

// ==============
//  Core 
// ==============

// For general reference/example of use of this structure see: 
// https://gist.github.com/fvilante/a4652afc92114d1440649bd325a9174b

// core abstraction
type AnyEntry = { readonly type: CmppParamType }
export type AnySetup = { readonly [K:string]: AnyEntry }

// helpers
type GetKeys<T extends AnySetup> = Extract<keyof T, string>
type GetEntry<T extends AnySetup, K extends GetKeys<T>> = T[K]
type GetType<T extends AnySetup, K extends GetKeys<T>> = GetEntry<T, K>['type']
type GetTypes<T extends AnySetup> = GetType<T, GetKeys<T>>


// User-program derived from core
export type UserProgram<T extends AnySetup> = {
    [K in GetKeys<T>]: GetType<T, K>
}

// Wave is the agnostic stream type format (normally `Binary`)
export type Wave = { readonly wave: number }

// Memory map derived from core
export type Memmap<T extends AnySetup> = {
    [K in GetKeys<T>]: {

        // memory region
        readonly startWord: number // word onde o parametro começa
        readonly startBit: number // bit onde o parametro começa a partir da startWord (0 é igual startWord)
        readonly bitSize: number // tamanho do dado em bits

        // description
        readonly helpMsg?: string //texto descritivo do parametro

        // conversor
        readonly toWave: (value: GetType<T,K>) => Wave
        readonly fromWave: (value: Wave) => GetType<T,K>

        // memory class
        // todo: implement bellow
        readonly memoryType?: 'volatile' | 'stable'
        readonly accessType?: 'read-only' | 'read-write' | 'write-only'  
    }
}










