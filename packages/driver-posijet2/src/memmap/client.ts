
import { UserProgram, memmap } from './CMPP00AF'
import {  } from './CMPP00LG'
import { AnyUserProgram, Memmap, SingleParameter, GetParameterType, SingleMemmap } from './core'
import { CmppAddress } from '../transport-layer/transaction/CmppAddress'
import { SerialPortOpener } from '@nextrobot/serialport-manager'
import { LinearAxisClassic, PhysicalArm } from '../core-models/physical-arm'
import { Direcao } from '../transport-layer/other-types/Direcao'
import { PacoteDeTransmissaoPadrao } from '../transport-layer/pacotes/PacoteDeTransmissao'
import { transact } from '../transport-layer/transaction/transact'
import { PacoteDeRetorno, PacoteDeRetorno_ComErro } from '../transport-layer/pacotes/PacoteDeRetorno'


type Config = {
    readonly cmppAddress: CmppAddress
    readonly portOpenner: SerialPortOpener
    readonly physicalArm : LinearAxisClassic
}

const SendEach = (config: Config) => async <
    U extends AnyUserProgram, 
    K extends keyof U,
    >(s: SingleParameter<U,K>, memmap: SingleMemmap<U,K>): Promise<void> => {

    // value to be send
    const value = s.value

    // configure transmition 
    const direcao: Direcao = "Envio"
    const comando = memmap.startWord
    const word16 = memmap.toWave(value)

    // send packet and await return data
    const pacoteDeRetorno =  await transact(
        config.portOpenner, 
        config.cmppAddress, 
        PacoteDeTransmissaoPadrao(direcao, comando, word16)
    ) 

    const fromWave = memmap.fromWave

    switch (pacoteDeRetorno.kind) {
        case 'PacoteDeRetorno_ComErro':
            throw new Error(`Pacote de retorno com erro ${pacoteDeRetorno.payload}`)
        case 'PacoteDeRetornoDeEnvioSemErro':
            return 
        case 'PacoteDeRetorno_DeSolicitacaoSemErro':
            throw new Error(`Erro`)
    }

    // retorna pacote de transmissao
        
}