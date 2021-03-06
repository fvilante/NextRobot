

import { delay } from '@nextrobot/core-utils' 

import { Datalinker } from '../data-models/datalinker-sync'
import { _Port } from '../data-models/port'
import { Byte } from '../data-models/bytes'

// tslint:disable: no-expression-statement no-if-statement no-let readonly-array


// === Serial-port creator (Driver) ===


// === Effect Runner ===

type SyncTransactioner = <T>(opener: _Port['Opener'], port: _Port['Reference'], datalinker:Datalinker<T>) => Promise<T>


// =======================================
// === Effect Runner Implementation ===
// =======================================

/** Reception buffer */
let receptionByteBuffer: number[] = []

export const syncTransactioner: SyncTransactioner = async <T>(portOpener: _Port['Opener'], portReference: _Port['Reference'], datalinker: Datalinker<T>): Promise<T> => {

    /** Opens and returns the serial port */
    const getPort = async () => {
        await delay(200) // fix: remove this delay. This delay is to give time to concrete port to close and open again (see serial driver implementation)
        const openedPort = await portOpener(portReference)
        return openedPort
    }

    /** concrete serial port where transaction effects happens */
    const cPort = await getPort()

    return new Promise( (resolve, reject) => {

        /** Helper*/
        type Callback<T extends keyof _Port['Openned']> = Parameters<_Port['Openned'][T]>[0]
    
        // --- call-backs ---

    
        const onClose: Callback<'onClose'> = () => {
            //console.log(`ComPort closed: ${portReference.portName}`)
        }
    
        const onError: Callback<'onError'> = error => {
            //console.log(`Comport error: ${error}`)
            cPort.close()
            reject(error)
        }

        const onData: Callback<'onData'> = _data => {
            //console.log(`Receiving data: ${data}`)

            const data = _data.bytes
            // fill reception buffer
            data.map(each => receptionByteBuffer.push(each))

            // proccess each byte from reception buffer
            let loop: boolean = true
            while (loop === true) {

                if (receptionByteBuffer.length === 0) break

                const nextByte = receptionByteBuffer.shift()
                if (nextByte === undefined) break

                const r = datalinker.receptionHandler(Byte(nextByte)) 

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