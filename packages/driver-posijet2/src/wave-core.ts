import { AnyParamType } from "./application-types";
import { Device } from "./device-core";
import { AnyDrive, GetParameterType, GetParameters } from "./driver-core";

// waved is a data that is agnostic to any device, programming language, operational system, etc.
// normaly a binary data 
export type Wave = { readonly waved: unknown}


export type Waver<Drive extends AnyDrive, Parameter extends GetParameters<Drive>> = {
    readonly toWave:  (value: GetParameterType<Drive, Parameter>, device: Device<Drive>) => Wave
    readonly fromWave: (value: Wave, device: Device<Drive>) => GetParameterType<Drive, Parameter>
}