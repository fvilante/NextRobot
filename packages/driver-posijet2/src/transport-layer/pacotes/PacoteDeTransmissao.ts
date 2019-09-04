import { Byte } from '@nextrobot/serialport-manager'
import { Direcao } from '../Direcao'

export type PacoteDeTransmissaoPadrao = {
    readonly direcao: Direcao
    readonly comando: Byte 
    readonly dadoH: Byte
    readonly dadoL: Byte
}

export const PacoteDeTransmissaoPadrao = (direcao: Direcao, comando: Byte, dadoL: Byte, dadoH: Byte): PacoteDeTransmissaoPadrao => 
    ({direcao, comando, dadoH, dadoL})