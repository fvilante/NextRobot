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

/** note:   This variable name is a Memmap<Driver> indeed. But 'Driver' variable name is overloaded with 
 *          the Memmap to simplify namespace for client */
export const Driver : Memmap<Driver> = {
    'Posicao Inicial': { StartWord: 0x60, StartBit: 0, BitSize: 16, Waver: spaceWaver},
    'Posicao Final': { StartWord: 0x60, StartBit: 0, BitSize: 16, Waver: spaceWaver},
    'Velocidade de Avanço': { StartWord: 0x60, StartBit: 0, BitSize: 16, Waver: speedWaver},
    'Velocidade de Retorno': { StartWord: 0x60, StartBit: 0, BitSize: 16, Waver: speedWaver},
    'Aceleração de Avanço': { StartWord: 0x60, StartBit: 0, BitSize: 16, Waver: accelerationWaver},
    'Aceleração de Retorno': { StartWord: 0x60, StartBit: 0, BitSize: 16, Waver: accelerationWaver},
}



