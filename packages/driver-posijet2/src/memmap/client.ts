
import {  } from './driver/CMPP00LG'
import { AnyUserProgram, GetParameterType as SingleParameterResult } from './core'
import { SerialPortOpener } from '@nextrobot/serialport-manager'
import { Direcao } from '../transport-layer/other-types/Direcao'
import { PacoteDeTransmissaoPadrao } from '../transport-layer/pacotes/PacoteDeTransmissao'
import { transact } from '../transport-layer/transaction/transact'
import { ByteToWord } from '../transport-layer/other-types/byteAndWordConversors'
import { Device } from '../core-models/device' 

// f :: SerialPortOpenner -> Device -> parameterName -> Promise<ResultValue>
export const ReadSingleParameter = 
    (portOpenner: SerialPortOpener) => <
    U extends AnyUserProgram>(device: Device<U>) => async <
    K extends keyof U>
    (parameter: K): Promise<U[K]> => {

    // get parameter memmap
    const memmap = device.memmap[parameter]
    
    // decide what transmission strategy to use
    const bitsize = memmap.bitSize
    const direcao: Direcao = "Solicitacao" //todo: what if bitSize is grather than 16 bits ?

    // configure package
    const comando = memmap.startWord
    const word16 = 0
    const cmppAddress = device.cmppAddress

    // send packet and await return data
    const pacoteDeRetorno =  await transact(
        portOpenner, 
        cmppAddress, 
        PacoteDeTransmissaoPadrao(direcao, comando, word16)
    ) 

    switch (pacoteDeRetorno.kind) {

        case 'PacoteDeRetorno_DeSolicitacaoSemErro': {
            const dadoL = pacoteDeRetorno.payload.dadoL
            const dadoH = pacoteDeRetorno.payload.dadoH
            const wave = ByteToWord(dadoL, dadoH)
            const fromWave = memmap.fromWave
            const value = fromWave(wave)
            return value
        }

        case 'PacoteDeRetorno_ComErro': {
            throw new Error(`Pacote de retorno com erro ${pacoteDeRetorno.payload}`)
        }

        case 'PacoteDeRetornoDeEnvioSemErro': {
            console.log(pacoteDeRetorno)
            throw new Error(`Tipo de pacote retornado é 'PacoteDeRetornoDeEnvioSemErro' enquanto o pacote aguardado era 'PacoteDeRetorno_DeSolicitacaoSemErro' ---> ${pacoteDeRetorno.payload}`)
        }

    }

        
}
