import { serialPortOpenner_PC } from "@nextrobot/serialport-manager"
import { CmppAddress } from "../transport-layer/transaction/CmppAddress"
import { Direcao } from "../transport-layer/other-types/Direcao"
import { PacoteDeTransmissaoPadrao } from "../transport-layer/pacotes/PacoteDeTransmissao"
import { transact } from "../transport-layer/transaction/transact"
import { ByteToWord } from "../transport-layer/other-types/byteAndWordConversors"

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
const getPacoteDeTransmissao = () => {
    const direcao: Direcao = 'Solicitacao'
    const comando = 69 //COMANDO_MASCARA_DE_ERRO
    const word16 = 0
    return PacoteDeTransmissaoPadrao(direcao, comando, word16)
}

// send user program def and promise response


const Test = async () => {

    const pacoteRetornado =  await transact(
                                    getPortOpener(), 
                                    getCmppAddress(), 
                                    getPacoteDeTransmissao()
                                ) 
                                                                  

    console.log(`Resultado...`)
    console.log(pacoteRetornado)

    switch (pacoteRetornado.kind) {
        case 'PacoteDeRetornoDeEnvioSemErro': 
            console.table(pacoteRetornado.payload.statusL); break;
        case 'PacoteDeRetorno_ComErro': 
            console.table(pacoteRetornado.payload.statusL); break;
        case 'PacoteDeRetorno_DeSolicitacaoSemErro': 
            console.log(`Word recebida: ${ByteToWord(pacoteRetornado.payload.dadoL, pacoteRetornado.payload.dadoH)}`); break;
    }
    
   
}



// tslint:disable-next-line: no-expression-statement
Test()