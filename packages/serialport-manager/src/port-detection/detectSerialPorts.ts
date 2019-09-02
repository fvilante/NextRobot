// tslint:disable: no-expression-statement
// tslint:disable: typedef

import * as SerialPort  from 'serialport';

const serialPort = SerialPort.default


export interface PortInfo {
    readonly comName: string;
    readonly manufacturer?: string;
    readonly serialNumber?: string;
    readonly pnpId?: string;
    readonly locationId?: string;
    readonly productId?: string;
    readonly vendorId?: string;
}

export const detectSerialPorts = async (): Promise<readonly PortInfo[]> => serialPort.list()


// effect test

const main = async () => {
    const a = await detectSerialPorts()
    console.log(a)
}

//main()
