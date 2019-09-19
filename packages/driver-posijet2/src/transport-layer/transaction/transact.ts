import { CmppAddress } from './CmppAddress'
import { direcaoToNumber } from '../other-types/Direcao'
import { PacoteDeTransmissaoPadrao } from '../pacotes/PacoteDeTransmissao';
import { PacoteDeRetorno } from '../pacotes/PacoteDeRetorno';
import { SerialPortOpener, syncTransactioner } from '@nextrobot/serialport-manager';
import { datalinkerWrapper } from '../../datalink-layer/posijet1-protocol';
import { PacoteRetorno_Caster } from '../pacotes/PacoteDeRetorno-Caster';

export const transact = async (portOpener: SerialPortOpener, cmppAddr: CmppAddress, pacote: PacoteDeTransmissaoPadrao ): Promise<PacoteDeRetorno> => {
    const canal = cmppAddr.canal
    const direcaoTexto = pacote.direcao
    const direcaoNumero = direcaoToNumber(direcaoTexto)
    const portReference = cmppAddr.portReference

    const pacoteEmBytes = [
        direcaoNumero + canal, 
        pacote.comando,
        pacote.dadoH,
        pacote.dadoL
    ]

    const response = await syncTransactioner(portOpener, portReference, datalinkerWrapper(pacoteEmBytes) )

    const pacoteRetorno = PacoteRetorno_Caster(response, direcaoTexto)
    
    return new Promise( (resolve) => { resolve(pacoteRetorno) })

}
