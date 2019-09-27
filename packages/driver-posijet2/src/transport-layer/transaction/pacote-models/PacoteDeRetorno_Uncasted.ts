import { Byte } from '@nextrobot/serialport-manager'
import { AnyDirecao } from './base-model/Direcao'

export type PacoteDeRetorno_Uncasted<D extends AnyDirecao> = {
    readonly kind: 'PacoteDeRetorno_Uncasted'
    readonly direcaoDoPacoteDeTransmissao: D
    readonly canal: Byte
    readonly comando: Byte 
    readonly dadoL: Byte
    readonly dadoH: Byte
    readonly pacoteDeErro: boolean 
}

export const PacoteDeRetorno_Uncasted = <D extends AnyDirecao>(direcaoDoPacoteDeTransmissao: D, pacoteDeErro: boolean, canal: Byte, comando: Byte, dadoL: Byte, dadoH: Byte):PacoteDeRetorno_Uncasted<D> => 
    ({kind: 'PacoteDeRetorno_Uncasted', direcaoDoPacoteDeTransmissao, canal, comando, dadoL, dadoH, pacoteDeErro})
