import { Memmap, US0 } from '../core'
import { ANY_LENGTH, LENGTH, ANY_LINEARVELOCITY } from '../kinetics/measure'


const RAMINT = 0x60 // Endereco dos parametros de interrupcao
const RAMPRG = 0xA0 // Endereco dos parametros do programa

const lengthToWave =  (_: number): number => _ // a = toWave length
const a1 = (_: number): number => _ // fromWave length
const b0 = (_: number): number => _ // b = velocity
const b1 = (_: number): number => _
const c0 = (_: number): number => _ // c = acceleration
const c1 = (_: number): number => _


export type UserProgram = {
    //readonly 'Parametro1': unknown
    readonly 'Posicao atual': ANY_LENGTH
    readonly 'Posicao de execucao': ANY_LENGTH
    readonly 'Posicao do inicio da rampa': ANY_LENGTH
    readonly 'Velocidade maxima': ANY_LINEARVELOCITY
}



export const memmap: Memmap<UserProgram> = {

    'Posicao atual': {
        startWord: 0x00,
        startBit: 0,
        bitSize: 16,
        toWave: _ => lengthToWave(_),
        fromWave: _ => waveToLength(_), 
    },

    'Posicao de execucao': {
        startWord: 0x02,
        startBit: 0,
        bitSize: 16,
        toWave: _ => lengthToWave(_.scalar),
        fromWave: _ => LENGTH(lengthToWave(_), US0), 
    },
 
    'Posicao do inicio da rampa': {
        startWord: 0x04,
        startBit: 0,
        bitSize: 16,
        toWave: _ => lengthToWave(_.scalar),
        fromWave: _ => LENGTH(lengthToWave(_), US0), 
    },
    
    'Velocidade maxima': {
        startWord: 0x04,
        startBit: 0,
        bitSize: 16,
        toWave: _ => lengthToWave(_),
        fromWave: _ => LENGTH(lengthToWave(_), US0), 
    },
}
