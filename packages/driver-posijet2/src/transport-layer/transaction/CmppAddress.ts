
import { PortReference } from '@nextrobot/serialport-manager'
import { PortConfig } from '@nextrobot/serialport-manager/lib/core-models/port-config';


const defaultPortConfig: PortConfig = {
    baudRate: 2400,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    rtscts: false,
    xon: false,
    xoff: false,
}

export type Channel = number

export type CmppAddress = {
    readonly portReference: PortReference
    readonly canal: number
}

export type CmppAddressArgument = {
    readonly channel: Channel
    readonly portName: string,
    readonly baudRate: PortReference['portConfig']['baudRate']
}

export const CmppAddress = (_: CmppAddressArgument): CmppAddress => 
    ({
        portReference: PortReference(_.portName, {...defaultPortConfig, baudRate: _.baudRate} ), 
        canal: _.channel
    })
