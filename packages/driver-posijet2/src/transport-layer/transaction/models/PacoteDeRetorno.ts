import { PacoteDeRetorno_DeSolicitacaoSemErro } from "./PacoteDeRetorno_DeSolicitacaoSemErro"
import { PacoteDeRetorno_DeEnvioSemErro } from "./PacoteDeRetorno_DeEnvioSemErro"
import { PacoteDeRetorno_ComErro } from "./PacoteDeRetorno_ComErro"
import { AnyDirecao } from "./base-model/Direcao"

// Static casting of Returned Packet

type __PacoteDeRetorno__DataCaster__ = {
    readonly 'Solicitacao':         { readonly data: PacoteDeRetorno_DeSolicitacaoSemErro  } 
    readonly 'Envio':               { readonly data: PacoteDeRetorno_DeEnvioSemErro        }            
    readonly 'MascaraSetarBits':    { readonly data: PacoteDeRetorno_DeEnvioSemErro        }  
    readonly 'MascaraResetarBits':  { readonly data: PacoteDeRetorno_DeEnvioSemErro        } 
}

export type PacoteDeRetorno<D extends AnyDirecao> = __PacoteDeRetorno__DataCaster__[D]['data']  | PacoteDeRetorno_ComErro

