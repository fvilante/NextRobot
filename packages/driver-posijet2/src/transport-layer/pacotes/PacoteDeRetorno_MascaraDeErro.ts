import { Byte } from "@nextrobot/serialport-manager";
import { MascaraDeErro } from "../bitmask/MascaraDeErro";
import { PacoteRetornoPadrao } from "./PacoteRetornoPadrao";
import { ByteToWord } from "../other-types/byteAndWordConversors";


export type PacoteDeRetorno_MascaraDeErro = {
    readonly kind: 'PacoteDeRetorno_MascaraDeErro'
    readonly payload: {
        readonly canal: Byte
        readonly comando: undefined 
        readonly mascaraDeErro: MascaraDeErro
    }
}

export const PacoteDeRetorno_MascaraDeErro = (_: PacoteRetornoPadrao): PacoteDeRetorno_MascaraDeErro => 
    ({kind: 'PacoteDeRetorno_MascaraDeErro', 
        payload: { 
            canal: _.canal, 
            comando: undefined, 
            mascaraDeErro: MascaraDeErro( ByteToWord(_.dadoL, _.dadoH)), 
        }})