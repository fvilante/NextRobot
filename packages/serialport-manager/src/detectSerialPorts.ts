// tslint:disable: no-expression-statement
// tslint:disable: typedef

import * as SerialPort  from 'serialport';

const serialPort = SerialPort.default

export const detectSerialPorts = async () => serialPort.list()


// informal test

const main = async () => {
    const a = await detectSerialPorts()
    console.log(a)
}

main()
