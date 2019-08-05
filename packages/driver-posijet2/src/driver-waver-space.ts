import { Waver, ToWave, FromWave, wave } from './wave-core'
import { exhaustiveSwitch } from '@nextrobot/core-utils'
import { AnyDriver } from './driver-core'

import { Milimeter, Pulse, Space} from './application-types'


const spaceToWave: ToWave<AnyDriver, Space> = (space, device) => {

    const convertMilimeterToPulse = (_: number):number => _*777 //fix: not implement

    switch(space.kind) {
        case 'Pulse': return wave(space.value)
        case 'Milimeter': return wave(convertMilimeterToPulse(space.value)) 
        default:
            return exhaustiveSwitch(space)
    }

}

const waveToSpace: FromWave<AnyDriver, Space> = (wave, device) => {
    const pulseToMilimeter = (_:number):number => _/777 // fix: not implemented
    return Milimeter(pulseToMilimeter(wave.waved))
}

export const spaceWaver: Waver<AnyDriver, Space> = {
    toWave: spaceToWave,
    fromWave: waveToSpace
}