import { AnyParamType } from "./application-types";
import { LinearDevice } from "./device-core";
import { AnyDrive, GetParameterType, GetParameters } from "./driver-core";

// waved is a data that is agnostic to any device, programming language, operational system, etc.
// normaly a binary data 
type Wave = { readonly waved: unknown}


export type Waver<Drive extends AnyDrive, Parameter extends GetParameters<Drive>> = {
    readonly toWave:  (value: GetParameterType<Drive, Parameter>, device: LinearDevice<Drive>) => Wave
    readonly fromWave: (value: Wave, device: LinearDevice<Drive>) => GetParameterType<Drive, Parameter>
}