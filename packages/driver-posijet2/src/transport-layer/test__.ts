
import { serialPortOpenner_PC } from "@nextrobot/serialport-manager";
import { transact } from "./transaction/transact";
import { CmppAddress } from "./transaction/CmppAddress";
import { PacoteDeTransmissao } from "./transaction/pacote-models/PacoteDeTransmissao";
import { AnyDirecao } from "./transaction/pacote-models/base-model/Direcao";


// tslint:disable: no-if-statement

const Test = async () => {

    const comando = 69 //COMANDO_MASCARA_DE_ERRO
    const word16 = 0

    const r = 
        await transact(
            CmppAddress({channel: 0, portName: 'COM3', baudRate: 9600}), 
            PacoteDeTransmissao('Solicitacao', comando, word16))
            .run({ portOpener: serialPortOpenner_PC })
    

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