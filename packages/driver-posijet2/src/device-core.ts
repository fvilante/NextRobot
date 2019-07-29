
import { PhysicalLinearAxis } from './physical-arm'
import { Channel } from './transport-types'
import { Memmap, AnyDrive } from './driver-core'



export interface LinearDevice<T extends AnyDrive> {
    readonly mechanics: PhysicalLinearAxis,
    readonly serialPortName: string,
    readonly channel: Channel,
    readonly memmap: Memmap<T>
}