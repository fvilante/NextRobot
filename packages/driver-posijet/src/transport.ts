import { Frame, STX, createPerfectFrame, ACK, Obj } from './datalink.common';
import { Byte } from './byte'
import * as R from 'ramda'


//TODO: Mover Direcao para arquivo protocol.spec
export enum Direcao {
    SOLICITACAO = 0,
    ENVIO = (1 << 7) + (1 << 6), //192 decimal
    MASCARA_PARA_SETAR_BITS = 1 << 7,
    MASCARA_PARA_RESETAR_BITS = 1 << 6,
}

//TODO: Mover estes types para protocol.spec
export type DadoH = Byte
export type DadoL = Byte
export type Comando = Byte
export type Dado = number // max = 16 bits number
export type Canal = Byte // max = 6 bits number


export interface Segment {
    direcao: Direcao
    canal: Canal
    comando: Comando //ou endereço em word
    dadoL: DadoL
    dadoH: DadoH
}

//TODO: trocar o construtor de Segment para receber dado, e nao dadoH,dadoL.
//      Ela deve abstrair o conceito de byte, ela é uma interpretacao do OBJ que é bytes. 
//      Como ela dá significado, ela pode abstrair.
export function segment(direcao, canal, comando, dadoL, dadoH): Segment {
    return { direcao, canal, comando, dadoH, dadoL }
}


//Note that this routine do not embbed segment into a frame, but just serializes its data
export function serializeSegment(s:Segment): Obj {
    
    //TODO: make start_byte an enumeration
    //TODO: add some type safety to Canal that must be uint6_t
    const direcao_e_canal = s.direcao + s.canal

    return [
        direcao_e_canal,
        s.comando,
        s.dadoL,
        s.dadoH
    ]
    
}

export function word2int(dadoH: DadoH, dadoL: DadoL): Dado {
    return ( (R.clamp(0,255)(dadoH) * 256) + R.clamp(0,255)(dadoL) ) 
}


export function int2word(dado: Dado): [DadoH, DadoL] {

    const dadoH = R.clamp(0,255)(Math.floor( dado/256 ))
    const dadoL = R.clamp(0,255)(R.modulo(dado, 256))

    return [dadoH, dadoL]

}

export function frame2Segment(frame: Frame): Segment {

    //TODO: Substituir este throw por uma logica de Maybe<Segment>
    const obj = frame.OBJECT
    if (obj.length != 4)
        throw new TypeError("Frame Recebido contem 'Segment' invalido (tamanho diferente de 4 bytes)")

    const direcao_e_canal = obj[0]    
    const direcao = direcao_e_canal & 0b11000000 
    const canal = direcao_e_canal - direcao

    return {
        direcao,
        canal,
        comando: obj[1],
        dadoL:   obj[2],
        dadoH:   obj[3],
    }

}


export const segment2Frame = (start_byte: Byte, s: Segment): Frame =>
    createPerfectFrame(start_byte, serializeSegment(s))

//TODO: criar conceito de MasterFrame e SlaveFrame nos outros modulos
export const segment2MasterFrame:  (s:Segment) => Frame = R.partial(segment2Frame,[STX])
export const segment2SlaveFrame:  (s:Segment) => Frame = R.partial(segment2Frame,[ACK])


