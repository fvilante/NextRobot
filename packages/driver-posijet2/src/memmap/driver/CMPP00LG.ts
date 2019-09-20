
import { ANY_LINEARACCELERATION, UnitSystemConversor, LINEARACCELERATION } from '../kinetics/measure'
import { Memmap, US0 } from '../core'


// test
import { GetParameterType } from '../core'

type A = GetParameterType<UserProgram, 'Parametro3'>

// Definition


export type UserProgram = {
    readonly 'Parametro1': ANY_LINEARACCELERATION,
    readonly 'Parametro2': number,
    readonly 'Parametro3': string,
    readonly 'Parametro4': 'juca',
}


export const memmap : Memmap<UserProgram> = {

    'Parametro1': {
            startWord: 0x60,
            startBit: 0,
            bitSize: 16,
            helpMsg: '',
            memoryType: 'stable',
            accessType: 'read-write',
            toWave: _ => UnitSystemConversor(_, US0).scalar,
            fromWave: _ => LINEARACCELERATION(_, US0), 
        },

    'Parametro2': {
            startWord: 0x60,
            startBit: 0,
            bitSize: 16,
            helpMsg: '',
            memoryType: 'stable',
            accessType: 'read-write',
            toWave: _ => _*4,
            fromWave: _ => _/4, 
        },

    'Parametro3': {
            startWord: 0x60,
            startBit: 0,
            bitSize: 16,
            helpMsg: '',
            memoryType: 'stable',
            accessType: 'read-write',
            toWave: _ => 2,
            fromWave: _ => 'oi', 
        },

    'Parametro4': {
            startWord: 0x60,
            startBit: 0,
            bitSize: 16,
            helpMsg: '',
            memoryType: 'stable',
            accessType: 'read-write',
            toWave: _ => 10,
            fromWave: _ => 'juca', 
        },

}

