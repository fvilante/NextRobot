import { Byte } from '@nextrobot/serialport-manager'
import { AnyDirecao } from './base-model/Direcao'
import { Word } from './base-model/Word';
import { WordToByte } from './base-model/byteAndWordConversors';

export type PacoteDeTransmissao<D extends AnyDirecao> = {
    readonly kind: 'PacoteDeTransmissao'
    readonly direcao: AnyDirecao
    readonly comando: Byte 
    readonly dadoH: Byte
    readonly dadoL: Byte
}

//fix: Type Direcao com be static connected with pacote de retorno (ex: PacoteDeReotnor<Direcao, Payload> ... etc) 
export const PacoteDeTransmissao = <D extends AnyDirecao>(direcao: D, comando: Byte, word: Word): PacoteDeTransmissao<D> => {
    const _ = WordToByte(word)
    const dadoH = _.dadoH
    const dadoL = _.dadoL
    return  ({kind: 'PacoteDeTransmissao', direcao, comando, dadoH, dadoL})
}
   