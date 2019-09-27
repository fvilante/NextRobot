import { Byte } from '@nextrobot/serialport-manager'


const __byteDeErro = { 
    1: "Start byte invalido (stx)",
    2: "Estrutura do pacote de comunicação invalido",
    3: "Estrutura do pacote de comunicação invalido",
    4: "Estrutura do pacote de comunicação invalido",
    5: "Estrutura do pacote de comunicação invalido",
    6: "Estrutura do pacote de comunicação invalido",
    7: "Estrutura do pacote de comunicação invalido",
    8: "Estrutura do pacote de comunicação invalido",
    9: "Estrutura do pacote de comunicação invalido",
    10: "Não usado",
    11: "End byte invalido (etx)",
    12: "Timer in",
    13: "Não usado",
    14: "Framming",
    15: "Over run",
    16: "Buffer de recepção cheio",
    17: "CheqSum",
    18: "Buffer auxiliar ocupado",
    19: "Seqüência de byte enviada muito grande",
} as const
type ByteDeErroDescricao = typeof __byteDeErro[keyof typeof __byteDeErro]
type ByteDeErroCodigo = keyof typeof __byteDeErro

export type ByteDeErro = {
    readonly codigo: ByteDeErroCodigo
    readonly descricao: ByteDeErroDescricao
}

export const ByteDeErro = (codigo: Byte): ByteDeErro => {
    const _ = codigo as ByteDeErroCodigo
    return ({
        codigo: _,
        descricao: __byteDeErro[_]
    })
}
