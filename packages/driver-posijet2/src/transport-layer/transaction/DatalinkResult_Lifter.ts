import { DatalinkResult } from "../../datalink-layer/datalink-result";
import { AnyDirecao } from "./models/base-model/Direcao";
import { PacoteDeRetorno_Uncasted } from "./models/PacoteDeRetorno_Uncasted";

const NACK = 0x15

export const DatalinkResult_Lifter = <D extends AnyDirecao>(response: DatalinkResult, transmitedDirection: D): PacoteDeRetorno_Uncasted<D> => {

    const morphism = (_: DatalinkResult): PacoteDeRetorno_Uncasted<D> => {
        const comando = _.payload[1]
        const dadoL = _.payload[2]
        const dadoH = _.payload[3]
        const direcaoCanal = _.payload[0]
        const canal = direcaoCanal & 0b00111111
        const pacoteDeErro = response.startByte === NACK 
        const r = PacoteDeRetorno_Uncasted(transmitedDirection, pacoteDeErro, canal, comando, dadoL, dadoH)
        return r
    }

    const pacotePadrao = morphism(response)
   
    return pacotePadrao

} 