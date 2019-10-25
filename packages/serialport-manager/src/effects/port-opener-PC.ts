
// tslint:disable: no-expression-statement no-if-statement no-let

import { Bytes } from '../data-models/bytes'


// === implementation imports ===

import * as Stream from 'stream'
const a = Stream.Readable

import * as serial_port from 'serialport';
import { _Port, PortReference, defaultPortConfig } from '../data-models/port';
import { detectSerialPorts } from './detectSerialPorts';
import { Future, Right, Left, delay } from '@nextrobot/core-utils';
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
export const serialPortOpenner: _Port['Opener'] = port => {

    return Future( resolver => {

            //const wait_to_open = delay(250)

            // create concrete port
            const getAPort = () => new SerialPort(port.name, {...port.config, baudRate: port.baudRate, ...{ autoOpen: false }})
            
            const _port = getAPort()

            // open handler
            const createPortHandler = ():_Port['Openned'] => {
                        return {
                            write: data => _port.write([...data.bytes]),
                            close: () => { _port.close() },
                            onClose: callback => { _port.on('close', callback) },
                            onData: callback => _port.on('data', (data: unknown) => callback(NodeBufferToBytes(data))),
                            onError: callback => _port.on('error', callback),
                            info: () => ({
                                name: 'loopback-test-mockup-port',
                                detail: {kind: 'RemotePortInfo'}
                            }),//portInfo,
                            reference: () => port,
                            // todo: add onWrite
                        }
                    }



            // error handler for port opening
            const openError = (err?: Error | null): void => 
                (err === undefined || err === null)
                    ? resolver( Left( new Error(`Error: Cannot open serial port ${port.name}`) ) )
                    : resolver( Left( err ) )
            

            // set handlers and open
            _port.on('open', () => resolver(Right(createPortHandler())))
            _port.on('error', openError) //todo: check if 'openError' is as expected overwritted when iPort.onError is called
            
            // do try to open
            _port.open() 
            
          


        })
        
        
}

// open and just close the port
const Test1 = async () => {

    const p = PortReference( 'COM6', 2400, defaultPortConfig )

    const opened = serialPortOpenner(p)

    const closeImediately = opened.fmap( o => Future<undefined>( resolver => {

        o.onError( err => { console.log( `Erro -> ${err}`)})
        o.onClose( () => { console.log(`Porta sendo fechada`); resolver(Right(undefined)) })
        o.onData( b => { console.log(`recebendo ${b.bytes}`) })
        o.write( Bytes([0x1B, 0x02, 0xC2, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x86]))
        delay(1000).runP().then( () => o.close())


    }))

    const b = closeImediately.runP().then( ei => ei.match({
        Left: err => {console.log(`final com erro -> ${err}`)},
        Right: a => { console.log(`final bem sucedido ${a}`)}

    }))



}


Test1()

