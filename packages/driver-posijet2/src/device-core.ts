
import { PhysicalLinearAxis } from './physical-arm'
import { Channel } from './transport-types'
import { Memmap, AnyDriver } from './driver-core'



interface LinearDevice<T extends AnyDriver> {
    readonly mechanics: PhysicalLinearAxis,
    readonly serialPortName: string,
    readonly channel: Channel,
    readonly memmap: Memmap<T>
}


export type Device<T extends AnyDriver> = LinearDevice<T>