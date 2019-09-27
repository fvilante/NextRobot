

const __direcao = {
    'Solicitacao': 0,
    'Envio': 64,
    'MascaraSetarBits': 128,
    'MascaraResetarBits': 192,
} as const

export type AnyDirecao = keyof typeof __direcao

export const direcaoToNumber = (_: AnyDirecao): number => __direcao[_]

   