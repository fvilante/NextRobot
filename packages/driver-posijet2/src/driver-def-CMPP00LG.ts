import { 
    Milimeter, 
    Space, 
    Speed, 
    Acceleration, 
    MilimeterPerSecond, 
    MilimeterPerSquareSecond, 
    Pulse 
} from './application-types'

import { spaceWaver } from './driver-waver-space'

import { Memmap } from './driver-core'



export type Driver = {
    readonly 'Posicao Inicial': { readonly type: Space }
    readonly 'Posicao Final': { readonly type: Space }
    
}



export const MyMemmap1 : Memmap<Driver> = {
    'Posicao Inicial': { startWord: 0x60, startBit: 0, bitSize: 16, waver: spaceWaver},
    'Posicao Final':{ startWord: 0x60, startBit: 0, bitSize: 16, waver: spaceWaver},
}



