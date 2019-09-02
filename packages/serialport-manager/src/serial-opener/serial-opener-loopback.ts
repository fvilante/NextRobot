
// tslint:disable: no-expression-statement no-if-statement no-let

import { OpendedSerialPort } from './opened-serial-port'
import { SerialPortOpener } from './serial-opener-core'
import { Bytes } from '../core/bytes'



/**
 * 
 * Opens serial ports on PC running windows or linux
 * 
 * Fix: If a concrete port is already open, don't close and open it again (it takes about 100ms to perform this task)
 * 
 * @param portName 
 * @param portConfig 
 */
export const serialPortOpenner: SerialPortOpener = (portReference) => {

    type Callback<K extends keyof OpendedSerialPort> = Parameters<OpendedSerialPort[K]>[0]

    return new Promise( async (resolve, reject) => {

        let onClose: Callback<'onClose'>;
        let onData: Callback<'onData'>;
        let onError: Callback<'onError'>;
    
        let isOpen: boolean = true

        const write = (bytes: Bytes):void => {
            if (isOpen) 
                onData(bytes)
            else
                onError(new Error(`Emulated Port Error: Port is closed but you're trying to write on it`))
        }

        // port interface
        const openedPort: OpendedSerialPort = {
            write: bytes => write(bytes), 
            close: () => { isOpen = false; onClose() },
            onClose: callback => { onClose = callback},
            onData: callback => { onData = callback},
            onError: callback => { onError = callback},
            // todo: add onWrite 
        }
        
        resolve(openedPort)
       
    })
        
        
}