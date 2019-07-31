import { Waver, ToWave, FromWave, wave } from './wave-core'
import { AnyDriver } from './driver-core'

import { 
    Acceleration, 
    PulsesPerSqueredMicroControlerTick
} from './application-types'

import { speedWaver } from './driver-waver-speed'
import { timeWaver } from './driver-waver-time'

import { HomophorficMap } from './utils'


type Conversor = HomophorficMap<number>

const toWave: ToWave<AnyDriver, Acceleration> = (acceleration, device) => {

    const speed = acceleration.value.speed
    const time = acceleration.value.time

    const pulsesPerSquaredTick = speedWaver.toWave(speed, device).waved
    const microcontrolerTick = timeWaver.toWave(time, device).waved 

    return wave(pulsesPerSquaredTick/microcontrolerTick)

}

const fromWave: FromWave<AnyDriver, Acceleration> = (wave, device) => {
    const pulsesPerTick = PulsesPerSqueredMicroControlerTick(wave.waved)  
    return pulsesPerTick
}

export const accelerationWaver: Waver<AnyDriver, Acceleration> = { toWave, fromWave }