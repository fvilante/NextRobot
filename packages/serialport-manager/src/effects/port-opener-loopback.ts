
import { Bytes } from '../data-models/bytes'
import { _Port, defaultPortConfig } from '../data-models/port';
import { Right, Future } from '@nextrobot/core-utils';

// tslint:disable: no-expression-statement no-let


// EXPERIMENTAL FEATURE:
// todo: I do not know if this module is useful, it is experimental. Maybe there are better ways to do that.


/**
 * 
 * Opens serial ports on PC running windows or linux
 * 
 * Fix: If a concrete port is already open, don't close and open it again (it takes about 100ms to perform this task)
 * 
 * @param portName 
 * @param portConfig 
 */
export const serialPortOpenner: _Port['Opener'] = portReference => {

    type Callback<K extends keyof _Port['Openned']> = Parameters<_Port['Openned'][K]>[0]

    return Future( resolver => {

        let onClose: Callback<'onClose'>;
        let onData: Callback<'onData'>;
        let onError: Callback<'onError'>;
    
        let isOpen: boolean = true

        const write = (bytes: Bytes):void => 
            isOpen
                ? onData(bytes)
                : onError(new Error(`Emulated Port Error: Port is closed but you're trying to write on it`))
        

        // port interface
        const openedPort: _Port['Openned'] = {
            write: bytes => write(bytes), 
            close: () => { isOpen = false; onClose() },
            onClose: callback => { onClose = callback},
            onData: callback => { onData = callback},
            onError: callback => { onError = callback},
            info: () => ({
                name: 'loopback-test-mockup-port',
                detail: {kind: 'RemotePortInfo'}
            }),
            reference: () => ({
                name: 'loopback-test-mockup-port',
                baudRate: 9600,
                config: defaultPortConfig,

            })

            // todo: add onWrite 
        }
        
        resolver(Right(openedPort))
       
    })
        
        
}