// env
import { SerialPortOpener, syncTransactioner, serialPortOpenner_PC } from "@nextrobot/serialport-manager"
import { Reader } from "../../memmap/assets/reader"
// TransactResult
import { AnyDirecao, direcaoToNumber } from "../other-types/Direcao"
import { PacoteDeRetorno } from "../pacotes/PacoteDeRetorno"
import { PacoteDeTransmissao } from "../pacotes/PacoteDeTransmissao"
import { DatalinkResult } from "../../datalink-layer/datalink-result"
import { PacoteDeRetorno_Uncasted } from "../pacotes/PacoteDeRetorno_Uncasted"
// transact
import { CmppAddress } from "./CmppAddress"
import { datalinkerWrapper } from "../../datalink-layer/posijet1-protocol"
import { DatalinkResult_Lifter } from "./DatalinkResult_Lifter"
// test
import { pacoteDeRetorno_Caster } from "./PacoteDeRetorno_Caster"




type Env = {
    readonly portOpener: SerialPortOpener
}

const getEnv = ():Reader<Env,Env> => Reader( (x:Env) => x)


//


type TransactResult<D extends AnyDirecao> = {
    readonly pacoteRetornado: PacoteDeRetorno<D>
    readonly diagnostics: {
        readonly pacoteTransmitido: PacoteDeTransmissao<D>
        readonly bytesTransmidos: readonly number[]
        readonly datalinkResult: DatalinkResult
        readonly pacoteRetornadoUncasted: PacoteDeRetorno_Uncasted<D> 
    }
}

const TransactResult = <D extends AnyDirecao>(_: TransactResult<D>):TransactResult<D> => _


// 

export const transact = <D extends AnyDirecao>(cmppAddr: CmppAddress, pacote: PacoteDeTransmissao<D>): Reader<Env, Promise<TransactResult<D>>> => {

    const main = async (env: Env):Promise<TransactResult<D>> => {

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

    const cmppAddr = CmppAddress({
        channel: 0,
        portName: 'COM3',
        baudRate: 9600
    }) 

    const env: Env = {

        portOpener: serialPortOpenner_PC

    }

    const pacoteTransmissao = PacoteDeTransmissao('Solicitacao', 0, 0)
    const retorno = await transact(cmppAddr, pacoteTransmissao).run(env)

    console.log(retorno)
    console.log(retorno.diagnostics.datalinkResult.payload)

    const a = retorno.diagnostics.bytesTransmidos


}

// tslint:disable-next-line: no-expression-statement
Test2()

