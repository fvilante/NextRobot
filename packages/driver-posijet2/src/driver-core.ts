import { AnyParamType } from './application-types'
import { Waver } from './wave-core'

// ==============
//  Core 
// ==============

// For general reference/example of use of this structure see: 
// https://gist.github.com/fvilante/a4652afc92114d1440649bd325a9174b

// core abstraction
type AnyEntry = { readonly type: AnyParamType }
export type AnyDrive = { readonly [ParameterName in string]: AnyEntry }

// helpers
export type GetParameters<Drive extends AnyDrive> = Extract<keyof Drive, string>
type GetEntry<Drive extends AnyDrive, Parameter extends GetParameters<Drive>> = Drive[Parameter]
export type GetParameterType<Drive extends AnyDrive, Parameter extends GetParameters<Drive>> = GetEntry<Drive, Parameter>['type']
type GetAllParameterType<Drive extends AnyDrive> = GetParameterType<Drive, GetParameters<Drive>>


// User-program derived from core
export type UserProgram<Drive extends AnyDrive> = {
    [Parameter in GetParameters<Drive>]: GetParameterType<Drive, Parameter>
}


// Memory map derived from core
export type Memmap<Drive extends AnyDrive> = {
    [ParameterName in GetParameters<Drive>]: {

        // memory region
        readonly startWord: number // word onde o parametro começa
        readonly startBit: number // bit onde o parametro começa a partir da startWord (0 é igual startWord)
        readonly bitSize: number // tamanho do dado em bits

        // description
        readonly helpMsg?: string //texto descritivo do parametro

        // conversor
        readonly waver: Waver<Drive, ParameterName> | 'Todo!'

        // memory class
        // todo: implement bellow
        readonly memoryType?: 'volatile' | 'stable'
        readonly accessType?: 'read-only' | 'read-write' | 'write-only'  
    }
}










