import { Byte } from '@nextrobot/serialport-manager'
import { Word } from './type-word'

export const ByteToWord = (dadoL: Byte, dadoH: Byte): Word => {
    return dadoH*256 + dadoL
}

export const WordToByte = (word: Word): {readonly dadoH: Byte, readonly dadoL: Byte} => {
    return {
        dadoH: Math.floor(word / 256),
        dadoL: word % 256,
    }
}