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



export interface CmppClassicProgram {

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

