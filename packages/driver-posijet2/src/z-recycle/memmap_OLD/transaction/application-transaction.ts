import { AnyDriver, UserProgram } from '../driver/driver-core'
import { Device } from '../core-models/device'
import { mapObjectIndexed } from '@nextrobot/core-utils'
import { transact } from '../../../transport-layer/transaction/transact';
import { AnyDirecao } from '../../../transport-layer/transaction/models/base-model/Direcao';
import { serialPortOpenner_PC } from '@nextrobot/serialport-manager';
import { PacoteDeTransmissao } from '../../../transport-layer/transaction/models/PacoteDeTransmissao';
import { Word } from '../../../transport-layer/transaction/models/base-model/Word';
import { ByteToWord } from '../../../transport-layer/transaction/models/base-model/byteAndWordConversors';

// tslint:disable: no-let no-if-statement no-expression-statement



export const SendCmppProgram = async <T extends AnyDriver>(program: UserProgram<T>, device: Device<T>): Promise<void> => {
    
    for (let parameter in program) {

        // helpers
        const memmap = device.memmap[parameter]
        const cmppAddress = device.cmppAddress
        const portOpener = serialPortOpenner_PC

        // waving
        const waver = memmap.Waver
        const toWave = waver.toWave
        const unWavedValue = program[parameter]
        const wavedValue = toWave(unWavedValue, device)

        const comando = device.memmap[parameter].StartWord

        const bitSize = memmap.BitSize
        let packet: PacoteDeTransmissao;

        if (bitSize===16) {
            packet = PacoteDeTransmissaoPadrao('Envio', comando, wavedValue.waved)
        }
        else {
            throw new TypeError('Error: only bitize 16 are supported')
        }

        
        console.table(parameter)
        console.table(memmap)
        console.table(waver)
        console.table(unWavedValue)
        console.table(wavedValue)
        console.table(cmppAddress)

        console.table(`Resultado...`)
/*        
        const pacoteRetornado = await transact(portOpener, cmppAddress, packet) 

        console.log(pacoteRetornado)
    
        switch (pacoteRetornado.kind) {
            case 'PacoteDeRetornoDeEnvioSemErro': 
                console.table(pacoteRetornado.payload.statusL); break;
            case 'PacoteDeRetorno_ComErro': 
                console.table(pacoteRetornado.payload.statusL); break;
            case 'PacoteDeRetorno_DeSolicitacaoSemErro': 
                console.log(`Word recebida: ${ByteToWord(pacoteRetornado.payload.dadoL, pacoteRetornado.payload.dadoH)}`); break;
        }
*/

    }

} 

export const ReadCmppProgram = <T extends AnyDriver>(program: UserProgram<T>, device: Device<T>): /*Promise<UserProgram<T>>*/ void => {

    // cria a transacao sincrona

}


