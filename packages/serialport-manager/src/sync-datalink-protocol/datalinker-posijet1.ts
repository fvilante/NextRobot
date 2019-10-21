// tslint:disable: no-let no-expression-statement no-if-statement

import { Datalinker, ResultError, ReceptionHandlerResult, ResultProcessing, ResultSucessful } from '../data-models/datalinker-sync'
import { Byte, Bytes } from '../data-models/bytes'
import { flattenDeep } from '@nextrobot/core-utils'


// === Constantes === 

const ESC = 27
const ESCDUP = 27
const STX = 2
const ETX = 3
const ACK = 6
const NACK = 21


// Checksum

const calcChecksum = (_undupedData: Bytes, _start_byte: Byte): number => {
    const undupedData = _undupedData.bytes
    const start_byte = _start_byte.byte
    const sum = [...undupedData, ...[start_byte, ETX]].reduce((acc,cur) => acc+cur)
    const sumNormalized = sum % 256
    const twosComplimented = 256 - sumNormalized
    return twosComplimented
}

// === Transmission ===

const makeFrame = (_data: Bytes) => ():Bytes => {    
    const data = _data.bytes
    const dup_esc = (data: Bytes['bytes']): Bytes['bytes'] => flattenDeep(data.map( byte => byte===ESC ? [ESC, ESCDUP] : [byte] ))
    return Bytes([ESC, STX, ...dup_esc(data), ESC, ETX, calcChecksum(Bytes(data), Byte(STX))])
}


// === Reception ===

type FinalResult = {
    readonly data: Bytes
}

const getReceptionHandler = (): Datalinker<FinalResult>['receptionHandler'] => {

    let rawFrame: Bytes = Bytes([])
    let unDupedData: Bytes = Bytes([])
    let startByte: Byte
    let checksum: number

    type State = 
        | 'NOT_INITIATED' //waiting for initial esc
        | 'INITIAL_ESC' // initial esc received, waiting for start byte
        | 'START_BYTE' // start byte received, waiting for data
        //| 'DATA'
        | 'DESAMBIGUATE' // desambiguate ESC over Data -< while reading data an ESC was received (desambiguate if it is an FINAL_ESC or an ESCDUP)
        //| 'FINAL_ESC'   // data received, waiting for final esc
        //| 'END_BYTE'    // final esc received, waiting for checksum
        | 'CHECKSUM'    // checksum received, waiting to verify checksum
        | 'SUCESSFUL'    // checksum verified, success!
        | 'ERROR'       // an error occured, cannot continue processing

    
        

    let state: State = 'NOT_INITIATED'
    const setState = (_: State): void => { state = _ }

    /** make error helper  */
    const error = (msg:string):ResultError => {
        setState('ERROR')
        return ResultError(new Error(`Serial data interpretaion error:${msg}`))
    }

    const isChecksumOk = ():boolean => {
        const ideal = calcChecksum(unDupedData, startByte)
        const real = checksum
        return ideal === real
    }

    const makeSucessResult = (): ResultSucessful<FinalResult> => {
        const result: FinalResult = {
            data: unDupedData
        }
        return ResultSucessful(result)
    }


    const receptionHandler = (_: Byte): ReceptionHandlerResult<FinalResult> => {

        //save raw_frame
        rawFrame = Bytes([...rawFrame.bytes, _.byte])

        // run machine state
        switch (state) {
            case 'NOT_INITIATED':
                if (_.byte===ESC) {
                    setState('INITIAL_ESC')
                    return ResultProcessing()
                } else {
                    return error('Initial Esc failed')
                } 
               
            case 'INITIAL_ESC':
                if (_.byte===STX || _.byte===ACK || _.byte===NACK) {
                    startByte = _
                    setState('START_BYTE')
                    return ResultProcessing()
                } else {
                    return error('Start byte failed')
                }

            case 'START_BYTE':
                if (_.byte===ESC) {
                    setState('DESAMBIGUATE')
                } else {
                    unDupedData = Bytes([...unDupedData.bytes, _.byte])
                }
                return ResultProcessing()
                

            case 'DESAMBIGUATE':
                if (_.byte===ESCDUP) {
                    setState('START_BYTE')
                    unDupedData = Bytes([...unDupedData.bytes, ESC])
                    return ResultProcessing()
                } else if(_.byte===ETX) { 
                    setState('CHECKSUM')
                    return ResultProcessing()
                } else {
                    return error('Final Esc followed by invalid byte')
                }

            case 'CHECKSUM':
                checksum = _.byte
                
                if (isChecksumOk()) {
                    setState('SUCESSFUL')
                    return makeSucessResult()
                } else {
                    setState('ERROR')
                    return error('Checksum does not match')
                }
           
        }

        return error('Switch statement invalid state catched')

    }

    return receptionHandler

}

    
export const datalinker = (data: Bytes): Datalinker<FinalResult> => {

    return {
        toWrite: makeFrame(data),
        receptionHandler: getReceptionHandler(),
    }

}