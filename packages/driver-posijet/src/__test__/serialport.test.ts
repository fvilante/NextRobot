import { test } from '../serialport'
import * as R from 'ramda'
import { defaultSerialPort, SerialPort, UnsafeIOEffect, PortName } from '../serialport'
import { Bytes, BytesC } from '../byte'


describe('Serial Port Effects', () => {    
    

    it('Testa porta basica com mockup de side-effects de escrita/leitura', () => {
        
        //arrange
        let buffer: Bytes = BytesC([])
        const read = () => { const res = buffer; buffer =[]; return R.flatten(res) }
        const write = (data: Bytes) => buffer = R.concat(buffer, data)
        const effects: UnsafeIOEffect = { read, write }        
        const portCom1 = defaultSerialPort("com1", effects)
        const probe1 = [ 1,11 ]
        const probe2 = [ 2,22 ]
        const probe3 = [ 3,33 ]
        //act - escreve e le na serial
        portCom1.write(probe1)
        portCom1.write(probe2)
        portCom1.write(probe3)
        const lido1 = portCom1.read()
        portCom1.write(probe1)
        //assert
        const result = [lido1, buffer]
        const expected = [ R.flatten([probe1, probe2, probe3]), R.flatten([probe1]) ]
        expect(
            result
        ).toEqual(expected)

    })

})