import { PortName } from '../core/port-name'
import { PortConfig } from '../core/port-config'


/** A wrapper to portName + portConfig  */
export type PortReference = {
    readonly portName: PortName
    readonly portConfig: PortConfig
}

export const PortReference = (portName: PortName, portConfig: PortConfig):PortReference => ({portName, portConfig})

