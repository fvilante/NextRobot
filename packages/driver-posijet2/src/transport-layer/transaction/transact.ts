// env
import { syncTransactioner, serialPortOpenner_PC } from "@nextrobot/serialport-manager"
import { Reader } from "@nextrobot/core-utils"

// transact
import { CmppAddress } from "./CmppAddress"
import { datalinkerWrapper } from "../../datalink-layer/posijet1-protocol"
import { DatalinkResult_Lifter } from "./DatalinkResult_Lifter"
import { PacoteDeTransmissao } from "./pacote-models/PacoteDeTransmissao"
import { TransactResult } from "./TransactResult"
import { Env, getEnv } from './Env'
// test
import { pacoteDeRetorno_Caster } from "./pacote-models/PacoteDeRetorno_Caster"
import { direcaoToNumber, AnyDirecao } from "./pacote-models/base-model/Direcao"
import { PacoteDeRetorno_Uncasted } from "./pacote-models/PacoteDeRetorno_Uncasted"


// 

export const transact = <D extends AnyDirecao>(pacote: PacoteDeTransmissao<D>): Reader<Env, Promise<TransactResult<D>>> => {

    const main = async (env: Env):Promise<TransactResult<D>> => {

        const cmppAddr = env.cmppAddress
        const canal = cmppAddr.canal
        const direcaoTexto = pacote.direcao
        const direcaoNumero = direcaoToNumber(direcaoTexto)
        const portReference = cmppAddr.portReference
        const portOpener = env.portOpener
    
        const pacoteEmBytes = [
            direcaoNumero + canal, 
            pacote.comando,
            pacote.dadoH,
            pacote.dadoL
        ]
    
        const response = await syncTransactioner(portOpener, portReference, datalinkerWrapper(pacoteEmBytes) )
    
        const pacoteRetornoUncasted = DatalinkResult_Lifter(response, direcaoTexto)

        const pacoteRetornoCasted = pacoteDeRetorno_Caster(pacoteRetornoUncasted)

        const transactResult = TransactResult({
            pacoteRetornado: pacoteRetornoCasted,
            diagnostics: {
                pacoteTransmitido: pacote,
                bytesTransmidos: pacoteEmBytes,
                datalinkResult: response,
                pacoteRetornadoUncasted: pacoteRetornoUncasted,
            }
        })
        
        return transactResult as TransactResult<D>

    }


    return getEnv().map( main )


}


// informal Test


const Test1 = () => {

    // 1
    const a = pacoteDeRetorno_Caster(PacoteDeRetorno_Uncasted('Envio',false,0,0,0,0))
    const b = a.kind // ok -> "PacoteDeRetornoDeEnvioSemErro" | "PacoteDeRetornoComErro"

    // 2
    const c = pacoteDeRetorno_Caster(PacoteDeRetorno_Uncasted('Solicitacao', false, 0,0,0,0))
    const d = c.kind // ok -> "PacoteDeRetornoDeSolicitacaoSemErro" | "PacoteDeRetornoComErro"


}

const Test2 = async () => {

    const env: Env = {

        portOpener: serialPortOpenner_PC,
        cmppAddress: CmppAddress({
            channel: 0,
            portName: 'COM3',
            baudRate: 9600
        }) 

    }

    const pacoteTransmissao = PacoteDeTransmissao('Envio', 0, 0)
    const retorno = await transact(pacoteTransmissao).run(env)

    console.log(retorno)
    console.log(retorno.diagnostics.datalinkResult.payload)

    const statusL = retorno.pacoteRetornado.payload.statusL
    console.table(statusL)


}

// tslint:disable-next-line: no-expression-statement
//Test2()

