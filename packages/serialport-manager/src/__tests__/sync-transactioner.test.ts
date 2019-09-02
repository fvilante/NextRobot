import { PortReference } from '../serial-opener/port-reference'
import { Datalinker } from '../datalink/datalinker-core'
import { serialPortOpenner } from '../serial-opener/serial-opener-PC'
import { datalinker } from '../datalink/datalinker-posijet1'
import { syncTransactioner } from '../serial-sync-transaction/sync-transactioner' 

import { rangeSync } from '@nextrobot/core-utils'

// tslint:disable: no-expression-statement


describe('Sync transaction using Posijet1 Datalinker', () => { 

    /** Port where real cmpp is connected */
    const CMPP_PORT = 'COM3'

    const portConfig: PortReference['portConfig'] = {
        baudRate: 2400,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        rtscts: false,
        xon: false,
        xoff: false,
    }
 
    const portReference: PortReference = PortReference(CMPP_PORT, portConfig)


    it('algorithm can create valid frame', () => {        
        const expected = datalinker([0xC2, 0x50, 0x61, 0x02]).toWrite()
        const result = [0x1B, 0x02, 0xC2, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x86]
        expect(result).toEqual(expected)
    })

    it('can transact a simple packet with a real CMPP posijet1 protocol', async () => {      
        
        /** NOTE: This test will fail if there is no real CMPP connected on the specified serial port */

        const probe = [0xC2, 0x50, 0x61, 0x02]
        const msg = datalinker(probe)
        const response = await syncTransactioner(serialPortOpenner, portReference, msg)
        //console.log(`Resposta do pacote: ${response.data}`)

        // ignore dadoh and dadol on response
        const expected = [probe[0], probe[1]] 
        const result = [response.data[0], response.data[1]]
        expect(result).toEqual(expected)
    })


})

