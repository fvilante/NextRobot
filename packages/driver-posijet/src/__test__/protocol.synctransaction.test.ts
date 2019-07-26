import { PacoteDeTransmissao, pacoteDeTransmissao, pacoteDeRetorno_ComErro, pacoteDeRetorno_DeEnvioSemErro } from './../protocol.spec';
import { UnsafeIOEffect } from './../serialport';
import * as R from 'ramda'
import { PacoteDeRetorno } from '../protocol.spec';
import { syncTransaction, ERR_FRAME_DE_RESPOSTA_AUSENTE_OU_INVALIDO } from '../protocol.synctransaction';
import { SerialPort, defaultSerialPort } from '../serialport';
import { Bytes } from '../byte';
import { Direcao, segment, int2word } from '../transport';


describe('Testa mecanismo de transacao serial sincrona CMPP versao Posijet1', () => { 

    //configure async test case
    expect.assertions(1)
    //arrange
    const direcao: Direcao = Direcao.ENVIO
    const canal = 6
    const comando = 60
    const dado = 12
    const [dadoH, dadoL] = int2word(dado)
    const p: PacoteDeTransmissao = pacoteDeTransmissao(direcao, canal, comando, dado)


    //EMULADOR SERIAL --> ECHO DE SINAL
    const effect_1 = ( () => {
        
        let buffer: Bytes[] = [] 

        const read = ():Bytes => {
            const b = R.flatten(buffer)
            return b
        } 

        const write = (data: Bytes): void => {
            buffer.push(data)
        }
        return { 
            read,
            write,
        }
    })()


    //EMULADOR SERIAL --> OUVE MAS NAO RESPONDE
    const effect_2 = ( () => {
        const read = ():Bytes => []
        const write = (data: Bytes): void => { }
        return { 
            read,
            write,
        }
    })()


    it('envia e recebe um pacote sincrono asincronamente', async () => {        
        
        // arrange
        const porta: SerialPort = defaultSerialPort('COM_TEST', effect_1)

        // act
        const retorno: PacoteDeRetorno = await syncTransaction(porta, p)

        //assert
        const expected = pacoteDeRetorno_DeEnvioSemErro(segment(direcao,canal,comando,dadoL,dadoH))
        const result = retorno

        expect(
            result
        ).toEqual(expected)
       
    })


    it('erro porque o frame nao foi recebido a tempo ou é invalido', async () => {   

        // arrange
        // PORTA MUDA (NAO RESPONDE)
        const porta: SerialPort = defaultSerialPort('COM_TEST', effect_2)
        
        return expect(
            syncTransaction(porta, p) //act
        ).rejects.toEqual(ERR_FRAME_DE_RESPOSTA_AUSENTE_OU_INVALIDO) //assert


    })





})
