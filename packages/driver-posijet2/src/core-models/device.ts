import { AnyUserProgram, Memmap } from "../memmap/core";
import { CmppAddress } from "../transport-layer/transaction/CmppAddress";
import { SerialPortOpener } from "@nextrobot/serialport-manager";
import { PhysicalArm } from "../z-recycle/memmap_OLD/core-models/physical-arm";



type Device<U extends AnyUserProgram> = {
    readonly cmppAddress: CmppAddress
    readonly memmap: Memmap<U> 
    readonly physicalArm: PhysicalArm
    readonly portOpenner: SerialPortOpener
}

type AnyDevice = Device<AnyUserProgram>