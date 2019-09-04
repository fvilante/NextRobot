import { Byte } from '@nextrobot/serialport-manager'
import { StatusH } from '../bitmask/StatusH';
import { StatusL } from '../bitmask/StatusL';
import { PacoteRetornoPadrao } from './PacoteRetornoPadrao'
import { ByteDeErro } from './ByteDeErro';
import { MascaraDeErro } from '../bitmask/MascaraDeErro';
import { ByteToWord } from '../other-types/byteAndWordConversors';

export type PacoteDeRetorno_DeEnvioSemErro = {
    readonly kind: 'PacoteDeRetornoDeEnvioSemErro'
    readonly payload: {
        readonly canal: Byte
        readonly comando: Byte 
        readonly statusH: StatusH
        readonly statusL: StatusL
    }
}
export const PacoteDeRetorno_DeEnvioSemErro = (_: PacoteRetornoPadrao): PacoteDeRetorno_DeEnvioSemErro => 
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
export const PacoteDeRetorno_DeSolicitacaoSemErro = (_: PacoteRetornoPadrao): PacoteDeRetorno_DeSolicitacaoSemErro => 
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

export const PacoteDeRetorno_ComErro = (_: PacoteRetornoPadrao): PacoteDeRetorno_ComErro => 
    ({kind: 'PacoteDeRetorno_ComErro', 
        payload: { 
            canal: _.canal, 
            comando: undefined, 
            byteDeErro: ByteDeErro(_.dadoL), 
            statusL: StatusL(_.dadoH),
        }})




export type PacoteDeRetorno = 
    | PacoteDeRetorno_DeSolicitacaoSemErro
    | PacoteDeRetorno_DeEnvioSemErro
    | PacoteDeRetorno_ComErro
