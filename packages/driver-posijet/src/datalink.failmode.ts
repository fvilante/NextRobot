import { CasoDeFalha} from './datalink.failmode';

import { Byte, Bytes } from './common'
import { Frame, Obj, ESC, STX, ETX, ACK, NACK, 
         frame2Bytes, createPerfectFrame, changeFrame, FrameKeys} 
         from './datalink.common'
import * as R from 'ramda'
import { cloneDeep } from 'lodash'



// **********************************************
//  GERADOR ARTIFICIAL DE FRAMES DEFEITUOSOS
// **********************************************




//  ============== FABRICA DE RUIDOS  ==============


// Nota: Os numeros aleatorios precisam ser gerados por funcoes puras. Ou seja deterministicos (pseudo-aleatorios com semente determinada)
// TODO: melhorar funcao rand para levantar padroes aparentemente mais desorganizados (exrtrair para uma outra biblioteca de numeros aleatorios deterministicos))
const rand = (ini, end) => Math.ceil(R.median([ini,end]))  
export const ruido = size => R.range(0,size)  


// Intensidade em numero de elementos para geracao de ruido
const MUITO_GRANDE = 50
const GRANDE = 15 
const PEQUENO = 4
const MUITO_PEQUENO = 1


//perfeicao
const start_bytes = [ STX, ACK, NACK ]
export const um_frame_perfeito = createPerfectFrame( start_bytes[0] , ruido(PEQUENO) )
export const um_frame_perfeito_qualquer = frame2Bytes( um_frame_perfeito )
const perfeito = um_frame_perfeito_qualquer


//  ============== INTERFACE DE CASOS DE FALHA  ==============


interface Type {
    type: "CasoDeFalhaPosicional" 
            | "CasoDeFalhaRuidoAleatorio1"
}

interface CasoDeFalhaPosicional extends Type {
    posicao_da_falha: FrameKeys     
    nome_da_falha: string           
}

type PosicaoRuido = 'PRE_FRAME' | 'MID-FRAME' | 'POS-FRAME'


interface CasoDeFalhaRuidoAleatorio1 extends Type {
    posicao_do_ruido: PosicaoRuido
    largura_do_ruido: number 
}

export type CasoDeFalha = CasoDeFalhaPosicional | CasoDeFalhaRuidoAleatorio1


//  ============== CONSTRUTORES DE CASOS DE FALHA  ==============

export function casoDeFalhaPosicional(posicao_da_falha:FrameKeys, nome_da_falha: string): CasoDeFalhaPosicional {
    return {
        type: "CasoDeFalhaPosicional",
        posicao_da_falha,
        nome_da_falha,
    }
}


export function casoDeFalhaRuidoAleatorio1(posicao_do_ruido:PosicaoRuido, largura_do_ruido: number): CasoDeFalhaRuidoAleatorio1 {
    return {
        type: "CasoDeFalhaRuidoAleatorio1",
        posicao_do_ruido,
        largura_do_ruido,
    }
}



//  ============== ALGORITMOS PARA CASOS DE FALHA ALEATORIO  ==============

// cria instancias dos Casos de Falha Aleatrio
const mixDeFalhas = R.xprod( 
    ['PRE_FRAME', 'MID-FRAME', 'POS-FRAME'] as PosicaoRuido[], 
    [MUITO_PEQUENO, PEQUENO, GRANDE, MUITO_GRANDE])
const criaCasosDeFalhaRuidoAleatorio1 =
    R.map( ([posicao,largura]) => 
    casoDeFalhaRuidoAleatorio1(posicao, largura), mixDeFalhas )




//  ============== MODOS DE FALHA DE RUIDO POSICIONAL - DECLARACOES  ==============


const base_cases = (control: Byte) => {
    return {
        ausente: [],
        duplicado: [control, control],
        triplicado: [control, control, control],
        um_ruido: R.reject( (val) => (val == control) , ruido(MUITO_PEQUENO))
    }
}


interface Falha {
    readonly [index: string]: Bytes
}


interface ModosDeFalha {
    readonly PRE_NOISE: Falha,
    readonly INITIAL_ESC: Falha,
    readonly START_BYTE: Falha,
    readonly OBJECT: Falha,      //without duplicated escs
    readonly FINAL_ESC: Falha,
    readonly END_BYTE: Falha,
    readonly CHECKSUM: Falha,    //without duplicated escs
    readonly POST_NOISE: Falha    
}

const modosDeFalha: ModosDeFalha = {

    
    OBJECT: 
        {
            nulo: [],
            muito_grande: ruido(MUITO_GRANDE),
            muito_pequeno: [0],
            com_esc: [1,27,3,4],
            //sem_esc: R.reject((val) => (val == ESC), ruido(4))
        },

    
    PRE_NOISE: 
        {
            muito_pequeno: ruido(MUITO_PEQUENO),
            pequeno: ruido(PEQUENO),
            grande: ruido(MUITO_GRANDE),
            muito_grande: ruido(GRANDE),
        },


    INITIAL_ESC: base_cases(ESC),
    START_BYTE: base_cases(STX),
    FINAL_ESC: base_cases(ESC) ,
    END_BYTE: base_cases(ETX),
    CHECKSUM: base_cases( ruido(1)[0] ),
    
    POST_NOISE: 
        {
            muito_pequeno: ruido(MUITO_PEQUENO),
            pequeno: ruido(PEQUENO),
            grande: ruido(MUITO_GRANDE),
            muito_grande: ruido(GRANDE),
            //falso positivo! Deixe aqui pois faz parte do teste ter 1 falso positivo
            sem_pos_ruido: [] 
        },


}


// ============== ALGORITIMOS PARA CASO DE FALHA POSICIONAL ==================

const listaDePosicoes: FrameKeys[] = R.keys(um_frame_perfeito)
const lensPosicaoDeFalha = (posicao:string) => R.lensProp(posicao)
const chaveModosDeFalhaDaPosicao = (posicao:string) => 
    R.keys( R.view( lensPosicaoDeFalha(posicao), modosDeFalha ) )
const criaCasosDeFalhaPosicional: CasoDeFalhaPosicional[] = 
    R.unnest( R.map( pos =>  R.map( nome  => casoDeFalhaPosicional(pos, nome),  chaveModosDeFalhaDaPosicao(pos) )  
    , listaDePosicoes ) )




//  ============== TODOS OS CASOS DE FALHA: POSICIONAL E ALEATORIO1  ==============

export const criaTodosCasosDeFalha: CasoDeFalha[] = 
    R.concat(criaCasosDeFalhaRuidoAleatorio1, criaCasosDeFalhaPosicional )





//  ============== APLICADOR DE CASOS DE FALHA A PACOTE  ==============

const changeFrameAttr = (key:FrameKeys, value: Bytes, frame: Frame) => changeFrame([[key, value]], frame )

function aplicaCasoDeFalhaPosicional (frame: Frame, caso: CasoDeFalhaPosicional): Frame  {
    
    const posicao = caso.posicao_da_falha
    const nome = caso.nome_da_falha
    const falha = modosDeFalha[posicao][nome]
    //aplica
    let frameFalhado = cloneDeep(frame)
    frameFalhado[posicao] = falha

    return changeFrameAttr(posicao, falha, frame)

    return frameFalhado

}

function aplicaCasoDeFalhaRuidoAleatorio1 (frame: Frame, caso: CasoDeFalhaRuidoAleatorio1): Frame  {

    const posicao = caso.posicao_do_ruido    
    const largura = caso.largura_do_ruido

    const insertNoise = changeFrameAttr

    switch (posicao) {

        case 'PRE_FRAME':
            return insertNoise("PRE_NOISE", ruido(largura), frame)
        case 'MID-FRAME':
            // esta insercao de ruido em INITIAL_ESC nao está adequada, mas é  que tem pra hoje 
            return insertNoise("INITIAL_ESC", ruido(largura), frame)
        case 'POS-FRAME':
            return insertNoise("POST_NOISE", ruido(largura), frame)
        default: 
            throw new Error("Tipo de Caso de Falha não é reconhecido pelo pattern matcher")
    }

}


export const aplicaCasoDeFalha = (frame:Frame, caso:CasoDeFalha): Frame => {

    
    switch (caso.type) {

        case 'CasoDeFalhaPosicional':
            return aplicaCasoDeFalhaPosicional(frame, caso as CasoDeFalhaPosicional )
            
        case 'CasoDeFalhaRuidoAleatorio1':
            return aplicaCasoDeFalhaRuidoAleatorio1(frame,  caso as CasoDeFalhaRuidoAleatorio1 )
        
        default: 
            throw new Error("Tipo de Caso de Falha não é reconhecido pelo pattern matcher")

    }

}




// =================== API ===============================

//todo: improve algorithm / test
export const applyRandomErrorToFrame = (seed_random_number: number, frame: Frame): Frame => {

    const casos: CasoDeFalha[] = criaTodosCasosDeFalha

    const last_caso = casos.length-1

    const random: number = rand(0, seed_random_number)

    const index = Math.floor( (last_caso) * random/seed_random_number )

    const caso = casos[index]

    const frameFalhado = aplicaCasoDeFalha(frame, caso)

    return frameFalhado


}

//todo: improve algorithm / test
export const introduceNoiseInStream = (noise_rate_per_clean_data:number, data: Bytes) : Bytes => {

    const noise_rate = noise_rate_per_clean_data

    const input:Bytes = data
    let output:Bytes  = []

    for (let k=0; k < input.length; k+noise_rate) {

        //introduce noise
        const noise: Byte = rand(0,255)
        output.push(noise)
        //introduce clean data
        output = R.concat(output, R.slice(k,noise_rate)(input) )

    }

    const noiseData = output

    return noiseData

}


