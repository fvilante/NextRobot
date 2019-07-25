import { STX, frame2Bytes, ACK } from './../datalink.common';
import * as R from 'ramda'
import { test, criaPortaSerialEmulada } from '../emulador.cmpp'
import { SerialPort } from '../serialport';
import { createPerfectFrame } from '../datalink.common';


describe('Emulador de CMPP', () => { 


    it('test', () => {        
        const expected = test
        const result = "oi"
        expect(
            result
        ).toEqual(expected)
    })

    it('teste', () => {        
        
        const port: SerialPort = criaPortaSerialEmulada()
        
        const probe1 = frame2Bytes( createPerfectFrame(STX,[1,11,22,33]) )

        port.write(probe1)
        const result = port.read()
        
        const expected = frame2Bytes( createPerfectFrame(ACK, [0,11,22,33]) )

        expect(
            result
        ).toEqual(expected)
        
    })








})
