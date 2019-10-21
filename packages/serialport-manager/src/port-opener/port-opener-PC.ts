
// tslint:disable: no-expression-statement no-if-statement no-let

import { Bytes } from '../data-models/bytes'


// === implementation imports ===

import * as Stream from 'stream'
const a = Stream.Readable

import * as serial_port from 'serialport';
import { _Port } from '../data-models/port';
type SerialPort = unknown //typeof serial_port.default
const SerialPort = serial_port.default



// === helpers ====

// fix: Make buffer typesafe
/** convert from NodeJs Buffer type to Bytes */
const NodeBufferToBytes = (buffer: any): Bytes => {
    let bytes: number[] = []
    for (let k=0; k<buffer.length; k++) {
        bytes = [...bytes, buffer.readUInt8(k)]
    }
    return Bytes(bytes)
}


// === implementation ====


/**
 * 
 * Opens serial ports on PC running windows or linux
 * 
 * ATTENTION: Throw exception on Error (ie: port open error, writing/reading data error, etc...)
 * 
 * Todo: make throwing errors safe through monads
 * Todo: implement a timeout error on openning 
 * Todo: If a concrete port is already open, don't close and open it again (it takes about 100ms to perform this task)
 * 
 * @param portName 
 * @param portConfig 
 */
export const serialPortOpenner: _Port['Opener'] = (port: _Port['Reference']): Promise<_Port['Openned']> => {

    return new Promise( async ( resolve, reject ) => {

            // create concrete port
            const aPort = new SerialPort(port.name, {...port.config, ...{ autoOpen: false }})
            

            // open handler
            const onOpen = ():void => {
                
                // port interface
                const openedPort: _Port['Openned'] = {
                    write: data => aPort.write([...data.bytes]),
                    close: () => { aPort.close() },
                    onClose: callback => { aPort.on('close', callback) },
                    onData: callback => aPort.on('data', (data: unknown) => callback(NodeBufferToBytes(data))),
                    onError: callback => aPort.on('error', callback),
                    // todo: add onWrite 
                }
                resolve(openedPort)
            }

            // error handler for port opening
            const openError = (err?: Error | null): void => 
                (err === undefined || err === null)
                    ? reject(new Error(`Error: Cannot open serial port ${port.name}`))
                    : reject(err)
            

            // set handlers and open
            aPort.on('open', onOpen)
            aPort.on('error', openError) //todo: check if 'openError' is as expected overwritted when iPort.onError is called
            
            // do try to open
            aPort.open() 
            
        
        })
        
        
}

