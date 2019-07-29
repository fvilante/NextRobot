import { AnyParamType } from "./application-types";
import { Device } from "./device-core";
import { AnyDriver, GetParameterType, GetParameters } from "./driver-core";

// waved is a data that is agnostic to any device, programming language, operational system, etc.
// normaly a binary data 
export type Wave = { readonly waved: unknown}


export type Waver<Drive extends AnyDriver, ParameterType> = {
    readonly toWave:  (value: ParameterType, device: Device<Drive>) => Wave
    readonly fromWave: (value: Wave, device: Device<Drive>) => ParameterType
}