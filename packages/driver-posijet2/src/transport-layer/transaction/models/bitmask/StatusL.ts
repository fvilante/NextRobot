import { Bitmask, BitmaskCreator } from './bitmask-core'
import { Reservado } from './consts'
import { Byte } from '@nextrobot/serialport-manager'

const __StatusL = {
    0: "Referenciado",
    1: "Ultima posição a ser executada foi alcançada.",
    2: "Referenciando",
    3: "Direção do movimento é positiva",
    4: "Movimento acelerado",
    5: "Movimento desaceleração",
    6: Reservado,
    7: "Evento de erro, e deve ser consultado na mascara de erro. CMD=69 =45h",
} as const

type __StatusL = typeof __StatusL

export type StatusL = Bitmask<__StatusL>

export const StatusL: BitmaskCreator<__StatusL> = (byte:Byte):StatusL => {
    return Bitmask(__StatusL, byte)
}
