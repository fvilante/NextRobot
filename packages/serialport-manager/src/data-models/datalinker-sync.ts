import { Byte, Bytes } from './bytes'

// === Result ===


/** When you are processing the result */
export type ResultProcessing = {
    readonly kind: 'Processing'
}
export const ResultProcessing = ():ResultProcessing => ({kind: 'Processing'})


/** When you finish processing the result */
export type ResultSucessful<T> = {
    readonly kind: 'Sucessful'
    readonly data: T
}
export const ResultSucessful = <T>(data:T):ResultSucessful<T> => ({kind: 'Sucessful', data})


/** When you finish processing the result and conclude there is an error */
export type ResultError = {
    readonly kind: 'Error'
    readonly data: Error
}
export const ResultError = (data: Error): ResultError => ({kind: 'Error', data})


/** The result of handling the receptioned data */
export type ReceptionHandlerResult<T> = 
    | ResultProcessing
    | ResultSucessful<T>
    | ResultError


// === Datalink - Synchronous transaction ===


/** Datalink - Syncrhonous transacion */
export type Datalinker<T> = {
    readonly toWrite: () => Bytes
    readonly receptionHandler: (_: Byte) => ReceptionHandlerResult<T>
}