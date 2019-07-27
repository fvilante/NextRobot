
export interface ParamMemmap {
    // descricao
    readonly caption: string // nome do parametro
    readonly helpMsg?: string //texto descritivo do parametro
    // regiao na memoria
    readonly startWord: number // word onde o parametro começa
    readonly startBit: number // bit onde o parametro começa a partir da startWord (0 é igual startWord)
    readonly bitSize: number // tamanho do dado em bits
    // tipo de dado

    // tipo de memoria
    // todo: implement bellow
    readonly memoryType?: 'volatile' | 'stable'
    readonly accessType?: 'read-only' | 'read-write' | 'write-only'  
} 

