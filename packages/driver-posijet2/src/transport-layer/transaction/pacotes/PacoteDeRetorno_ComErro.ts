import { Byte } from "@nextrobot/serialport-manager"
import { ByteDeErro } from "./ByteDeErro"
import { AnyDirecao } from "../../other-types/Direcao"
import { StatusL } from "../../bitmask/StatusL"
import { PacoteDeRetorno_Uncasted } from "./PacoteDeRetorno_Uncasted"

export type PacoteDeRetorno_ComErro = {
    readonly kind: 'PacoteDeRetorno_ComErro'
    readonly payload: {
        readonly canal: Byte
        readonly comando: undefined 
        readonly byteDeErro: ByteDeErro 
        readonly statusL: StatusL
    }
}

export const PacoteDeRetorno_ComErro = <D extends AnyDirecao>(_: PacoteDeRetorno_Uncasted<D>): PacoteDeRetorno_ComErro => 
    ({kind: 'PacoteDeRetorno_ComErro', 
        payload: { 
            canal: _.canal, 
            comando: undefined, 
            byteDeErro: ByteDeErro(_.dadoL), 
            statusL: StatusL(_.dadoH),
        }})

