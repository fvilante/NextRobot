
import { PortReference } from '@nextrobot/serialport-manager'

export type CmppAddress = {
    readonly portReference: PortReference
    readonly canal: number
}
export const CmppAddress = (portReference: PortReference, canal: number):CmppAddress => ({portReference, canal})
