import { Byte } from "@nextrobot/serialport-manager"
import { PacoteDeRetorno_Uncasted } from "./PacoteDeRetorno_Uncasted"
import { AnyDirecao } from "./base-model/Direcao"

export type PacoteDeRetorno_DeSolicitacaoSemErro = {
    readonly kind: 'PacoteDeRetorno_DeSolicitacaoSemErro'
    readonly payload: {
        readonly canal: Byte
        readonly comando: Byte 
        readonly dadoH: Byte 
        readonly dadoL: Byte
    }  
}
export const PacoteDeRetorno_DeSolicitacaoSemErro = <D extends AnyDirecao>(_: PacoteDeRetorno_Uncasted<D>): PacoteDeRetorno_DeSolicitacaoSemErro => 
    ({kind: 'PacoteDeRetorno_DeSolicitacaoSemErro', 
        payload: { 
            canal: _.canal, 
            comando: _.comando, 
            dadoH: _.dadoH, 
            dadoL: _.dadoL,
        }})


