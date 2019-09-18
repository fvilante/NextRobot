// types

import {
    TimeConstructor as time,
    AnyTime as Time,

    TranslationConstructor as space,
    AnySpace as Space,

    VelocityConstructor as velocity,
    AnyVelocity as Velocity,

    AccelerationConstructor as acceleration,
    AnyAcceleration as Acceleration,

} from './kinetics/core-kinematic-types'





// def

type Memmap<T> = {
    readonly [ParamName in keyof T]: {

        // memory region
        readonly startWord: number // word onde o parametro começa
        readonly startBit: number // bit onde o parametro começa a partir da startWord (0 é igual startWord)
        readonly bitSize: number // tamanho do dado em bits

        // description
        readonly helpMsg?: string //texto descritivo do parametro

        // memory class
        // todo: implement bellow
        readonly memoryType: 'volatile' | 'stable'
        readonly accessType: 'read-only' | 'read-write' | 'write-only'  
        
        // conversor
        readonly toWave: (_: T[ParamName]) => number,
        readonly fromWave: (_: number) => T[ParamName], 

    }
}


// spec

type CMPP = {
    readonly 'Posicao Inicial': Space
    readonly 'Posicao Final': Space
    readonly 'Velocidade de avanco': Velocity
    readonly 'Velocidade de retorno': Velocity
    readonly 'Aceleracao de avanco': Acceleration
    readonly 'Aceleracao de retorno': Acceleration

    readonly 'Primeira Mensagem no avanco': number,
    readonly 'Primeira Mensagem no retorno': number,
    readonly 'Modo de trabalho do eixo': 'continuo' | 'passo-a-passo' | 'expresssw', 
}





// memmap def

const Memmap: Memmap<CMPP> = {
    'Posicao Inicial': {
        startWord: 0x60,
        startBit: 0,
        bitSize: 16,
        helpMsg: '',
        memoryType: 'stable',
        accessType: 'read-write',
        toWave: _ => _.scalar,
        fromWave: _ => space.milimeter(_), 
    },

    'Posicao Final': {
        startWord: 0x61,
        startBit: 0,
        bitSize: 16,
        helpMsg: '',
        memoryType: 'stable',
        accessType: 'read-write',
        toWave: _ => _.scalar,
        fromWave: _ => space.milimeter(_), 
    },


} 

/*
type __Parameter<T> = {
    [K in keyof T]: {
        readonly name: K
        readonly value: T[K] 
    }
}

type Parameter<T> = __Parameter<T>[keyof T]


const p2: readonly Parameter<CMPP>[] = [
    { name: 'Primeira Mensagem no retorno3', value: 'make' },
    { name: 'Primeira Mensagem no retorno2', value: Tipo2(10)},

]


const F = <T>(p: Parameter<T>, m: Memmap<T>) => {

    type K = Memmap<T>[keyof T]

    const name = p.name
    const value = p.value

    const memmap: K = m[name]

    const fromWave = memmap.fromWave

    const a = fromWave



}




*/