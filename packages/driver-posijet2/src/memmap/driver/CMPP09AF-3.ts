import { Memmap, US0 } from '../core'
import { ANY_LENGTH, LENGTH, ANY_LINEARVELOCITY, AnyUnitSystem, LINEARVELOCITY, LINEARACCELERATION } from '../kinetics/measure'
import { Length } from 'ts-toolbelt/out/types/src/Tuple/_api'


const RAMINT = 0x60 // Endereco dos parametros de interrupcao
const RAMPRG = 0xA0 // Endereco dos parametros do programa

const s0 =  <U extends AnyUnitSystem>(_: LENGTH<U>): number => _.scalar 
const s1 = (_: number): LENGTH<US0> => LENGTH(_, US0) 
const v0 =  <U extends AnyUnitSystem>(_: LINEARVELOCITY<U>): number => _.scalar 
const v1 = (_: number): LINEARVELOCITY<US0> => LINEARVELOCITY(_, US0) 
const a0 = <U extends AnyUnitSystem>(_: LINEARACCELERATION<U>): number => _.scalar 
const a1 = (_: number): LINEARACCELERATION<US0> => LINEARACCELERATION(_, US0) 


export type UserProgram = {
    //readonly 'Parametro1': unknown
    readonly 'Posicao atual': ANY_LENGTH
    readonly 'Posicao de execucao': ANY_LENGTH
    readonly 'Posicao do inicio da rampa': ANY_LENGTH
    readonly 'Velocidade maxima': ANY_LINEARVELOCITY
    readonly 'Velocidade minima': ANY_LINEARVELOCITY

    readonly 'Incremento de Velocidade': ANY_LINEARVELOCITY
    readonly 'Velocidade atual (3 byte)': ANY_LENGTH
    readonly 'Numero da proxima mensagem a ser impressa': ANY_LENGTH
    readonly 'Velocidade limite superior, constante do sistema': ANY_LINEARVELOCITY
    readonly 'Velocidade limite inferior, constante do sistema': ANY_LINEARVELOCITY
    

    readonly 'Contador do tempo do sistema': ANY_LINEARVELOCITY
    readonly 'Novo divisor do contador para o comparador A': ANY_LENGTH
    readonly 'Contador da Largura do sinal de impressao': ANY_LENGTH
    readonly 'Posicao do zero index': ANY_LINEARVELOCITY
    readonly 'Velocidade limite inferior, constante do sistema': ANY_LINEARVELOCITY
    





}



export const memmap: Memmap<UserProgram> = {

    'Posicao atual': {
        startWord: 0x00,
        startBit: 0,
        bitSize: 16,
        toWave: _ => s0(_),
        fromWave: _ => s1(_), 
    },

    'Posicao de execucao': {
        startWord: 0x02,
        startBit: 0,
        bitSize: 16,
        toWave: _ => s0(_),
        fromWave: _ => s1(_), 
    },
 
    'Posicao do inicio da rampa': {
        startWord: 0x04,
        startBit: 0,
        bitSize: 16,
        toWave: _ => s0(_),
        fromWave: _ => s1(_), 
    },
    
    'Velocidade maxima': {
        startWord: 0x04,
        startBit: 0,
        bitSize: 16,
        toWave: _ => v0(_),
        fromWave: _ => v1(_),
    },

    'Velocidade minima': {
        startWord: 0x04,
        startBit: 0,
        bitSize: 16,
        toWave: _ => v0(_),
        fromWave: _ => v1(_),
    },

}
