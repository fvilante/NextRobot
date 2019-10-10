import { PortName } from '../data-models/port-name'
import { PortConfig } from '../data-models/port-config'


/** A wrapper to represent a port specification: portName + portConfig  */
export type PortReference = {
    readonly portName: PortName
    readonly portConfig: PortConfig
}

export const PortReference = (portName: PortName, portConfig: PortConfig):PortReference => ({portName, portConfig})

