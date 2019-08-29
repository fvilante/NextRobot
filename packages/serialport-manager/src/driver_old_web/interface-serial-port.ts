
type PortHeader = {
    readonly portId: string
}

interface SerialPort {
    readonly header: () => PortHeader
    readonly open: () => boolean
    readonly write: (data: readonly number[]) => void
    readonly read: () => readonly number[]
    readonly close: () => void
}