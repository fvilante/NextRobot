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

const MilimetertoWave = (_: Space): Wave => ({wave: _.value})
const WaveToMilimeter = (_: Wave): Space => Milimeter(10)

export const MyMemmap1 : Memmap<Drive> = {
    'Posicao Inicial': { startWord: 0x60, startBit: 0, bitSize: 16, toWave: MilimetertoWave, fromWave: WaveToMilimeter},
}




