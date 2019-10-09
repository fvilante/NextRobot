import { serialPortOpenner_PC } from "@nextrobot/serialport-manager"
import { CmppAddress } from "../transport-layer/transaction/CmppAddress"
import { AnyDirecao } from "../transport-layer/transaction/pacote-models/base-model/Direcao"
import { PacoteDeTransmissao } from "../transport-layer/transaction/pacote-models/PacoteDeTransmissao"
import { transact } from "../transport-layer/transaction/transact"


// serial port manager
const getPortOpener = () => {
    return serialPortOpenner_PC // driver responsible do manage physical serial port
}

// cmpp address 
const getCmppAddress = () => {
    const portName = 'COM3'
    const channel = 1
    const baudRate = 9600
    return CmppAddress({channel, portName, baudRate})
}


// user program def
const getPacoteDeTransmissao_Solicitacao = () => {
    const direcao: AnyDirecao = 'Solicitacao'
    const comando = 69 //COMANDO_MASCARA_DE_ERRO
    const word16 = 0
    return PacoteDeTransmissao(direcao, comando, word16)
}

// send user program def and promise response


const Test = async () => {

    const env =  { portOpener: getPortOpener(), cmppAddress: getCmppAddress() }

    // resultado solicitacao
    const r =  await transact( getPacoteDeTransmissao_Solicitacao() ).run(env) 
                                                                  

    console.log(`Resultado...`)
    console.log(r)

    switch (r.pacoteRetornado.kind) {
        case 'PacoteDeRetorno_ComErro': 
            console.table(r.pacoteRetornado.payload.statusL); break;
        case 'PacoteDeRetorno_DeSolicitacaoSemErro': 
            console.table(r.pacoteRetornado.payload.dadoL); break;
    }
    
}



// tslint:disable-next-line: no-expression-statement
Test()