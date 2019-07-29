import { AnyParamType } from "./application-types";
import { Device } from "./device-core";
import { AnyDriver, GetParameterType, GetParameters } from "./driver-core";

// waved is a data that is agnostic to any device, programming language, operational system, etc.
// normaly a binary data 
export type Wave = { readonly waved: number}


export type ToWave<Drive extends AnyDriver, ParameterType> = 
    (value: ParameterType, device: Device<Drive>) => Wave

export type FromWave<Drive extends AnyDriver, ParameterType> = 
    (value: Wave, device: Device<Drive>) => ParameterType

export type Waver<Drive extends AnyDriver, ParameterType> = {
    readonly toWave:  ToWave<Drive, ParameterType>
    readonly fromWave: FromWave<Drive, ParameterType>
}

// Use this constructor to create a waved data
type WaveConstructor = (_: number) => Wave
export const wave: WaveConstructor = waved => ({waved})