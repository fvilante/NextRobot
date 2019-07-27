
import { PortInfo, detectSerialPorts } from './detectSerialPorts'

export class SerialPortManager {

    constructor() { }


    readonly listPorts = () => detectSerialPorts()

}