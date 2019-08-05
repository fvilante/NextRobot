
import { PhysicalArm } from './physical-arm'
import { Channel } from './channel'
import { Memmap, AnyDriver } from '../driver/driver-core'



export interface Device<T extends AnyDriver> {
    readonly mechanics: PhysicalArm,
    readonly serialPortName: string,
    readonly channel: Channel,
    readonly memmap: Memmap<T>
}

export const Device = <T extends AnyDriver>(
    mechanics: PhysicalArm,
    serialPortName: string,
    channel: Channel,
    memmap: Memmap<T>
): Device<T> => ({mechanics, serialPortName, channel, memmap})