import { PacoteDeTransmissao, PacoteDeRetorno } from './protocol.spec';
import { Frame, createPerfectFrame, ACK, STX, frame2Bytes, Obj, NACK } from './datalink.common';
import { Bytes, Byte, Bit, Word, Bit8Value, Bit8Description, Bit16Value, 
         Bit16Description, bit8Value, bit16Value } from './common';
import * as R from 'ramda'
import { word2int, int2word, frame2Segment, Direcao, Segment, serializeSegment, DadoL } from './transport';
import { bytesToFrameReal } from './datalink.in';



 //==========  DATA MODEL OF PROTOCOLO POSIJET 1 - VERSION 9-JUN-2010 ============



export const Reservado = "Reservado para aplicacoes especiais"




// ================================================
// ==========   OBJETOS RELEVANTES     ============
// ================================================


interface ByteInfo {    
    value: Bit8Value   
    description: Bit8Description
}

interface WordInfo {
    value: Bit16Value
    description: Bit16Description
}



// ----- STATUSL ----------------------------------



export interface StatusL extends ByteInfo {
    type: "StatusL" 
}

export function statusL(data: Byte): StatusL {

    /*
        Obs.: Se os bits 4 e 5 estiverem em 1 teremos um movimento uniforme 
        (ou seja, sem aceleração e sem desaceleração).
    */

    const value = bit8Value(data)

    const description: Bit8Description = {
            0: "Referenciado",
            1: "Ultima posição a ser executada foi alcançada.",
            2: "Referenciando",
            3: "Direção do movimento é positiva",
            4: "Movimento acelerado",
            5: "Movimento desaceleração",
            6: Reservado,
            7: "Evento de erro, e deve ser consultado na mascara de erro. CMD=69 =45h",
    }
    return {
        type: "StatusL",
        value,
        description
    }

}



// ----- STATUSH ----------------------------------



export interface StatusH extends ByteInfo { 
    type: "StatusH" 
}

export function statusH(data: Byte): StatusH {

    const value = bit8Value(data)

    const description: Bit8Description = {
            0: Reservado,
            1: Reservado,
            2: Reservado,
            3: Reservado,
            4: Reservado,
            5: Reservado,
            6: Reservado,
            7: Reservado,
    }

    return {
        type: "StatusH",
        value,
        description
    }

}



// ----- MASCARA DE ERRO ----------------------------------



export interface MascaraDeErro extends WordInfo { 
    type: "MascaraDeErro" 
}

//TODO: substituir renomear type Word para 'uint16', 
//      porque pode confundir Word com sendo um tuple de 2 bytes [dadoL, dadoH]
export function mascaraDeErro(data: Word): MascaraDeErro {

    const value: Bit16Value = bit16Value(data)

    const description: Bit16Description = {
        0: "Sinal de start externo",
        1: "Sinal de start diversos",
        2: "Sensor de giro por falta",
        3: "Sensor de giro por excesso",
        4: "Sinal de impressão",
        5: "Erro de comunicação ocorrido na serial 1",
        6: "Implementação futura",
        7: "Implementação futura",
        8: "Cheqsum da eprom2 incorreto",
        9: "O equipamento foi resetado (reiniciado)",
        10: Reservado,
        11: Reservado,
        12: Reservado,
        13: Reservado,
        14: Reservado,
        15: Reservado,
    }

    return {
        type: "MascaraDeErro",
        value,
        description
    }

}


// ----- CONTROLE SERIAL ----------------------------------


export interface ControleSerial extends WordInfo { 
    type: "ControleSerial" 
}

export function controleSerial(data: Word): ControleSerial {

    const value: Bit16Value = bit16Value(data)

    const description: Bit16Description = {
        0: "Start",
        1: "Stop",
        2: "Pausa",
        3: "Modo manual",
        4: "Teste de impressão",
        5: Reservado,
        6: "Salva os parâmetros na EEprom",
        7: Reservado,
        8: Reservado,
        9: Reservado,
        10: Reservado,
        11: Reservado,
        12: Reservado,
        13: Reservado,
        14: Reservado,
        15: Reservado,
    }

    return {
        type: "ControleSerial",
        value,
        description
    }

}



// ----- CODIGO DE ERRO ----------------------------------


export enum ByteDeErroDescricao { 
    START_BYTE_INVALIDO_STX = "Start byte invalido (stx)",
    ESTRUTURA_DO_PACOTE_DE_COMUNICACAO_INVALIDO = "Estrutura do pacote de comunicação invalido",
    NAO_USADO ="Não usado",
    END_BYTE_INVALIDO_ETX = "End byte invalido (etx)",
    TIMER_IN = "Timer in",
    FRAMMING = "Framming",
    OVER_RUN = "Over run",
    BUFFER_RECEPCAO_CHEIO = "Buffer de recepção cheio",
    CHECK_SUM = "CheqSum",
    BUFFER_AUXILIAR_OCUPADO = "Buffer auxiliar ocupado",
    SEQUENCIA_DE_BYTE_ENVIADA_MUITO_GRANDE = "Seqüência de byte enviada muito grande",
    
    // <fim de erros documentaods>
    
    ERRO_NAO_DOCUMENTADO = "Numero do codigo de erro nao documentado"

}

export interface ByteDeErro {
    type: "ByteDeErro"
    codigo: Byte
    descricao: ByteDeErroDescricao
}

export function byteDeErro(codigo: Byte): ByteDeErro { 

    type Err = ByteDeErroDescricao
    const err = ByteDeErroDescricao
    type Erro = [Byte, Err]
    type TabelaDeErros = Array<Erro>

    // ERROS DOCUMENTADOS
    const tab: TabelaDeErros = [
        [1, err.START_BYTE_INVALIDO_STX ],
        [2, err.ESTRUTURA_DO_PACOTE_DE_COMUNICACAO_INVALIDO ],
        [3, err.ESTRUTURA_DO_PACOTE_DE_COMUNICACAO_INVALIDO ],
        [4, err.ESTRUTURA_DO_PACOTE_DE_COMUNICACAO_INVALIDO ],
        [5, err.ESTRUTURA_DO_PACOTE_DE_COMUNICACAO_INVALIDO ],
        [6, err.ESTRUTURA_DO_PACOTE_DE_COMUNICACAO_INVALIDO ],
        [7, err.ESTRUTURA_DO_PACOTE_DE_COMUNICACAO_INVALIDO ],
        [8, err.ESTRUTURA_DO_PACOTE_DE_COMUNICACAO_INVALIDO ],
        [9, err.ESTRUTURA_DO_PACOTE_DE_COMUNICACAO_INVALIDO ],
        [10, err.NAO_USADO ],
        [11, err.END_BYTE_INVALIDO_ETX ],
        [12, err.TIMER_IN ],
        [13, err.NAO_USADO ],
        [14, err.FRAMMING ],
        [15, err.OVER_RUN ],
        [16, err.BUFFER_RECEPCAO_CHEIO ],
        [17, err.CHECK_SUM ],
        [18, err.BUFFER_AUXILIAR_OCUPADO ],
        [19, err.SEQUENCIA_DE_BYTE_ENVIADA_MUITO_GRANDE ],     
    ]

    //todo: tornar esta logica menos imperativa
    const default_: Err = err.ERRO_NAO_DOCUMENTADO // caso nao seja encontrado codigo na tabela
    let d: Err 
    const codigoFiltrado: TabelaDeErros = tab.filter( ([cod, desc]) => cod==codigo) 
    if ( (R.isNil(codigoFiltrado)) || R.isEmpty(codigoFiltrado) )
        d = default_
    else
        d = R.head(codigoFiltrado)[1]
    const descricao: Err = d

    return {
        type: "ByteDeErro",
        codigo,
        descricao,
    }

}





// =====================================
// ==========   PACOTES     ============
// =====================================

 

interface PacotePosijet1 {
    type: "PacoteDeTransmissao"
            | "PacoteDeRetorno_ComErro"
            | "PacoteDeRetorno_DeEnvioSemErro"
            | "PacoteDeRetorno_DeSolicitacaoSemErro"                 

}


// --------------------------------------------------------------


export interface PacoteDeTransmissao extends PacotePosijet1 {
    direcao: Direcao 
    canal: Byte
    comando: Byte
    dado: Word  // MUST be unsigned integer from 0 to 0xFFFF
}

export function pacoteDeTransmissao(direcao: Direcao, canal: Byte, comando:Byte, dado: Word): PacoteDeTransmissao {
    return {
        type: "PacoteDeTransmissao",
        direcao,
        canal,
        comando,
        dado
    }
}


// --------------------------------------------------------------


export interface PacoteDeRetorno_ComErro extends PacotePosijet1 {
    byteDeErro: ByteDeErro
    statusL: StatusL
}

export const pacoteDeRetorno_ComErro = (s: Segment): PacoteDeRetorno_ComErro => {
        
    const _byteDeErro: ByteDeErro = byteDeErro( s.dadoL )
    const _statusL: StatusL = statusL( s.dadoH )
    return {
        type: "PacoteDeRetorno_ComErro", 
        byteDeErro: _byteDeErro, 
        statusL: _statusL,
    }
}
   


// --------------------------------------------------------------


export interface PacoteDeRetorno_DeEnvioSemErro extends PacotePosijet1 {
    statusL: StatusL
    statusH: StatusH
}


export const pacoteDeRetorno_DeEnvioSemErro = (s: Segment): PacoteDeRetorno_DeEnvioSemErro => {
    const _statusL = statusL(s.dadoL)
    const _statusH = statusH(s.dadoH)
    return {
        type: "PacoteDeRetorno_DeEnvioSemErro", 
        statusL: _statusL, 
        statusH: _statusH,
    }
}

// ------------ PacoteDeRetorno_DeSolicitacaoSemErro ------------


export interface PacoteDeRetorno_DeSolicitacaoSemErro extends PacotePosijet1 {
    direcao: Direcao
    canal: Byte
    dado: Word
}

export const pacoteDeRetorno_DeSolicitacaoSemErro = (s: Segment): PacoteDeRetorno_DeSolicitacaoSemErro => {
    const dado = word2int(s.dadoH, s.dadoL)
    return {
        type: "PacoteDeRetorno_DeSolicitacaoSemErro", 
        direcao: s.direcao, 
        canal: s.canal, 
        dado,
    }
}

// --------------------------------------------------------------


//TODO: Improve the type of PacoteDeRetorno to use generics
//      see: https://github.com/Microsoft/TypeScript/pull/21316
//      also: https://github.com/Microsoft/TypeScript/pull/21496
export type PacoteDeRetorno = 
    | PacoteDeRetorno_ComErro
    | PacoteDeRetorno_DeEnvioSemErro
    | PacoteDeRetorno_DeSolicitacaoSemErro
 


// API ====================

type T1 = (canal: Byte, comando: Byte, dado: Word) => PacoteDeTransmissao
type T2 = (canal: Byte, comando: Byte) => PacoteDeTransmissao

const setBitMask: T1 = 
    R.partial(pacoteDeTransmissao,[Direcao.MASCARA_PARA_SETAR_BITS])

const resetBitMask: T1 = 
    R.partial(pacoteDeTransmissao,[Direcao.MASCARA_PARA_RESETAR_BITS])

const setWord:T1 = 
    R.partial(pacoteDeTransmissao,[Direcao.SOLICITACAO])

const getWord:T2 = 
    R.partial(pacoteDeTransmissao,[Direcao.SOLICITACAO])









// ======== low level functions

export function pacoteDeTransmissaoToSegment(p: PacoteDeTransmissao): Segment {
    const [dadoH, dadoL] = int2word(p.dado)
    return {
        direcao: p.direcao,
        canal: p.canal,
        comando: p.comando,
        dadoL,
        dadoH
    }
}

//helper
export const pacoteDeTransmissaoToBytes: (p:PacoteDeTransmissao) => Bytes = 
    R.pipe( 
        pacoteDeTransmissaoToSegment,
        serializeSegment,
        R.partial(createPerfectFrame,[STX]), 
        frame2Bytes
    )  




// predicados
const isNACK = R.partial(R.equals,[[NACK]])
const isPacoteDeRetornoComErro = (frame: Frame):boolean => isNACK(frame.START_BYTE)
const isPacoteDeRetornoDeSolicitacao = (p: PacoteDeTransmissao): boolean => p.direcao == Direcao.SOLICITACAO 
const isPacoteDeRetornoDeEnvio = (p:PacoteDeTransmissao): boolean =>  !isPacoteDeRetornoDeSolicitacao(p)


export function interpretacaoFrameDeRetorno(p: PacoteDeTransmissao, frameRecebido: Frame): PacoteDeRetorno {
    //prepare
    const s: Segment = frame2Segment(frameRecebido)

    //todo: verificar também se retorno é ACK (ou seja se é um pacote de slave)
    const case_1 = isPacoteDeRetornoComErro(frameRecebido)
    const case_2 = isPacoteDeRetornoDeSolicitacao(p)
    const case_3 = isPacoteDeRetornoDeEnvio(p)

    if (case_1)
        return pacoteDeRetorno_ComErro( s ) 
    else if (case_2) 
        return pacoteDeRetorno_DeSolicitacaoSemErro( s ) 
    else if (case_3) {
        return pacoteDeRetorno_DeEnvioSemErro( s )
    }
    else
        throw new TypeError("Interpretador de Frame de Retorno nao pode reconhecer o frame retornado segundo protocolo v1")


}


