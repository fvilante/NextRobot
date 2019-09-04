import { StatusL } from "./bitmask/StatusL";
import { StatusH } from "./bitmask/StatusH";
import { MascaraDeErro } from "./bitmask/MascaraDeErro";
import { PortReference, serialPortOpenner_PC } from "@nextrobot/serialport-manager";
import { transact } from "./transaction/transact";
import { CmppAddress } from "./transaction/CmppAddress";
import { PacoteDeTransmissaoPadrao } from "./pacotes/PacoteDeTransmissao";
import { ByteToWord } from "./tools-byteAndWordConversors";


// tslint:disable: no-if-statement

const Test = async () => {
    const a = StatusL(15)
    //console.table(a)
    const b = StatusH(16)
    //onsole.table(b)
    const c = MascaraDeErro(31)
    //console.table(c)

    const portReference = PortReference('COM3', {
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        rtscts: false,
        xon: false,
        xoff: false,
    })

    const COMANDO_MASCARA_DE_ERRO = 0x45

    const pacoteRetornado = await transact(serialPortOpenner_PC, CmppAddress(portReference, 1), 
        PacoteDeTransmissaoPadrao('Solicitacao',COMANDO_MASCARA_DE_ERRO,0,0))



    console.log(`Resultado...`)
    console.log(pacoteRetornado)

    switch (pacoteRetornado.kind) {
        case 'PacoteDeRetornoDeEnvioSemErro': 
            console.table(pacoteRetornado.payload.statusL); break;
        case 'PacoteDeRetorno_ComErro': 
            console.table(pacoteRetornado.payload.statusL); break;
        case 'PacoteDeRetorno_MascaraDeErro': 
            console.table(pacoteRetornado.payload.mascaraDeErro); break; 
        case 'PacoteDeRetorno_DeSolicitacaoSemErro': 
            console.log(`Word recebida: ${ByteToWord(pacoteRetornado.payload.dadoL, pacoteRetornado.payload.dadoH)}`); break;
    }
    
   
}

// tslint:disable-next-line: no-expression-statement
Test()