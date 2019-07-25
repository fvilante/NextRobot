import { Word, Byte, Bytes } from './common';
import { PortName, SerialPort } from './serialport';
import { PacoteDeTransmissao, PacoteDeRetorno, interpretacaoFrameDeRetorno, pacoteDeTransmissaoToBytes, pacoteDeRetorno_ComErro } from "./protocol.spec"
import * as R from 'ramda'
import { isVariableDeclarationList } from 'typescript';
import { isValidFrame, bytesToFrameReal } from './datalink.in';
import { Frame } from './datalink.common';
import { segment } from './transport';


//TODO: Mecanismo de pooling da porta pode ser mais eficiente (rapido) fazendo um pooling mais frequente
const MIN_WAIT_TIME_TURN_AROUND = 150   //milliseconds  //quanto tempo leva no minim para receb3r a informacao completa


type ByteBuffer = Array<Bytes>


export const ERR_FRAME_DE_RESPOSTA_AUSENTE_OU_INVALIDO = "Nenhum frame recebido, ou o frame recebido nao é valido."



// papeis:
//  - receber a informacao a ser enviada
//  - empura e puxa da porta
//  - controla os tempos de comunicacao
//  - performa transformacoes de serializacao e desserializacao
//  - relaciona o recebimento ao envio
//  - bufferiza o recebimento
//  - gerencia varios tipos de erros

// dominios de problema
//  - dominio da transacao sincrona
//      - dominio do protocolo de comunicacao com o dispositivo
//      - dominio dos tempos envolvidos na comunicacao
//      - gestao de erros
//  - abertura e fechamento da porta
//  - receber a informacao a ser enviada

//must be called only when port is free and ready to synchronous transaction 
//TODO: Gostaria de evitar exceptions nesta funcao
//TODO: Codigo pode ser refatorado para melhor clareza
export async function syncTransaction(port: SerialPort, p: PacoteDeTransmissao): Promise<PacoteDeRetorno> {
    
    let readBuffer: ByteBuffer = [] 

    return new Promise( (resolve, reject) => {
        
        //write to serial
        port.write( pacoteDeTransmissaoToBytes( p ) )

        //set timer to get response
        setTimeout( 
            () => {

            //read response from serial
            readBuffer.push( port.read() )

            //is there a valid complete packet ?
            if (isValidFrame( R.flatten(readBuffer) ) ) {
                const frame: Frame = bytesToFrameReal( R.flatten(readBuffer) )
                try {
                    const r: PacoteDeRetorno = interpretacaoFrameDeRetorno(p, frame)
                    resolve(r)
                } catch {
                    //TODO: evitar este mecanismo de throw para controle de erros, usar algo mais declarativo e mais flexivel (veja Diagnostic em typescript.d.ts)
                    reject ( new TypeError("Frame é valido porem transacao sincrona nao pode ser interpretada") )
                } 
            } else { 
                // frame is not valid
                reject("Nenhum frame recebido, ou o frame recebido nao é valido.")
            }



        }, MIN_WAIT_TIME_TURN_AROUND )

    })                                    

}
