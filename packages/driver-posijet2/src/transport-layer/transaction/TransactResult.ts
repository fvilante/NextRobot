// TransactResult
import { AnyDirecao, direcaoToNumber } from "./pacote-models/base-model/Direcao"
import { PacoteDeRetorno } from "./pacote-models/PacoteDeRetorno"
import { PacoteDeTransmissao } from "./pacote-models/PacoteDeTransmissao"
import { DatalinkResult } from "../../datalink-layer/datalink-result"
import { PacoteDeRetorno_Uncasted } from "./pacote-models/PacoteDeRetorno_Uncasted"


export type TransactResult<D extends AnyDirecao> = {
    readonly pacoteRetornado: PacoteDeRetorno<D>
    readonly diagnostics: {
        readonly pacoteTransmitido: PacoteDeTransmissao<D>
        readonly bytesTransmidos: readonly number[]
        readonly datalinkResult: DatalinkResult
        readonly pacoteRetornadoUncasted: PacoteDeRetorno_Uncasted<D> 
    }
}

export type AnyTransactResult = TransactResult<AnyDirecao> 

export const TransactResult = <D extends AnyDirecao>(_: TransactResult<D>):TransactResult<D> => _

