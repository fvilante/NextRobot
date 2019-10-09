import { Reader } from "@nextrobot/core-utils"
import { SerialPortOpener } from "@nextrobot/serialport-manager"
import { CmppAddress } from "./CmppAddress"

/** Enviroment */

export type Env = {
    readonly portOpener: SerialPortOpener
    readonly cmppAddress: CmppAddress
}

export const getEnv = ():Reader<Env,Env> => Reader( (x:Env) => x)

