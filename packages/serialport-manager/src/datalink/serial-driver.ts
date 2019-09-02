
// === abstract imports ===

import { 
    SerialPortDriver,
    SerialPort as __SerialPort,
    PortConfig,
    PortName,
} from './serial-interface'

import { Byte, Bytes } from './bytes'

// tslint:disable: no-expression-statement no-if-statement no-let


// === implementation imports ===

import * as Stream from 'stream'
const a = Stream.Readable

import * as serial_port from 'serialport';
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
    return bytes
}


// === implementation ====

// todo: extract all delays to core-utils
const delay = (ms:number):Promise<void> =>
    new Promise( (resolve) => { setTimeout( () => resolve(), ms) })


/**
 * Fix: If a concrete port is already open, don't close and open it again (it takes about 100ms to perform this task)
 * 
 * @param portName 
 * @param portConfig 
 */
export const serialDriver: SerialPortDriver = (portName, portConfig) => {

    return new Promise( async (resolve, reject) => {

        const openError = (err?: Error | null): void => {
            if (err === undefined || err === null)
                reject(new Error(`Error: Cannot open serial port ${portName}`))
            else
                reject(err)
        }

        const runMainProcess = ():void => {

            // create concrete port
            const cPort = new SerialPort(portName, {...portConfig, ...{ autoOpen: false }})
            
  
            // open handler
            const onOpen = ():void => {
                
                // port interface
                const iPort: __SerialPort = {
                    write: bytes => cPort.write([...bytes]),
                    close: () => {cPort.close()},
                    onClose: callback => {cPort.on('close', callback)},
                    onData: callback => cPort.on('data', (data: unknown) => callback(NodeBufferToBytes(data))),
                    onError: callback => cPort.on('error', callback),
                    // todo: add onWrite 
                }
                resolve(iPort)
            }

            // set handlers and try to open
            cPort.on('open', onOpen)
            cPort.on('error', openError) //fix: check if 'openError' is as expected overwritted when iPort.onError is called
            
            cPort.open() 
            
        }

        runMainProcess() 
       
    })
        
        
}

