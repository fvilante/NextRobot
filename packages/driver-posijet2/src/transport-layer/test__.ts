import { StatusL } from "./bitmask/StatusL";
import { StatusH } from "./bitmask/StatusH";
import { MascaraDeErro } from "./bitmask/MascaraDeErro";
import { PortReference, serialPortOpenner_PC } from "@nextrobot/serialport-manager";
import { transact } from "./transaction/transact";
import { CmppAddress } from "./transaction/CmppAddress";
import { PacoteDeTransmissaoPadrao } from "./pacotes/PacoteDeTransmissao";
import { ByteToWord } from "./other-types/byteAndWordConversors";
import { AnyDirecao } from "./other-types/Direcao";


// tslint:disable: no-if-statement

const Test = async () => {
  
    const portName = 'COM3'
    const direcao: AnyDirecao = 'Solicitacao'
    const channel = 1
    const baudRate = 9600
    const comando = 69 //COMANDO_MASCARA_DE_ERRO
    const word16 = 0
    const portOpener = serialPortOpenner_PC

    const pacoteRetornado = 
        await transact(portOpener, CmppAddress({channel, portName, baudRate}), PacoteDeTransmissaoPadrao(direcao, comando, word16)) 
    

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