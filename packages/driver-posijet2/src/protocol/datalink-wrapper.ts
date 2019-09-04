import { Bytes, Datalinker } from "@nextrobot/serialport-manager";
import { DatalinkResult } from "./datalink-result";

export type DatalinkWrapper = (_: Bytes) => Datalinker<DatalinkResult>