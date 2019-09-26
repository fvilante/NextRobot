import { Byte } from "@nextrobot/serialport-manager"
import { StatusH } from "../bitmask/StatusH"
import { StatusL } from "../bitmask/StatusL"
import { PacoteDeRetorno_Uncasted } from "./PacoteDeRetorno_Uncasted"
import { AnyDirecao } from "../other-types/Direcao"

export type PacoteDeRetorno_DeEnvioSemErro = {
    readonly kind: 'PacoteDeRetornoDeEnvioSemErro'
    readonly payload: {
        readonly canal: Byte
        readonly comando: Byte 
        readonly statusH: StatusH
        readonly statusL: StatusL
    }
}
export const PacoteDeRetorno_DeEnvioSemErro = <D extends AnyDirecao>(_: PacoteDeRetorno_Uncasted<D>): PacoteDeRetorno_DeEnvioSemErro => 
    ({kind: 'PacoteDeRetornoDeEnvioSemErro', 
        payload: { 
            canal: _.canal, 
            comando: _.comando, 
            statusH: StatusH(_.dadoH), 
            statusL: StatusL(_.dadoL),
        }})