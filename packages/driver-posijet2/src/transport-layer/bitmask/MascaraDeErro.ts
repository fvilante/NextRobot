import { Bitmask, BitmaskCreator } from './bitmask-core'
import { Reservado } from './consts'
import { Word } from '../type-word'


const __mascaraDeErro = {
    0: "Sinal de start externo",
    1: "Sinal de start diversos",
    2: "Sensor de giro por falta",
    3: "Sensor de giro por excesso",
    4: "Sinal de impressão",
    5: "Erro de comunicação ocorrido na serial 1",
    6: "Implementação futura",
    7: "Implementação futura",
    8: "Cheqsum da eprom2 incorreto",
    9: "O equipamento foi resetado (reiniciado)",
    10: Reservado,
    11: Reservado,
    12: Reservado,
    13: Reservado,
    14: Reservado,
    15: Reservado,
} as const

type __mascaraDeErro = typeof __mascaraDeErro

export type MascaraDeErro = Bitmask<__mascaraDeErro>

export const MascaraDeErro: BitmaskCreator<__mascaraDeErro> = (word: Word): MascaraDeErro => {
    return Bitmask(__mascaraDeErro, word)
}