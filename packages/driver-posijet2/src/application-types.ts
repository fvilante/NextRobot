//todo: extract PhysicalQuantity from kinematics-package to a self contained package 
import { PhysicalQuantity } from '@nextrobot/kinematics'

// =========================================================
//          Data Types
// =========================================================


// resume
export type AnyParamType = 
    | Space 
    | Time 
    | Speed 
    | Acceleration 
    | Options<LigadoDesligado>
    | Options<ModoDetrabalhoDoEixo>


// Space

export interface Milimeter {
    readonly kind: 'Milimeter'
    readonly value: number
}

export const Milimeter = (value: number): Milimeter => ({kind: 'Milimeter', value })

export interface Pulse {
    readonly kind: 'Pulse'
    readonly value: number
}

export const Pulse = (value: number): Pulse => ({kind: 'Pulse', value})


export type Space = Milimeter | Pulse



// Time


export interface Second {
    readonly kind: 'Second'
    readonly value: number
}

export const Second = (value: number): Second => ({kind: 'Second', value})

export interface MicroControlerTick {
    readonly kind: 'MicroControlerTick'
    readonly value: number
}

export const MicroControlerTick = (value: number): MicroControlerTick => ({kind:'MicroControlerTick', value})

export type Time = Second | MicroControlerTick



// Derived Dimensions



// Speed

export interface Speed {
    readonly kind: 'Speed'
    readonly value: {readonly space: Space, readonly time: Time}
}

const Speed__ = (space: Space, time: Time): Speed => ({kind: 'Speed', value: {space, time} })
export const MilimeterPerSecond = (_: number): Speed => Speed__(Milimeter(_), Second(1))
export const PulsesPerMicroControlerTick = (_: number): Speed => Speed__(Pulse(_), MicroControlerTick(1))




// Acceleration

export interface Acceleration {
    readonly kind: 'Acceleration'
    readonly value: {readonly speed: Speed, readonly time: Time}
}

const Acceleration__ = (speed: Speed, time: Time): Acceleration => ({ kind: 'Acceleration', value:  {speed, time} })
export const MilimeterPerSquareSecond = (_: number): Acceleration => Acceleration__(MilimeterPerSecond(_), Second(1))
export const PulsesPerSqueredMicroControlerTick = (_: number): Acceleration => Acceleration__(PulsesPerMicroControlerTick(_), MicroControlerTick(1))



// Discrete Options types


export interface OptionList<T extends object> {
    readonly kind: 'OptionList'
    readonly value: keyof T
    readonly types: T
}


export interface LigadoDesligado {
    readonly kind: 'LigadoDesligado'
    readonly Ligado: 0
    readonly Desligado: 1
}

export interface ModoDetrabalhoDoEixo {
    readonly kind: 'ModoDetrabalhoDoEixo'
    readonly Continuo: 0
    readonly Passo_a_Passo: 1
}

//helper - obtains strings of the option type
export type Options<T extends object> = Exclude<keyof OptionList<T>['types'], 'kind'>



