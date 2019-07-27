
import { ParamMemmap } from './memmap-base'
import { CmppClassicProgram } from './application-program-classic'

type GetParameter<T> = Record<keyof T, ParamMemmap> 

interface Cmpp00LGMemMap extends GetParameter<CmppClassicProgram> { }


const Cmpp00LGMemMap: Cmpp00LGMemMap = {
    PosicaoInicial: { caption: 'Posicao Inicial', helpMsg: '', startWord: 0x60, startBit: 0, bitSize: 16, },
    PosicaoFinal: { caption: 'Posicao Final', helpMsg: '', startWord: 0x60, startBit: 0, bitSize: 16, },
    VelocidadeDeAvanco: { caption: 'Velocidade de Avanco', helpMsg: '', startWord: 0x60, startBit: 0, bitSize: 16, },
    VelocidadeDeRetorno: { caption: 'Velocidade de Retorno', helpMsg: '', startWord: 0x60, startBit: 0, bitSize: 16, },
    AceleracaoDeAvanco: { caption: 'Aceleracao de Avanco', helpMsg: '', startWord: 0x60, startBit: 0, bitSize: 16, },
    AceleracaoDeRetorno: { caption: 'Aceleracao de Retorno', helpMsg: '', startWord: 0x60, startBit: 0, bitSize: 16, },
    StartAutomaticoNoRetorno: { caption: 'Start Automatico no Retorno', helpMsg: '', startWord: 0x60, startBit: 0, bitSize: 16, },
    StartAutomaticoNoAvanco: { caption: 'Start Automatico no Avanco', helpMsg: '', startWord: 0x60, startBit: 0, bitSize: 16, },
    ModoDeTrabalhoDoEixo: { caption: 'Modo de Trabalho Do Eixo', helpMsg: '', startWord: 0x60, startBit: 0, bitSize: 16, },
}
