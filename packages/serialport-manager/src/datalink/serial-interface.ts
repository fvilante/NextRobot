
// tslint:disable: no-expression-statement no-if-statement no-let readonly-array

import { delay } from '@nextrobot/core-utils' 


// primitives

export type Byte = number
export type Bytes = readonly Byte[]


// === Port ===

/** System dependent, use listports to see name of existing ports on the system */
export type PortName = string

export type PortConfig = {
    readonly baudRate: 115200|57600|38400|19200|9600|4800|2400|1800|1200|600|300|200|150|134|110|75|50 //|number;
    readonly dataBits: 8|7|6|5;
    //readonly highWaterMark: number;
    //readonly lock: boolean;
    readonly stopBits: 1|2;
    readonly parity: 'none'|'even'|'mark'|'odd'|'space';
    readonly rtscts: boolean;
    readonly xon: boolean;
    readonly xoff: boolean;}

export type PortReference = {
    readonly portName: PortName
    readonly portConfig: PortConfig
}

export const PortReference = (portName: PortName, portConfig: PortConfig):PortReference => ({portName, portConfig})


// === Result ===


export type ResultProcessing = {
    readonly kind: 'Processing'
}
export const ResultProcessing = ():ResultProcessing => ({kind: 'Processing'})

export type ResultSucessful<T> = {
    readonly kind: 'Sucessful'
    readonly data: T
}
export const ResultSucessful = <T>(data:T):ResultSucessful<T> => ({kind: 'Sucessful', data})

export type ResultError = {
    readonly kind: 'Error'
    readonly data: Error
}
export const ResultError = (data: Error): ResultError => ({kind: 'Error', data})

export type ReceptionHandlerResult<T> = 
    | ResultProcessing
    | ResultSucessful<T>
    | ResultError


// === Protocoled Messanger ===

export type SerialMessenger<T> = {
    readonly toWrite: () => Bytes
    readonly receptionHandler: (_: Byte) => ReceptionHandlerResult<T>
}


// === Oppened serial port ===


/** Represents a generic serial port stream already oppened*/
export type SerialPort = {
    readonly write: (_: Bytes) => unknown
    readonly close: () => void
    readonly onClose: (callback: () => void) => void
    readonly onData: (callback: (_: Bytes) => void) => void
    readonly onError: (callback: (error?: Error) => void) => void
}


// === Serial-port creator (Driver) ===


/** How to open a port on the system (the implementation is plataform specific)*/
export type SerialPortDriver = (_: PortName, portConfig: PortConfig) => Promise<SerialPort> 


// === Effect Runner ===

type PortTransaction = <T>(driver: SerialPortDriver, _port: PortReference, m:SerialMessenger<T>) => Promise<T>


// =======================================
// === Effect Runner Implementation ===
// =======================================

/** Reception buffer */
let receptionByteBuffer: number[] = []

export const runPortTransaction: PortTransaction = async <T>(driver: SerialPortDriver, _port: PortReference, m: SerialMessenger<T>): Promise<T> => {

    /** Opens and returns the serial port */
    const getPort = async () => {
        await delay(150) // fix: remove this delay. This delay is to give time to concrete port to close and open again (see serial driver implementation)
        const port = await driver(_port.portName, _port.portConfig)
        return port
    }

    /** concrete serial port where transaction effects happens */
    const cPort = await getPort()

    return new Promise( (resolve, reject) => {

        /** Helper*/
        type Callback<T extends keyof SerialPort> = Parameters<SerialPort[T]>[0]
    
        // --- call-backs ---

    
        const onClose: Callback<'onClose'> = () => {
            console.log(`ComPort closed: ${_port.portName}`)
        }
    
        const onError: Callback<'onError'> = error => {
            console.log(`Comport error: ${error}`)
            cPort.close()
            reject(error)
        }

        const onData: Callback<'onData'> = data => {
            console.log(`Receiving data: ${data}`)

            // fill reception buffer
            data.map(each => receptionByteBuffer.push(each))

            // proccess each byte from reception buffer
            let loop: boolean = true
            while (loop === true) {

                if (receptionByteBuffer.length === 0) break

                const nextByte = receptionByteBuffer.shift()
                if (nextByte === undefined) break

                const r = m.receptionHandler(nextByte) 

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
            cPort.write(m.toWrite()) 
            
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