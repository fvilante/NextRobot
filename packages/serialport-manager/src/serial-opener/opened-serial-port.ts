import { Bytes } from '../core/bytes'


// === Represents an already oppened serial port ===


/** Represents a generic serial port stream already oppened*/
export type OpendedSerialPort = {
    readonly write: (_: Bytes) => unknown
    readonly close: () => void
    readonly onClose: (callback: () => void) => void
    readonly onData: (callback: (_: Bytes) => void) => void
    readonly onError: (callback: (error?: Error) => void) => void
}

