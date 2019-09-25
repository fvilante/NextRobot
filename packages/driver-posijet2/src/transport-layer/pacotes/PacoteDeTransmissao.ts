import { Byte } from '@nextrobot/serialport-manager'
import { AnyDirecao } from '../other-types/Direcao'
import { Word } from '../other-types/Word';
import { WordToByte } from '../other-types/byteAndWordConversors';

export type PacoteDeTransmissaoPadrao = {
    readonly direcao: AnyDirecao
    readonly comando: Byte 
    readonly dadoH: Byte
    readonly dadoL: Byte
}

//fix: Type Direcao com be static connected with pacote de retorno (ex: PacoteDeReotnor<Direcao, Payload> ... etc) 
export const PacoteDeTransmissaoPadrao = (direcao: AnyDirecao, comando: Byte, word: Word): PacoteDeTransmissaoPadrao => {
    const _ = WordToByte(word)
    const dadoH = _.dadoH
    const dadoL = _.dadoL
    return  ({direcao, comando, dadoH, dadoL})
}
   