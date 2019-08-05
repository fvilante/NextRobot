import { 
    Milimeter, 
    Space, 
    Speed, 
    Acceleration, 
    MilimeterPerSecond, 
    MilimeterPerSquareSecond, 
    Pulse 
} from '../application-types'

import { spaceWaver } from '../application-types/driver-waver-space'
import { speedWaver } from '../application-types/driver-waver-speed'
import { accelerationWaver } from '../application-types/driver-waver-acceleration'

import { Memmap } from './driver-core'


export type Driver = {
    readonly 'Posicao Inicial': { readonly type: Space }
    readonly 'Posicao Final': { readonly type: Space }
    readonly 'Velocidade de Avanço': { readonly type: Speed }
    readonly 'Velocidade de Retorno': { readonly type: Speed }
    readonly 'Aceleração de Avanço': { readonly type: Acceleration }
    readonly 'Aceleração de Retorno': { readonly type: Acceleration }
       
}


export const MyMemmap1 : Memmap<Driver> = {
    'Posicao Inicial': { startWord: 0x60, startBit: 0, bitSize: 16, waver: spaceWaver},
    'Posicao Final': { startWord: 0x60, startBit: 0, bitSize: 16, waver: spaceWaver},
    'Velocidade de Avanço': { startWord: 0x60, startBit: 0, bitSize: 16, waver: speedWaver},
    'Velocidade de Retorno': { startWord: 0x60, startBit: 0, bitSize: 16, waver: speedWaver},
    'Aceleração de Avanço': { startWord: 0x60, startBit: 0, bitSize: 16, waver: accelerationWaver},
    'Aceleração de Retorno': { startWord: 0x60, startBit: 0, bitSize: 16, waver: accelerationWaver},
}



