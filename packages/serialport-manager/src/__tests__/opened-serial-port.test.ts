import { serialPortOpenner as serialPortOpenner_Loopback  } from '../port-opener/port-opener-loopback'
import { serialPortOpenner as serialPortOpenner_PC } from '../port-opener/port-opener-PC'
import { PortReference } from '../port-opener/port-reference'
import { delay } from '@nextrobot/core-utils'
import { Bytes} from '../data-models/bytes'

// tslint:disable: no-expression-statement no-let

// just a example how to write a test: arrange / assert / act (TDD)
describe('Can open an emulated serial port', () => { 

    const portConfig: PortReference['portConfig'] = {
        baudRate: 2400,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        rtscts: false,
        xon: false,
        xoff: false,
    }

    it('can send and receive data through emulated loop-backed serial-port', async () => {     

        // configure

        let receptionBuffer: Bytes = []
        const dataMsg = [0x1B, 0x02, 0xC2, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x86]

        try {
            //sendData()
            const port = await serialPortOpenner_Loopback(PortReference('Fake-Loopback', portConfig))
            port.onData( bytes => receptionBuffer = [...receptionBuffer, ...bytes])
            port.onClose( () => {} )
            port.onError( error => {})
            port.write(dataMsg)
            await delay(1000)
            port.close()
        } catch (err) {
            console.log(`erro ao abrir porta: ${err}`)
        }


        const expected = dataMsg
        const result = [...receptionBuffer]
        expect(result).toEqual(expected)
    })

    it('can send and receive data through real Posijet1-CMPP serial', async () => {    
        
        /** NOTE: This test will fail if there is no real CMPP connected on the specified serial port */

        /** Port where real cmpp is connected */
        const CMPP_PORT = 'COM3'

        // configure

        let receptionBuffer: Bytes = []
        const dataMsg = [0x1B, 0x02, 0xC2, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x86]
            
        try {
            const port = await serialPortOpenner_PC(PortReference(CMPP_PORT, portConfig))
            port.onData( bytes => receptionBuffer = [...receptionBuffer, ...bytes])
            port.onClose( () => {} )
            port.onError( error => {})
            port.write(dataMsg)
            await delay(500)
            port.close()
        } catch (err) {
            console.log(`erro ao abrir porta: ${err}`)
        }


        const expected = [27, 6, 194, 80, 0, 64, 27, 3, 165]
        const result = [...receptionBuffer]
        expect(result).toEqual(expected)
    })


})
