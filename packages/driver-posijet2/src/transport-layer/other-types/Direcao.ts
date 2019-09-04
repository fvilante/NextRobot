

const __direcao = {
    'Solicitacao': 0,
    'Envio': 64,
    'MascaraSetarBits': 128,
    'MascaraResetarBits': 192,
} as const

export type Direcao = keyof typeof __direcao

export const direcaoToNumber = (_: Direcao): number => __direcao[_]

   