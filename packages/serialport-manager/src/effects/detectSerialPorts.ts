// tslint:disable: no-expression-statement
// tslint:disable: typedef

import { _Port } from '../data-models/port'

import * as SerialPort  from 'serialport';

const serialPort = SerialPort.default



// -- Concrete layer ---


type ConcretePortInfo = {
    readonly comName: string;
    readonly manufacturer?: string;
    readonly serialNumber?: string;
    readonly pnpId?: string;
    readonly locationId?: string;
    readonly productId?: string;
    readonly vendorId?: string;
}

/** concrete function */
const __detectSerialPorts = (): Promise<readonly ConcretePortInfo[]> => serialPort.list()


/** Adapt concrete port-info data to our abstract-data-model port-info*/
const adaptData = (_: ConcretePortInfo): _Port['Info'] => ({
    name: _.comName,
    detail: { 
        kind: 'LocalPCPortInfo', 
        manufacturer:  _.manufacturer,
        serialNumber:  _.serialNumber,
        pnpId:         _.pnpId,
        locationId:    _.locationId,
        productId:     _.productId,
        vendorId:      _.vendorId
        }
})



// -- Abstracted layer ---

/** Abstracted function 
 * Todo: incorporate Remote Serial Port Detection algoritm*/
export const detectSerialPorts = (): Promise<readonly _Port['Info'][]> => __detectSerialPorts().then( ports => ports.map( port => adaptData(port) ))



// informal test 

const test = async () => {
    const a = await detectSerialPorts()
    console.log(a)
}

//test()
