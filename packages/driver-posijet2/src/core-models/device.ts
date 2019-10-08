import { AnyUserProgram, Memmap } from "../memmap/core";
import { CmppAddress } from "../transport-layer/transaction/CmppAddress";
import { SerialPortOpener } from "@nextrobot/serialport-manager";
import { PhysicalArm } from "./physical-arm";


export type Device<U extends AnyUserProgram> = {
    readonly cmppAddress: CmppAddress
    readonly memmap: Memmap<U> 
    readonly physicalArm: PhysicalArm
    //readonly portOpenner: SerialPortOpener //Note: i'm in doubt whether to put portOpenner here. As it is a side-effect I'm opt now to not put, so any user of Device<T> type stays a 'pure function'
}

export type AnyDevice = Device<AnyUserProgram>

export const Device = <Device extends AnyDevice>(device: Device):Device => device