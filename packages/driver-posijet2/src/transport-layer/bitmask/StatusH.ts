import { Bitmask, BitmaskCreator } from './bitmask-core'
import { Reservado } from './consts'
import { Byte } from '@nextrobot/serialport-manager'

const __StatusH = {
    0: Reservado,
    1: Reservado,
    2: Reservado,
    3: Reservado,
    4: Reservado,
    5: Reservado,
    6: Reservado,
    7: Reservado,
} as const

type __StatusH = typeof __StatusH

export type StatusH = Bitmask<__StatusH>

export const StatusH: BitmaskCreator<__StatusH> = (_: Byte): StatusH => {
    return Bitmask(__StatusH, _)
}
