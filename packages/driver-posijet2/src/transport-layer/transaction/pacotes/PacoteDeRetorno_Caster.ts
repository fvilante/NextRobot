import { PacoteDeRetorno_ComErro } from "./PacoteDeRetorno_ComErro"
import { AnyDirecao } from "./base-model/Direcao"
import { PacoteDeRetorno_Uncasted } from "./PacoteDeRetorno_Uncasted"
import { PacoteDeRetorno } from "./PacoteDeRetorno"
import { PacoteDeRetorno_DeEnvioSemErro } from "./PacoteDeRetorno_DeEnvioSemErro"
import { PacoteDeRetorno_DeSolicitacaoSemErro } from "./PacoteDeRetorno_DeSolicitacaoSemErro"
import { exhaustiveSwitch } from "@nextrobot/core-utils"


// Pacote De Retorno Caster

export const pacoteDeRetorno_Caster = <D extends AnyDirecao>(pacoteRetorno: PacoteDeRetorno_Uncasted<D>):PacoteDeRetorno<D> => {

    const direcaoDeTransmissao = pacoteRetorno.direcaoDoPacoteDeTransmissao
    const kind = pacoteRetorno.pacoteDeErro === true ? 'Erro' : ( direcaoDeTransmissao as AnyDirecao)

    switch (kind) {
        case 'Erro':               return PacoteDeRetorno_ComErro(pacoteRetorno)  
        case 'Envio':               return PacoteDeRetorno_DeEnvioSemErro(pacoteRetorno)  
        case 'MascaraResetarBits':  return PacoteDeRetorno_DeSolicitacaoSemErro(pacoteRetorno) 
        case 'MascaraSetarBits':    return PacoteDeRetorno_DeSolicitacaoSemErro(pacoteRetorno) 
        case 'Solicitacao':         return PacoteDeRetorno_DeSolicitacaoSemErro(pacoteRetorno) 
        default:
            return exhaustiveSwitch(kind)
    }

}
