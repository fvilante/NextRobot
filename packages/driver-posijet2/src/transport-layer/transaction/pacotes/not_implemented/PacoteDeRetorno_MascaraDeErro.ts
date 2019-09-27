import { Byte } from "@nextrobot/serialport-manager";
import { MascaraDeErro } from "../../../bitmask/MascaraDeErro";
import { PacoteDeRetorno_Uncasted } from "../PacoteDeRetorno_Uncasted";
import { ByteToWord } from "../../../other-types/byteAndWordConversors";
import { AnyDirecao } from "../../../other-types/Direcao";


export type PacoteDeRetorno_MascaraDeErro = {
    readonly kind: 'PacoteDeRetorno_MascaraDeErro'
    readonly payload: {
        readonly canal: Byte
        readonly comando: undefined 
        readonly mascaraDeErro: MascaraDeErro
    }
}

export const PacoteDeRetorno_MascaraDeErro = <D extends AnyDirecao>(_: PacoteDeRetorno_Uncasted<D>): PacoteDeRetorno_MascaraDeErro => 
    ({kind: 'PacoteDeRetorno_MascaraDeErro', 
        payload: { 
            canal: _.canal, 
            comando: undefined, 
            mascaraDeErro: MascaraDeErro( ByteToWord(_.dadoL, _.dadoH)), 
        }})