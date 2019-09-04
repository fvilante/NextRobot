import { Byte, Datalinker, PortReference, syncTransactioner } from '@nextrobot/serialport-manager'
import { mapObjectIndexed } from '@nextrobot/core-utils';
import { Channel } from '../core-models/channel'

import { SerialPortOpener } from '@nextrobot/serialport-manager'
import { datalinkerWrapper, NACK } from '../datalink/posijet1-datalink';
import { DatalinkResult } from '../datalink/datalink-result';


// ----------

// helpers -- todo: Move to core-utils package
type Keys<T> = keyof T
type Values<T> = T[keyof T]

/** helpers -- todo: Move to core-utils package 
 * 
 * note: eventualy in an uncasted run-time scenario where value is not present in object, the function returns undefined
 * */  
const getKeyByValue = <T>(object:T , value: T[keyof T]): keyof T | undefined => {
    return Object.keys(object).find(key => object[key as keyof T] === value) as keyof T | undefined
  }


/** Helper to represent bitwise data from a core type where key represents the bit position and value represents a label describing that bit*/

type AnyCore = {readonly [bit: number]: string}
type Value<T extends AnyCore > = {
    [Bit in keyof T]: {readonly label: T[Bit], readonly value: boolean}
}
const Value = <T extends AnyCore>(core: T, value: number): Value<T> => {
    const getBit = (bitPosition: number, value: number):boolean => 
        (value & (1 << bitPosition)) === 0 ? false : true     
    const t = mapObjectIndexed(core, (label, bit) => ({
        label,
        value: getBit(bit as number, value),
    }) )
    return t as Value<T> //todo: is it possible to remove this type coersion ? Maybe this result in a improvement in mapObjectIndexed
}


// ---------------------

const Reservado = "Reservado para aplicacoes especiais"

// ---------------------

const ByteToWord = (dadoH: Byte, dadoL: Byte): number => {
    return dadoH*256 + dadoL
}

const WordToByte = (word: number): {readonly dadoH: Byte, readonly dadoL: Byte} => {
    return {
        dadoH: Math.floor(word / 256),
        dadoL: word % 256,
    }
}

// ---------------------

const __StatusL = {
    0: "Referenciado",
    1: "Ultima posição a ser executada foi alcançada.",
    2: "Referenciando",
    3: "Direção do movimento é positiva",
    4: "Movimento acelerado",
    5: "Movimento desaceleração",
    6: Reservado,
    7: "Evento de erro, e deve ser consultado na mascara de erro. CMD=69 =45h",
} as const

export type StatusL = Value<typeof __StatusL>

export const StatusL = (_: Byte): StatusL => {
    return Value(__StatusL, _)
}




// ---------------------

const __StatusH = {
    0: Reservado,
    1: Reservado,
    2: Reservado,
    3: Reservado,
    4: Reservado,
    5: Reservado,
    6: Reservado,
    7: Reservado,
} as const

export type StatusH = Value<typeof __StatusH>

export const StatusH = (_: Byte): StatusH => {
    return Value(__StatusH, _)
}



// ---------------------

const COMANDO_MASCARA_DE_ERRO = 0x45
const __mascaraDeErro = {
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
} as const

export type MascaraDeErro = Value<typeof __mascaraDeErro>

export const MascaraDeErro = (dadoL: Byte, dadoH: Byte): MascaraDeErro => {
    return Value(__mascaraDeErro, ByteToWord(dadoH, dadoL))
}

// ---------------------


export const __byteDeErro = { 
    1: "Start byte invalido (stx)",
    2: "Estrutura do pacote de comunicação invalido",
    3: "Estrutura do pacote de comunicação invalido",
    4: "Estrutura do pacote de comunicação invalido",
    5: "Estrutura do pacote de comunicação invalido",
    6: "Estrutura do pacote de comunicação invalido",
    7: "Estrutura do pacote de comunicação invalido",
    8: "Estrutura do pacote de comunicação invalido",
    9: "Estrutura do pacote de comunicação invalido",
    10: "Não usado",
    11: "End byte invalido (etx)",
    12: "Timer in",
    13: "Não usado",
    14: "Framming",
    15: "Over run",
    16: "Buffer de recepção cheio",
    17: "CheqSum",
    18: "Buffer auxiliar ocupado",
    19: "Seqüência de byte enviada muito grande",
} as const
type ByteDeErroDescricao = typeof __byteDeErro[keyof typeof __byteDeErro]
type ByteDeErroCodigo = keyof typeof __byteDeErro

export type ByteDeErro = {
    readonly codigo: ByteDeErroCodigo
    readonly descricao: ByteDeErroDescricao
}

export const ByteDeErro = (codigo: Byte): ByteDeErro => {
    const _ = codigo as ByteDeErroCodigo
    return ({
        codigo: _,
        descricao: __byteDeErro[_]
    })
}

// -----------------------------------
/** helper */
type PacoteRetornoPadrao = {
    readonly canal: Byte
    readonly comando: Byte 
    readonly dadoL: Byte
    readonly dadoH: Byte
}

const PacoteRetornoPadrao = (canal: Byte, comando: Byte, dadoL: Byte, dadoH: Byte):PacoteRetornoPadrao => 
    ({canal, comando, dadoL, dadoH})

// ------------------------------------

export type PacoteDeRetorno_DeEnvioSemErro = {
    readonly kind: 'PacoteDeRetornoDeEnvioSemErro'
    readonly payload: {
        readonly canal: Byte
        readonly comando: Byte 
        readonly statusH: StatusH
        readonly statusL: StatusL
    }
}
const PacoteDeRetorno_DeEnvioSemErro = (_: PacoteRetornoPadrao): PacoteDeRetorno_DeEnvioSemErro => 
    ({kind: 'PacoteDeRetornoDeEnvioSemErro', 
        payload: { 
            canal: _.canal, 
            comando: _.comando, 
            statusH: StatusH(_.dadoH), 
            statusL: StatusL(_.dadoL),
        }})

export type PacoteDeRetorno_DeSolicitacaoSemErro = {
    readonly kind: 'PacoteDeRetorno_DeSolicitacaoSemErro'
    readonly payload: {
        readonly canal: Byte
        readonly comando: Byte 
        readonly dadoH: Byte 
        readonly dadoL: Byte
    }  
}
const PacoteDeRetorno_DeSolicitacaoSemErro = (_: PacoteRetornoPadrao): PacoteDeRetorno_DeSolicitacaoSemErro => 
    ({kind: 'PacoteDeRetorno_DeSolicitacaoSemErro', 
        payload: { 
            canal: _.canal, 
            comando: _.comando, 
            dadoH: _.dadoH, 
            dadoL: _.dadoL,
        }})



export type PacoteDeRetorno_ComErro = {
    readonly kind: 'PacoteDeRetorno_ComErro'
    readonly payload: {
        readonly canal: Byte
        readonly comando: undefined 
        readonly byteDeErro: ByteDeErro 
        readonly statusL: StatusL
    }
}

const PacoteDeRetorno_ComErro = (_: PacoteRetornoPadrao): PacoteDeRetorno_ComErro => 
    ({kind: 'PacoteDeRetorno_ComErro', 
        payload: { 
            canal: _.canal, 
            comando: undefined, 
            byteDeErro: ByteDeErro(_.dadoL), 
            statusL: StatusL(_.dadoH),
        }})


export type PacoteDeRetorno_MascaraDeErro = {
    readonly kind: 'PacoteDeRetorno_MascaraDeErro'
    readonly payload: {
        readonly canal: Byte
        readonly comando: undefined 
        readonly mascaraDeErro: MascaraDeErro 
    }
}

const PacoteDeRetorno_MascaraDeErro = (_: PacoteRetornoPadrao): PacoteDeRetorno_MascaraDeErro => 
    ({kind: 'PacoteDeRetorno_MascaraDeErro', 
        payload: { 
            canal: _.canal, 
            comando: undefined, 
            mascaraDeErro: MascaraDeErro(_.dadoL, _.dadoH), 
        }})

export type PacoteDeRetorno = 
    | PacoteDeRetorno_DeSolicitacaoSemErro
    | PacoteDeRetorno_DeEnvioSemErro
    | PacoteDeRetorno_ComErro
    | PacoteDeRetorno_MascaraDeErro





const casteiaPacoteRetorno = (response: DatalinkResult, transmitedDirection: Direcao): PacoteDeRetorno => {

    //todo: should this function be really that coupled here? Could it be extracted and decoupled ?
    const morphism = (_: DatalinkResult): PacoteRetornoPadrao => {
        const comando = _.payload[1]
        const dadoL = _.payload[2]
        const dadoH = _.payload[3]
        const direcaoCanal = _.payload[0]
        const canal = direcaoCanal & 0b00111111
        const r = PacoteRetornoPadrao(canal, comando, dadoL, dadoH)
        return r
    }

    const pacotePadrao = morphism(response)
    const startByte = response.startByte
    const hasErro = startByte === NACK ? true : false
    const comando = response.payload[1]

    //todo: this if-sequence would be refactored to be less hairly
    // tslint:disable: no-if-statement
    if(hasErro) {
        return PacoteDeRetorno_ComErro(pacotePadrao)
    } else {
        if (comando === COMANDO_MASCARA_DE_ERRO) {
            return PacoteDeRetorno_MascaraDeErro(pacotePadrao)
        } else if (transmitedDirection === 'Envio') {
            return PacoteDeRetorno_DeSolicitacaoSemErro(pacotePadrao)
        } else {
            return PacoteDeRetorno_DeEnvioSemErro(pacotePadrao)
        }
    }
    // tslint:enable: no-if-statement

} 


// ---------------------

const __direcao = {
    'Solicitacao': 0,
    'Envio': 64,
    'MascaraSetarBits': 128,
    'MascaraResetarBits': 192,
} as const
type __direcao = typeof __direcao
type Direcao = keyof __direcao
const DirecaoToNumber = (_: Direcao): number => __direcao[_]

    


export type PacoteDeTransmissaoPadrao = {
    readonly direcao: Direcao
    readonly comando: Byte 
    readonly dadoH: Byte
    readonly dadoL: Byte
}

const PacoteDeTransmissaoPadrao = (direcao: Direcao, comando: Byte, dadoH: Byte, dadoL: Byte): PacoteDeTransmissaoPadrao => 
    ({direcao, comando, dadoH, dadoL})


type CmppAddress = {
    readonly portReference: PortReference
    readonly canal: number
}
const CmppAddress = (portReference: PortReference, canal: number):CmppAddress => ({portReference, canal})


const transmit = async (portOpener: SerialPortOpener, addr: CmppAddress, pacote: PacoteDeTransmissaoPadrao ): Promise<PacoteDeRetorno> => {
    const pacoteEmBytes = [
        DirecaoToNumber(pacote.direcao)+addr.canal, 
        pacote.comando,
        pacote.dadoH,
        pacote.dadoL
    ]
    const response = (await syncTransactioner(portOpener, addr.portReference, datalinkerWrapper(pacoteEmBytes) ))

    const pacoteRetorno = casteiaPacoteRetorno(response, pacote.direcao)
    
    return new Promise( (resolve) => { resolve(pacoteRetorno) })

}


// infomal test

import { serialPortOpenner_PC } from '@nextrobot/serialport-manager'

const Test = async () => {
    const a = StatusL(15)
    console.table(a)
    const b = StatusH(16)
    console.table(b)
    const c = MascaraDeErro(31,2)
    console.table(c)

    const portReference = PortReference('COM3', {
        baudRate: 2400,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        rtscts: false,
        xon: false,
        xoff: false,
    })

    const pacoteRetornado = await transmit(serialPortOpenner_PC, CmppAddress(portReference, 2), 
        PacoteDeTransmissaoPadrao('Solicitacao',COMANDO_MASCARA_DE_ERRO,0,0))

    console.log(`Resultado...`)
    console.log(pacoteRetornado)
    // tslint:disable-next-line: no-if-statement
    if (pacoteRetornado.kind === 'PacoteDeRetornoDeEnvioSemErro') {
        console.table(pacoteRetornado.payload.statusL)
    // tslint:disable-next-line: no-if-statement
    } else if ( pacoteRetornado.kind === 'PacoteDeRetorno_ComErro') {
        console.table(pacoteRetornado.payload.statusL)
    }
   
}

// tslint:disable-next-line: no-expression-statement
Test()