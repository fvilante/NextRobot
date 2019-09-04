import { Byte } from '@nextrobot/serialport-manager'

export type PacoteRetornoPadrao = {
    readonly canal: Byte
    readonly comando: Byte 
    readonly dadoL: Byte
    readonly dadoH: Byte
}

export const PacoteRetornoPadrao = (canal: Byte, comando: Byte, dadoL: Byte, dadoH: Byte):PacoteRetornoPadrao => 
    ({canal, comando, dadoL, dadoH})
