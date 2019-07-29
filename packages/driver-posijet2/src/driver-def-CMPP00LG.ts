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
import { Waver, ToWave, FromWave, wave } from './wave-core'
import { exhaustiveSwitch } from './utils'

// tslint:disable: no-if-statement
// tslint:disable: no-expression-statement




export type Drive = {
    readonly 'Posicao Inicial': { readonly type: Space }
}


const spaceToWave: ToWave<Drive, Space> = (space, device) => {

    const convertMilimeterToPulse = (_: number):number => _*777 //fix: not implement

    switch(space.kind) {
        case 'Pulse': return wave(space.value)
        case 'Milimeter': return wave(convertMilimeterToPulse(space.value)) 
        default:
            return exhaustiveSwitch(space)
    }

}

const waveToSpace: FromWave<Drive, Space> = (wave, device) => {
    return Pulse(wave.waved)
}

//temp waver
const spaceWaver: Waver<Drive, Space> = {
    toWave: spaceToWave,
    fromWave: waveToSpace
}

export const MyMemmap1 : Memmap<Drive> = {
    'Posicao Inicial': { startWord: 0x60, startBit: 0, bitSize: 16, waver: spaceWaver},
}



