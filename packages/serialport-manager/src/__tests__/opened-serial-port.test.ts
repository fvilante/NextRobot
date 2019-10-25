import { serialPortOpenner as serialPortOpenner_Loopback  } from '../effects/port-opener-loopback'
import { serialPortOpenner as serialPortOpenner_PC } from '../effects/port-opener-PC'

import { delay, Future, Right } from '@nextrobot/core-utils'
import { Bytes} from '../data-models/bytes'
import { _Port, defaultPortConfig, PortReference, PortOpened } from '../data-models/port'



// tslint:disable: no-expression-statement no-let


describe('Can open a serial port and transact data', () => { 

    /*
    it('can send and receive data through emulated loop-backed serial-port', async () => {     

        // configure

        const port = () => serialPortOpenner_Loopback(PortReference('Fake-Loopback', 9600,defaultPortConfig ))

        let receptionBuffer: Bytes['bytes'] = []
        const dataMsg = [0x1B, 0x02, 0xC2, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x86]

        const sendData = (data:Bytes) => (port: PortOpened): Future<undefined> =>
            Future( resolver => {

                port.onData( data => { receptionBuffer = [...receptionBuffer, ...data.bytes] } )
                port.onClose( () => {} )
                port.onError( error => { })
                port.write(Bytes(dataMsg))
                resolver(Right(undefined))
                
            })
            
        const doWork = await port()
            .fmap( sendData( Bytes(dataMsg) ))
            .fmap( () => delay(1000) )
            .fmap( () => port().map( port => port.close()))
            .runP()
            .then( ei => ei.match({
                Left: err => { console.log(`Fim com erro ${err}`)},
                Right: () => { 
                    console.log(`Fim bem sucedido`)

                
                },
                
            }))

                        
        const expected = dataMsg
        const result = [...receptionBuffer]
        expect(result).toEqual(expected)
    })
*/
    it('can send and receive data through real Posijet1-CMPP serial', async () => {    
        
        /** NOTE: This test will fail if there is no real CMPP connected on the specified serial port */

        /** Port where real cmpp is connected */
        const CMPP_PORT = 'COM6'
		// ATTENTION: This test only works in COM2 at 2400 configured as Channel 2!!
        const baudRate = 2400 

        // configure

        let receptionBuffer: readonly number[] = []
        const dataMsg = [0x1B, 0x02, 0xC2, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x86]

        const port = () => serialPortOpenner_PC(PortReference(CMPP_PORT, baudRate, defaultPortConfig ))

        const sendData = (message:Bytes) => (port: PortOpened): Future<undefined> =>
            Future( resolver => {

                port.onData( data => { receptionBuffer = [...receptionBuffer, ...data.bytes] } )
                port.onClose( () => { console.log(`fechando porta`) } )
                port.onError( error => { console.log(error) })
                port.write(message)
                resolver(Right(undefined))
                
            })
            
        const doWork = await port()
            .fmap( sendData( Bytes(dataMsg) ))
            .fmap( () => delay(500) )
            .fmap( () => port().map( port => port.close()))
            .runP()
            .then( ei => ei.match({
                Left: err => { console.log(`Fim com erro ${err}`)},
                Right: () => { 
                    console.log(`Fim bem sucedido`)                
                },
                
            }))

                        
        const expected = [27, 6, 194, 80, 0, 64, 27, 3, 165]
        const result = [...receptionBuffer]
        console.log(result)
        console.log(expected)
        expect(result).toEqual(expected)

    })


})
