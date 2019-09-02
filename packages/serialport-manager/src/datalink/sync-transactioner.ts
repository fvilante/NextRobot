
// tslint:disable: no-expression-statement no-if-statement no-let readonly-array

import { delay } from '@nextrobot/core-utils' 
import { OpendedSerialPort } from './opened-serial-port'
import { SerialPortOpener } from './serial-opener-core'
import { PortReference } from './port-reference'
import { Datalinker } from './datalinker-core'


// === Serial-port creator (Driver) ===


// === Effect Runner ===

type SyncTransactioner = <T>(portOpener: SerialPortOpener, _port: PortReference, datalinker:Datalinker<T>) => Promise<T>


// =======================================
// === Effect Runner Implementation ===
// =======================================

/** Reception buffer */
let receptionByteBuffer: number[] = []

export const syncTransactioner: SyncTransactioner = async <T>(portOpener: SerialPortOpener, portReference: PortReference, datalinker: Datalinker<T>): Promise<T> => {

    /** Opens and returns the serial port */
    const getPort = async () => {
        await delay(150) // fix: remove this delay. This delay is to give time to concrete port to close and open again (see serial driver implementation)
        const openedPort = await portOpener(portReference)
        return openedPort
    }

    /** concrete serial port where transaction effects happens */
    const cPort = await getPort()

    return new Promise( (resolve, reject) => {

        /** Helper*/
        type Callback<T extends keyof OpendedSerialPort> = Parameters<OpendedSerialPort[T]>[0]
    
        // --- call-backs ---

    
        const onClose: Callback<'onClose'> = () => {
            //console.log(`ComPort closed: ${portReference.portName}`)
        }
    
        const onError: Callback<'onError'> = error => {
            //console.log(`Comport error: ${error}`)
            cPort.close()
            reject(error)
        }

        const onData: Callback<'onData'> = data => {
            //console.log(`Receiving data: ${data}`)

            // fill reception buffer
            data.map(each => receptionByteBuffer.push(each))

            // proccess each byte from reception buffer
            let loop: boolean = true
            while (loop === true) {

                if (receptionByteBuffer.length === 0) break

                const nextByte = receptionByteBuffer.shift()
                if (nextByte === undefined) break

                const r = datalinker.receptionHandler(nextByte) 

                switch (r.kind) {
                    case 'Error':
                        loop = false  
                        //todo: probably some strategy to reset reception buffer will be necessary
                        onError(r.data)
                        break
                    case 'Sucessful':
                        cPort.close()
                        resolve(r.data)
                        break
                    case 'Processing':
                        //setTimer()
                        break
                    //fix: use exhaustiveSwitch                       
                }
            }

            
        }


 
        const runMainProcess = async () => {


            //configure handlers
            cPort.onClose(onClose)
            cPort.onData(onData)
            cPort.onError(onError)

            // send all data at once       
            cPort.write(datalinker.toWrite()) 
            
            // todo: timerout
        

        }
        

        // RUN EFFECT
        try {
            runMainProcess()
        } catch (err) {
            reject(new Error(`Error in executing sync transaction: Err -> ${err}`))
        }
        
    })
    


}