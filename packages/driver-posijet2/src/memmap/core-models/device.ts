
import { PhysicalArm } from './physical-arm'
import { Channel } from './channel'
import { Memmap, AnyDriver } from '../driver/driver-core'
import { CmppAddress } from '../../transport-layer/transaction/CmppAddress';


export interface Device<T extends AnyDriver> {
    readonly mechanics: PhysicalArm,
    readonly cmppAddress: CmppAddress
    readonly memmap: Memmap<T>
}

export const Device = <T extends AnyDriver>(
    mechanics: PhysicalArm,
    cmppAddress: CmppAddress,
    memmap: Memmap<T>
): Device<T> => ({mechanics, cmppAddress, memmap})

export type AnyDevice = Device<AnyDriver>