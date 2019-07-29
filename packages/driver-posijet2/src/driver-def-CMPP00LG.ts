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

export type Drive = {
    readonly 'Posicao Inicial': { readonly type: Space }
}


export const MyMemmap1 : Memmap<Drive> = {
    'Posicao Inicial': { startWord: 0x60, startBit: 0, bitSize: 16, waver: 'Todo!'},
}




