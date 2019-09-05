import { O, T } from "ts-toolbelt";


// data types

type TipoA = {
    readonly kind: 'A'
}
const TipoA = (): TipoA => ({ kind: 'A'})

type TipoB = {
    readonly kind: 'B'
}
const TipoB = (): TipoB => ({ kind: 'B'})

type TipoC = {
    readonly kind: 'C'
}
const TipoC = (): TipoC => ({ kind: 'C'})

type Tipo1 = TipoA | TipoB | TipoC


const Tipo1 = {
    TipoA,
    TipoB,
    TipoC,
}

type Tipo2 = () => number
const Tipo2 = (_:number):Tipo2 => () => _+1

// spec

type CMPP = {
    readonly 'Primeira Mensagem no retorno': Tipo1,
    readonly 'Primeira Mensagem no retorno2': Tipo2,
    readonly 'Primeira Mensagem no retorno3': 'juca' | 'test' | 'make', 
}

const Memmap: Memmap<CMPP> = {
    'Primeira Mensagem no retorno': {
        position: 12,
        toWave: unWaved => 10,
        fromWave: waved => Tipo1.TipoA()
    },
    'Primeira Mensagem no retorno2': {
        position: 12,
        toWave: unWaved => 10,
        fromWave: waved => Tipo2(waved)
    },
    'Primeira Mensagem no retorno3': {
        position: 12,
        toWave: unWaved => 10,
        fromWave: waved => 'make'
    } 
} 

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



type Memmap<T> = {
    readonly [K in keyof T]: {
        readonly caption?: string,
        readonly position: number,
        readonly toWave: (_: T[K]) => number,
        readonly fromWave: (_: number) => T[K], 
    }
}




