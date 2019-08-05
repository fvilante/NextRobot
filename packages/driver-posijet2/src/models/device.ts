
import { LinearAxisClassic } from './physical-arm'
import { Channel } from './channel'
import { Memmap, AnyDriver } from '../driver/driver-core'



export interface Device<T extends AnyDriver> {
    readonly mechanics: LinearAxisClassic,
    readonly serialPortName: string,
    readonly channel: Channel,
    readonly memmap: Memmap<T>
}
