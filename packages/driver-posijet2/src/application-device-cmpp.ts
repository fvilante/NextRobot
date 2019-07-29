
import { PhysicalLinearAxis } from './physical-arm'
import { Channel } from './transport-types'
import { Memmap, AnySetup } from './driver-core'

export interface LinearCmppDevice<T extends AnySetup> {
    readonly mechanics: PhysicalLinearAxis,
    readonly serialPortName: string,
    readonly channel: Channel,
    readonly memmap: Memmap<T>
}