import { Reader } from "@nextrobot/core-utils"
import { SerialPortOpener } from "@nextrobot/serialport-manager"

/** Enviroment */

export type Env = {
    readonly portOpener: SerialPortOpener
}

export const getEnv = ():Reader<Env,Env> => Reader( (x:Env) => x)

