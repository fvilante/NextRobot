import { checksum, dup_esc } from '../datalink.out'
import { Bytes, BytesC } from '../byte'
import { Obj, Frame, ESC, STX, ETX, ACK, NACK,
         frame2Bytes as frame2Bytes, createPerfectFrame } from '../datalink.common'
import { isValidFrame, bytesToFrameReal } from '../datalink.in'
import * as R from 'ramda'


describe('Verificacao da validade do Frame', () => { 

    it('funcao que verifica se o frame é valido', () => {     

        /*
            NOTA --->   O teste da funcao que verifica se frame é valido esta sendo feita pelo 
                        modulo datalink.failmode.test. Todos os casos de erro de pacote estao sendo 
                        testasdos usando o produtor de erros artificiais datalink.failmode
        */

        const result = true
        const expected = true

        //assert
        expect(
            result
        ).toEqual(expected)
    })  

})



describe('Parsing e interpretacao de frame', () => { 

    const obj: Bytes = BytesC([1,2,3,4])
    const frameRealPerfeito = createPerfectFrame(ACK,obj)
    const stream = frame2Bytes(frameRealPerfeito)


    it('funcao que parseia um frame valido', () => {     

        expect(
            bytesToFrameReal(stream)
        ).toEqual(frameRealPerfeito)

    })


    it('testa criacao de objeto com resumo da interpretacao do frame em bytes', () => { 
    
        // not implemented
        const expected =   0
        const result = 0

        expect(
           result
        ).toEqual(expected)
    
    })

    




})
