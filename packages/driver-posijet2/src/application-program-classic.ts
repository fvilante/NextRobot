import { 
    //types
    Space, 
    Speed,
    Acceleration,
    Options,
    LigadoDesligado,
    ModoDetrabalhoDoEixo,
    //type constructors
    Milimeter,
    MilimeterPerSecond,
    MilimeterPerSquareSecond,
} from './application-types'

import { CmppProgram } from './application-program-base'

export interface CmppClassicProgram extends CmppProgram {

    readonly PosicaoInicial: Space
    readonly PosicaoFinal: Space
    readonly VelocidadeDeAvanco: Speed
    readonly VelocidadeDeRetorno: Speed
    readonly AceleracaoDeAvanco: Acceleration
    readonly AceleracaoDeRetorno: Acceleration
    readonly StartAutomaticoNoRetorno: Options<LigadoDesligado>
    readonly StartAutomaticoNoAvanco: Options<LigadoDesligado>
    readonly ModoDeTrabalhoDoEixo: Options<ModoDetrabalhoDoEixo>

}

