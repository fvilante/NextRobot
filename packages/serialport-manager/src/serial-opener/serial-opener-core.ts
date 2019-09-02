import { PortReference } from './port-reference'
import { OpendedSerialPort } from './opened-serial-port'

/** How to open a port on the system (the implementation is plataform specific)*/
export type SerialPortOpener = (_: PortReference) => Promise<OpendedSerialPort> 

