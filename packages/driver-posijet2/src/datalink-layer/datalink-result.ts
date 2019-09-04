import { Bytes, Byte } from '@nextrobot/serialport-manager'

// === Reception ===

export type DatalinkResult = {
    readonly payload: Bytes
    readonly startByte: Byte
    readonly rawFrame: Bytes
    readonly checksum: number
}
