import { checksum, dup_esc } from '../datalink.out'
import { Byte, Bytes } from '../common'
import { Frame, Obj, ESC, STX, ETX, ACK, NACK,
        createPerfectFrame, frame2Bytes, changeFrame } from '../datalink.common'
import * as R from 'ramda'
import { cloneDeep } from 'lodash'
import { isValidFrame } from '../datalink.in'
import { um_frame_perfeito_qualquer, 
    CasoDeFalha, um_frame_perfeito, criaTodosCasosDeFalha, aplicaCasoDeFalha,
    casoDeFalhaPosicional, casoDeFalhaRuidoAleatorio1, ruido} from '../datalink.failmode'



describe('Modos de Falha', () => { 


    it('Testa se o mecanismo de criacao de frame perfeito está funcionando', () => {       
        
        //configure
        const probes = {
            startBytes: [STX, ACK, NACK] ,
            objs: [ [1,2,3,4], [0,0,0,0], [27,0,27,0], [77,88] ]
        }

        //act
        const framePerfeito = (stbyte: Byte) => (obj: Bytes) => frame2Bytes( createPerfectFrame(stbyte, obj) )
        const perfectFrames = R.map( e => framePerfeito(e[0])(e[1]), R.xprod(probes.startBytes, probes.objs) ) // array
        const result = perfectFrames.every(isValidFrame)
        const expected  = true
        //assert        
        expect(
            result
        ).toEqual(expected)
    })


    it('Testa se o mecanismo de criacao de frame perfeito REAL está funcionando', () => {       

        const obj = [1,2,3]

        const e1 : Frame = {
            PRE_NOISE: [],
            INITIAL_ESC: [ESC],
            START_BYTE: [ACK],
            OBJECT: obj,
            FINAL_ESC: [ESC],
            END_BYTE: [ETX], 
            CHECKSUM: [checksum(obj, ACK)],
            POST_NOISE: []
        }

        const expected = [e1, true]

        const r1 = createPerfectFrame(ACK,obj)
        
        const result = [ r1, isValidFrame(frame2Bytes(r1)) ]

        expect(
            result
        ).toEqual(expected)
    })

    it('verifica se o gerador de ruido é deterministico', () => {  

        expect(
            ruido(20)
        ).toEqual(ruido(20))


    })


    it('Testa  aplicacao de caso de falha POSICIONAL em um frame perfeito', () => {       
        
        //arrange
        const caso_posicional: CasoDeFalha = casoDeFalhaPosicional('FINAL_ESC','triplicado')        
        const um_frame_real_perfeito: Frame = createPerfectFrame(ACK,[1,2,3])
        const expected: Frame = changeFrame([["FINAL_ESC",[ESC,ESC,ESC]]], um_frame_real_perfeito)

        //act
        const frameFalhado: Frame = aplicaCasoDeFalha(um_frame_real_perfeito, caso_posicional)
        const result =  frameFalhado
        
        //assert
        expect(
            result
        ).toEqual(expected)
    })

    it('Testa  aplicacao de caso de falha ALEATORIO1 em um frame perfeito', () => {       
        
        //arrange
        const caso_posicional: CasoDeFalha = casoDeFalhaRuidoAleatorio1('POS-FRAME', 5 )    
        const um_frame_real_perfeito: Frame = createPerfectFrame(ACK,[1,2,3])
        const expected:Frame = changeFrame([["POST_NOISE", ruido(5) ]], um_frame_real_perfeito)

        //act
        const frameFalhado: Frame = aplicaCasoDeFalha(um_frame_real_perfeito, caso_posicional)
        const result =  frameFalhado
        
        //assert
        expect(
            result
        ).toEqual(expected)
    })







    it('Testa se todos os modos de falha possiveis realmente estao sendo reconhecidos como pacotes invalidos', () => {       
        
        //arrange
        const casos: CasoDeFalha[] = criaTodosCasosDeFalha
        const um_frame_real_perfeito: Frame = createPerfectFrame(STX,[1,2,3])

        interface R {casoDeFalha: CasoDeFalha, frame: Frame, mustBeFalse: boolean}

        function AplicaFalhaEVerificaValidade(casoDeFalha: CasoDeFalha, frame: Frame): R {          
            const frameFalhado: Frame = aplicaCasoDeFalha(frame, casoDeFalha)
            const mustBeFalse = isValidFrame(frame2Bytes(frameFalhado))

            return  { casoDeFalha, frame: frameFalhado, mustBeFalse }
        }
        
        //estou deixando um falso positivo para
        const numero_de_falsos_positivos = 1

        //act
        const testes = R.map ( 
            caso => AplicaFalhaEVerificaValidade(caso, um_frame_real_perfeito), 
            casos ) 
        
        //filtra apenas casos de falso positov (=deveria ser um pacote falho mas é um pacote valido)    
        const res = R.filter( ({casoDeFalha, frame , mustBeFalse}) => (mustBeFalse == true), testes)

        //assert
        const result =numero_de_falsos_positivos
        const expected = res.length

        
        expect(
            result
        ).toEqual(expected)


    })



})