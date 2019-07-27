
import { PhysicalLinearAxis } from './physical-arm'
import { Channel } from './transport-types'

export interface LinearCmppDevice {
    readonly mechanics: PhysicalLinearAxis,
    readonly serialPortName: string,
    readonly channel: Channel,
}