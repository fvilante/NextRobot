import { checksum, dup_esc } from '../datalink.out'
import * as R from 'ramda'
import { Byte, Bytes, BytesC } from '../byte'
import { createPerfectFrame, frame2Bytes, Obj, ESC, STX, ETX, ACK, NACK } from '../datalink.common'


//helper
const createFrameBytes = (startByte: Byte) => (obj: Obj): Bytes =>
    frame2Bytes(createPerfectFrame(startByte, obj))


describe('Criação de Frame', () => { 

    describe('a partir de um objeto simples', () => {

            const obj = BytesC([1,2,3])
            

        it('existencia de uma funcao para o calculo de checksum que recebe parametros obj e start_byte', () => {
            const expected = checksum(obj, STX)
            //assert
            expect(
                checksum(obj, STX)
            ).toEqual(expected)
        })

        it('construcao de frame', () => {
            const expected = R.flatten([ESC,STX,1,2,3,ESC,ETX,dup_esc([checksum(obj,STX)])])
            expect(
                createFrameBytes(STX)(obj)
            ).toEqual(expected)
        })
    })


    describe('Teste de construcao de frame comparando com frames reais', () => {    
        it('um unico frame', () => {
            const sample = BytesC([0x1B, 0x02, 0xC1, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x87])    
            const obj = BytesC([0xC1, 0x50, 0x61, 0x02])
            const expected = sample
            expect(
                createFrameBytes(STX)(obj)
            ).toEqual(expected)
        })

        it('alguns frames com STX', () => {
            const samples_stx = [
                BytesC([0x1B, 0x02, 0xC1, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x87]),
                BytesC([0x1B, 0x02, 0x01, 0x99, 0x62, 0x63, 0x1B, 0x03, 0x9C]),
                BytesC([0x1B, 0x02, 0x01, 0xB5, 0x9A, 0x9B, 0x1B, 0x03, 0x10]),
            ] 
            const samples_ack = [
                BytesC([0x1B, 0x06, 0x01, 0xB4, 0x00, 0x00, 0x1B, 0x03, 0x42,]),
                BytesC([0x1B, 0x06, 0x01, 0xA5, 0x78, 0x79, 0x1B, 0x03, 0x60,]),
                BytesC([0x1B, 0x06, 0xC1, 0x5F, 0x00, 0x00, 0x1B, 0x03, 0xD7,]),
            ]
            
            function createFrames(startByte, samples) {
                const objs = samples.map(frame=> frame.slice(2,6))
                const result = objs.map( obj => createFrameBytes(startByte)(obj) )
                return result
            }

            const result = [ createFrames(STX, samples_stx), createFrames(ACK, samples_ack) ]
            const expected = [ samples_stx, samples_ack ]

            
            expect(
                result
            ).toEqual(expected)
        })


    })


    describe('duplicacao de ESC', () => {

        it('duplicacao de ESC no objeto', () => {
            const obj = BytesC([27])
            const expected =  R.flatten([ESC,STX,27,27,ESC,ETX,dup_esc([checksum(obj,STX)])])
            expect(
                createFrameBytes(STX)(obj)
            ).toEqual(expected)
        })


        it('duplicacao de ESC no checksum', () => {
            const obj = BytesC([0,251-27]) //this obj will brings a checksums equals to ESC
            const expected = BytesC(R.flatten([ESC,STX,obj,ESC,ETX,dup_esc([checksum(obj,STX)])]) )
            expect(
                createFrameBytes(STX)(obj)
            ).toEqual(expected)
        })

        it('duplicacao de ESC em ambos, tanto no checksum quanto no objeto', () => {
            const obj = BytesC([0,0,0,27,0,27,0,0,0,251-27]) //this obj will brings a checksums equals to ESC
            const expected =  R.flatten([ESC,STX,dup_esc(obj),ESC,ETX,dup_esc([checksum(obj,STX)])])
            expect(
                createFrameBytes(STX)(obj)
            ).toEqual(expected)
        })


    })


})


describe('Gerador de Frame defeituosos', () => { 

    it('duplicacao de ESC no checksum', () => {

        expect(
            "A"
        ).toEqual("A")

    })
})