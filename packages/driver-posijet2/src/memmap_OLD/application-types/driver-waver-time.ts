import { Waver, ToWave, FromWave, wave } from './wave-core'
import { exhaustiveSwitch } from '@nextrobot/core-utils'
import { AnyDriver } from '../driver/driver-core'

import { Time, MicroControlerTick, Second} from '../application-types'

import { HomophorficMap } from '../utils'

type Conversor = HomophorficMap<number>

const toWave: ToWave<AnyDriver, Time> = (time, device) => {

    const secondToWave: Conversor = time => time*1024 //fix: not implement
    const tickClockToWave: Conversor = time => time

    switch(time.kind) {
        case 'Second': return wave(secondToWave(time.value))
        case 'MicroControlerTick': return wave(tickClockToWave(time.value)) 
        default:
            return exhaustiveSwitch(time)
    }

}

const fromWave: FromWave<AnyDriver, Time> = (wave, device) => {
    const tickClockToSecond: Conversor = time => time/1024 
    return Second(tickClockToSecond(wave.waved))
}

export const timeWaver: Waver<AnyDriver, Time> = {toWave, fromWave}