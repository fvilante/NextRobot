import { Memmap } from '../core'





export type UserProgram = {
    //readonly 'Parametro1': unknown
    readonly 'Parametro2': number
    readonly 'Parametro3': number
    readonly 'Parametro7': 'nego'
}



export const memmap: Memmap<UserProgram> = {

    'Parametro2': {
            startWord: 0x60,
            startBit: 0,
            bitSize: 16,
            helpMsg: '',
            memoryType: 'stable',
            accessType: 'read-write',
            toWave: _ => _*2,
            fromWave: _ => _/2, 
        },
 
    'Parametro3': {
            startWord: 0x60,
            startBit: 0,
            bitSize: 16,
            helpMsg: '',
            memoryType: 'stable',
            accessType: 'read-write',
            toWave: _ => _*3,
            fromWave: _ => _/3, 
        },

    'Parametro7': {
            startWord: 0x60,
            startBit: 0,
            bitSize: 16,
            helpMsg: '',
            memoryType: 'stable',
            accessType: 'read-write',
            toWave: _ => 2,
            fromWave: _ => 'nego', 
        },
 
}
