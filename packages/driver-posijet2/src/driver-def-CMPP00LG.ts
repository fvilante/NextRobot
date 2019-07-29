import { 
    Milimeter, 
    Space, 
    Speed, 
    Acceleration, 
    MilimeterPerSecond, 
    MilimeterPerSquareSecond, 
    Pulse 
} from './application-types'

import { Memmap, Wave } from './driver-core'

export type Drive = {
    readonly 'Posicao Inicial': { readonly type: Space }
}

const Temp1 = (_: Space): Wave => ({wave: _.value})
const Temp2 = (_: Wave): Space => Milimeter(10)

export const MyMemmap1 : Memmap<Drive> = {
    'Posicao Inicial': { startWord: 0x60, startBit: 0, bitSize: 16, toWave: Temp1, fromWave: Temp2},
}




