
enum Dimension {
    space = "space",

}

enum ParameterType {
    uint16_t = "uint16_t"   //inteiro positivo 16 bits 
}


interface Description {
    caption: string 
}

interface MetaData {
    interface: string[]     //ex: ["movimentador generico","dosador"]
    path: string[]          //ex: ["parametros de movimento"]   
}

interface MemRegion {
    startword: number
    startBit: number
    bitLengh: number 
}

interface Units {
    dimension: Dimension
}

interface Type {
    type:string
}

interface Uint16_t extends Type {
    default_value: number
    min_value: number
    max_value: number
}

interface OptionsList extends Type {
    default_value_index: number             //index in terms of the array 'options_list' bellow
    options_list: Array<[string, number]>  //number is the number choosed string option represents
}


interface Parameter {
    description: Description
    metadata: MetaData
    memRegion: MemRegion
    units: Units
    value: Uint16_t | OptionsList
}


//constructors


function uint16_t(default_value, min_value, max_value): Uint16_t {
    return { type: "Uint16_t", default_value, min_value, max_value }
}


function optionsList (default_value_index, options_list): OptionsList {
    return { type: "OptionsList", default_value_index, options_list }
}



const CMPP00LG: Parameter[] = [ 
    {
        description: { 
            caption: "Posicao Inicial" 
        },
        metadata: { 
            interface: ['Movimentador Generico'], 
            path: ['Parametros de Movimento'],
        },
        memRegion: {
            startword: 0x60,
            startBit: 0 ,
            bitLengh: 16 ,
        },
        units: {
            dimension: Dimension.space,
        },  
        value: uint16_t(100, 0, 9999)
    },

    {
        description: { 
            caption: "Posicao Final" 
        },
        metadata: { 
            interface: ['Movimentador Generico'], 
            path: ['Parametros de Movimento'],
        },
        memRegion: {
            startword: 0x61,
            startBit: 0 ,
            bitLengh: 16 ,
        },
        units: {
            dimension: Dimension.space,
        },  
        value: uint16_t(450, 0, 9999)
    },

    {
        description: { 
            caption: "Mensagem Reversa no Avanco" 
        },
        metadata: { 
            interface: ['Movimentador Generico'], 
            path: ['Parametros de Impressao'],
        },
        memRegion: {
            startword: 0x80,
            startBit: 5 ,
            bitLengh: 1 ,
        },
        units: {
            dimension: Dimension.space,
        },  
        value: optionsList(0, [["ligado",0],["desligado",1]])
    }

]




