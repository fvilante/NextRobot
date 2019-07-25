import { Frame, createPerfectFrame, ACK } from './../datalink.common';
import {segment, Direcao, Segment, word2int, int2word, 
    Dado, DadoL, DadoH, frame2Segment, Canal, segment2Frame } from '../transport'
import * as R from 'ramda'
import { Byte } from '../common';

describe('transport layer', () => {    
    it('construtor do segmento', () => {

        const result = segment(Direcao.ENVIO, 7, 12, 1, 5)
        const expected : Segment = {
            direcao: 192,
            canal: 7,
            comando: 12, 
            dadoL: 1,
            dadoH: 5,
        }

        //assert
        expect(
            result
        ).toEqual(expected)

    })

    describe('conversao de dado do segmento', () => { 

        it('conversao word2int', () => {
            
            const result_expected = [ 
                [word2int(0,0), 0, 0 ],
                //dadoL
                [word2int(0,255), 255, 1 ],
                [word2int(0,256), 255, 2 ], //clamp if above 255
                [word2int(0,10), 10, 3 ],
                //dadoH
                [word2int(1,0), (0xFF+1), 4 ],
                [word2int(2,0), (0xFF+1) * 2, 5],
                [word2int(256,0), (0xFF+1) * 255, 6], //clamp if above 255
                [word2int(255,10), ((0xFF+1) * 255) + 10, 7],
                //both
                [word2int(2,5), ((0xFF+1) *2) + 5, 8],
                [word2int(255,255), ((0xFF+1) * 255) + (0xFF), 9 ], // max value
                [word2int(256,256), ((0xFF+1) * 255) + (0xFF), 9 ], //clamp
            ]

            const result = R.filter( re => R.not((re[0]==re[1])), result_expected)
            const expected = []

            expect(
                result
            ).toEqual(expected)

        })


        it('conversao int2word', () => {

            const result_expected = [
                [int2word(0), [0,0] ],
                [int2word(10), [0,10] ],
                [int2word(255), [0,255] ],
                [int2word(256), [1,0] ],
                [int2word(512), [2,0] ],
                [int2word(65535), [0xFF,0xFF] ],
            ]

            const f = (re) => {
                const expected = re[1]
                const result = re[0]
                return R.equals(expected, result)
            }

            const result = R.filter( re => R.not( f(re) ), result_expected )
            const expected = []

            expect(
                result
            ).toEqual(expected)

        })
    })


    it('consegue converter de frame para segment (protocolo posijet v1)', () => {

        const frame = createPerfectFrame(ACK,[192+5,60,1,5])
        
        const result = frame2Segment(frame)
        
        const expected : Segment = {
            direcao: Direcao.ENVIO,
            canal: 5,
            comando: 60, 
            dadoL: 1,
            dadoH: 5,
        }

        //assert
        expect(
            result
        ).toEqual(expected)

    })


    it('lança exception caso obj do frame real tenha tamanho diferente de 4 (conforme versao 1 do protocolo Posijet) ', () => {
        
        const frame = createPerfectFrame(ACK,[192,60,1])
        
        // frame has only 3 bytes in object, and must thrown
        // an error to conform to posijet1 protocol version
        const t = () => frame2Segment(frame) 

        //assert
        expect(
            t
        ).toThrow()

    })


    it('consegue converter de Segment (protocolo posijet v1) para Frame', () => {

        // arrange
        const start_byte: Byte = ACK
        const direcao: Direcao = Direcao.ENVIO
        const canal: Byte = 7
        const comando: Byte = 60
        const dadoL: Byte = 5
        const dadoH: Byte = 1

        const s:Segment = segment(direcao, canal, comando, dadoL, dadoH)
        
        // act
        const result = segment2Frame(ACK, s)
        
        // assert
        const expected : Frame = createPerfectFrame(
            start_byte, 
            [direcao+canal, comando, dadoL, dadoH]
        )

        expect(
            result
        ).toEqual(expected)

    })

   

})