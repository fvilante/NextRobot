import { Waver, ToWave, FromWave, wave } from './wave-core'
import { AnyDriver } from './driver-core'

import { 
    Speed, 
    PulsesPerMicroControlerTick
} from './application-types'

import { spaceWaver } from './driver-waver-space'
import { timeWaver } from './driver-waver-time'

import { HomophorficMap } from './utils'



type Conversor = HomophorficMap<number>

const toWave: ToWave<AnyDriver, Speed> = (speed, device) => {

    const space = speed.value.space
    const time = speed.value.time

    const pulses = spaceWaver.toWave(space, device).waved
    const microcontrolerTick = timeWaver.toWave(time, device).waved 

    return wave(pulses/microcontrolerTick)

}

const fromWave: FromWave<AnyDriver, Speed> = (wave, device) => {
    const pulsesPerTick = PulsesPerMicroControlerTick(wave.waved)  
    return pulsesPerTick
}

export const speedWaver: Waver<AnyDriver, Speed> = { toWave, fromWave }