import { DatalinkResult } from "../../datalink-layer/datalink-result";
import { AnyDirecao } from "../other-types/Direcao";
import { PacoteDeRetorno, PacoteDeRetorno_ComErro, PacoteDeRetorno_DeSolicitacaoSemErro, PacoteDeRetorno_DeEnvioSemErro } from "./PacoteDeRetorno";
import { PacoteRetornoPadrao } from "./PacoteRetornoPadrao";
import { NACK } from "../../datalink-layer/posijet1-protocol";



export const PacoteDeRetorno_Caster = (response: DatalinkResult, transmitedDirection: AnyDirecao): PacoteDeRetorno => {

    //todo: should this function be really that coupled here? Could it be extracted and decoupled ?
    const morphism = (_: DatalinkResult): PacoteRetornoPadrao => {
        const comando = _.payload[1]
        const dadoL = _.payload[2]
        const dadoH = _.payload[3]
        const direcaoCanal = _.payload[0]
        const canal = direcaoCanal & 0b00111111
        const r = PacoteRetornoPadrao(canal, comando, dadoL, dadoH)
        return r
    }

    const pacotePadrao = morphism(response)
    const startByte = response.startByte
    const hasErro = startByte === NACK ? true : false

    
    //todo: this if-sequence would be refactored to be less hairly

    // tslint:disable: no-if-statement
    if(hasErro) {
        return PacoteDeRetorno_ComErro(pacotePadrao)
    } else {
        if (transmitedDirection === 'Envio') {
            return PacoteDeRetorno_DeEnvioSemErro(pacotePadrao)
        } else {
            return PacoteDeRetorno_DeSolicitacaoSemErro(pacotePadrao)
        }
    }
    // tslint:enable: no-if-statement

} 