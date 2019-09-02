// tslint:disable: no-let no-expression-statement no-if-statement

import { Datalinker, ResultError, ReceptionHandlerResult, ResultProcessing, ResultSucessful } from '@nextrobot/serialport-manager'
import { Byte, Bytes } from '@nextrobot/serialport-manager'
import { flattenDeep } from '@nextrobot/core-utils'


// === Constantes === 

const ESC = 27
const ESCDUP = 27
const STX = 2
const ETX = 3
const ACK = 6
const NACK = 21


// Checksum

const calcChecksum = (undupedData: Bytes, start_byte: Byte): number => {
    const sum = [...undupedData, ...[start_byte, ETX]].reduce((acc,cur) => acc+cur)
    const sumNormalized = sum % 256
    const twosComplimented = 256 - sumNormalized
    return twosComplimented
}

// === Transmission ===

const makeFrame = (data: Bytes) => ():Bytes => {    
    const dup_esc = (data: Bytes): Bytes => flattenDeep(data.map( byte => byte===ESC ? [ESC, ESCDUP] : [byte] ))
    return [ESC, STX, ...dup_esc(data), ESC, ETX, calcChecksum(data, STX)]
}


// === Reception ===

type FinalResult = {
    readonly data: Bytes
}

const getReceptionHandler = (): Datalinker<FinalResult>['receptionHandler'] => {

    let rawFrame: Bytes = []
    let unDupedData: Bytes = []
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
        rawFrame = [...rawFrame, _]

        // run machine state
        switch (state) {
            case 'NOT_INITIATED':
                if (_===ESC) {
                    setState('INITIAL_ESC')
                    return ResultProcessing()
                } else {
                    return error('Initial Esc failed')
                } 
               
            case 'INITIAL_ESC':
                if (_===STX || _===ACK || _===NACK) {
                    startByte = _
                    setState('START_BYTE')
                    return ResultProcessing()
                } else {
                    return error('Start byte failed')
                }

            case 'START_BYTE':
                if (_===ESC) {
                    setState('DESAMBIGUATE')
                } else {
                    unDupedData = [...unDupedData, _]
                }
                return ResultProcessing()
                

            case 'DESAMBIGUATE':
                if (_===ESCDUP) {
                    setState('START_BYTE')
                    unDupedData = [...unDupedData, ESC]
                    return ResultProcessing()
                } else if(_===ETX) { 
                    setState('CHECKSUM')
                    return ResultProcessing()
                } else {
                    return error('Final Esc followed by invalid byte')
                }

            case 'CHECKSUM':
                checksum = _
                
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