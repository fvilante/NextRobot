import { 
    Milimeter, 
    Space, 
    Speed, 
    Acceleration, 
    MilimeterPerSecond, 
    MilimeterPerSquareSecond, 
    Pulse 
} from './application-types'

import { Memmap } from './driver-core'
import { Waver } from './wave-core'
import { Device } from './device-core';

export type Drive = {
    readonly 'Posicao Inicial': { readonly type: Space }
}

//temp waver
const spaceWaver: Waver<Drive,Space> = {
    toWave: (space, device) => ({ waved: 12 }),
    fromWave: (wave, device) => Milimeter(20) 
}

export const MyMemmap1 : Memmap<Drive> = {
    'Posicao Inicial': { startWord: 0x60, startBit: 0, bitSize: 16, waver: spaceWaver},
}




