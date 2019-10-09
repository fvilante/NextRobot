import { Memmap, US0 } from '../core'
import { ANY_LENGTH, LENGTH, ANY_LINEARVELOCITY, AnyUnitSystem, LINEARVELOCITY, LINEARACCELERATION, ANY_LINEARACCELERATION, ANY_TIME, TIME } from '../kinetics/measure'
import { LinearAxisClassic } from '../../core-models/physical-arm'



const RAMINT = 0x60 // Endereco dos parametros de interrupcao
const RAMPRG = 0xA0 // Endereco dos parametros do programa


type LIGADO_DESLIGADO =  'Ligado' | 'Desligado'
type PULSES_PER_MOTOR_STEP = 400 | 200

/** Cast parameter value from user-space to cmpp-space and vice-versa */
const CASTING = {

    KINEMATICS: (e: LinearAxisClassic) => ({

        TIME: {
            unCast: <U extends AnyUnitSystem>(_: TIME<U>): number => _.scalar,
            cast:   (_: number): TIME<US0> => TIME(_, US0),
        },

        LENGTH: {
            unCast: <U extends AnyUnitSystem>(_: LENGTH<U>): number => _.scalar,
            cast:   (_: number): LENGTH<US0> => LENGTH(_, US0),
        },

        LINEARVELOCITY: {
            unCast: <U extends AnyUnitSystem>(_: LINEARVELOCITY<U>): number => _.scalar,
            cast:   (_: number): LINEARVELOCITY<US0> => LINEARVELOCITY(_, US0), 
        },

        LINEARACCELERATION: {
            unCast: <U extends AnyUnitSystem>(_: LINEARACCELERATION<U>): number => _.scalar,
            cast:   (_: number): LINEARACCELERATION<US0> => LINEARACCELERATION(_, US0),      
        },
    }),

    LIGADO_DESLIGADO: {
        unCast: (_: LIGADO_DESLIGADO): number => _ === 'Ligado' ? 1 : 0,
        cast:   (_: number): LIGADO_DESLIGADO => _ === 0 ? 'Desligado' : 'Ligado' // default 'ligado'
    },

    PULSES_PER_MOTOR_STEP: {
        unCast: (_: PULSES_PER_MOTOR_STEP): number => _ ,
        cast:   (_: number): PULSES_PER_MOTOR_STEP => _ === 200 ? 200 : 400 //default 400
    },

    NUMBER:  {
        unCast: (_: number): number => _,
        cast:   (_: number): number => _,
    },

    BOOLEAN:  {
        unCast: (_: boolean): number => _ === true  ?   1       :   0,
        cast:   (_: number): boolean => _ === 1     ?   true    :   false,
    },

}





export type UserProgram = {

    readonly 'Posicao inicial programada': ANY_LENGTH
    readonly 'Posicao final programada': ANY_LENGTH

    readonly 'Aceleracao de avanco programada': ANY_LINEARACCELERATION
    readonly 'Aceleracao de retorno programada': ANY_LINEARACCELERATION

    readonly 'Velocidade de avanco programada': ANY_LINEARVELOCITY
    readonly 'Velocidade de retorno programada': ANY_LINEARVELOCITY

    readonly 'Numero de mensagem no avanco': number
    readonly 'Numero de mensagem no retorno': number

    readonly 'posicao da primeira impressao no avanco': ANY_LENGTH
    readonly 'posicao da primeira impressao no retorno': ANY_LENGTH
    readonly 'Posicao da ultima mensagem no avanco': ANY_LENGTH
    readonly 'Posicao da ultima mensagem no retorno': ANY_LENGTH

    readonly 'Largura do sinal de impressao': ANY_LENGTH
    readonly 'Tempo para o start automatico': ANY_TIME
    readonly 'Tempo para o start externo': ANY_TIME

    readonly 'Cota de antecipacao do start entre eixos (pinelmatico)': ANY_LENGTH
    readonly 'Retardo para o start automatico passo a passo': ANY_TIME

    readonly 'Start automatico no avanco ligado':               LIGADO_DESLIGADO
    readonly 'Start automatico no retorno ligado':              LIGADO_DESLIGADO
    readonly 'Saida de start no avanco ligado':                 LIGADO_DESLIGADO
    readonly 'Saida de start no retorno ligado':                LIGADO_DESLIGADO
    readonly 'Start externo habilitado ??':                     LIGADO_DESLIGADO
    readonly 'Logica do start externo ??':                      LIGADO_DESLIGADO
    readonly 'Entrada de start entre eixo habilitado ??':       LIGADO_DESLIGADO
    readonly 'Start externo para referenciar habilitado ??':    LIGADO_DESLIGADO

    readonly 'Logica do sinal de impressao':                    LIGADO_DESLIGADO
    readonly 'Logica do sinal de reversao':                     LIGADO_DESLIGADO
    readonly 'Selecao de impressao via serial ligada':          LIGADO_DESLIGADO
    readonly 'Reversao de impressao via serial ligada':         LIGADO_DESLIGADO
    readonly 'Zero Index habilitado p/ protecao':               LIGADO_DESLIGADO
    readonly 'Zero Index habilitado p/ correcao':               LIGADO_DESLIGADO
    readonly 'Reducao do nivel de corrente em repouso':         LIGADO_DESLIGADO
    readonly 'Modo continuo/passo a passo':                     LIGADO_DESLIGADO

    readonly 'Retardo para o sinal de impressao': ANY_TIME

    readonly 'Divisor programado do taco': number

    readonly '(+/-) Tolerancia de Erro do zero index': ANY_LENGTH

    readonly 'Numero de pulsos por volta do motor': PULSES_PER_MOTOR_STEP

    readonly 'Valor programado da referencia': ANY_LENGTH //Duvida: Pod ser ANY_LENGTH ou tem que ser number ?
    readonly 'Aceleracao de referencia': ANY_LINEARACCELERATION
    readonly 'Velocidade de referencia': ANY_LINEARVELOCITY

    readonly 'Saida de start passo a passo ?':              LIGADO_DESLIGADO
    readonly 'Start automatico passo a passo':              LIGADO_DESLIGADO
    readonly 'Selecao de mensagem por multipla':            LIGADO_DESLIGADO
    readonly 'Selecao de mensagem por impresão':            LIGADO_DESLIGADO
    readonly 'Selecao de mensagem pela paralela':           LIGADO_DESLIGADO
    readonly 'Selecao de mensagem Decrementado no retorno': LIGADO_DESLIGADO

    readonly 'Divisor programado do motor': number


    //controle serial
    readonly 'Start serial': boolean
    readonly 'Stop serial': boolean
    readonly 'Pausa serial': boolean
    readonly 'Modo manual serial': boolean
    readonly 'Teste de impressao serial': boolean
    readonly 'Usado na bahia sul, descrito na rotina LEITOK': boolean
    readonly 'Grava eprom2': boolean
    readonly 'Modo passo a passo': boolean
    readonly 'Força o proximo passo': boolean
    readonly 'Ignora o sensor do pistão': boolean
    readonly 'Ignora o sinal do vacuo': boolean
    readonly 'Ignora a proteção da porta': boolean
    readonly 'Start automatico': boolean

    
}


export const memmapFactory = (e: LinearAxisClassic): Memmap<UserProgram> => ({
        

    'Posicao inicial programada': {
        startWord: 0x00 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LENGTH,
    },
    'Posicao final programada': {
        startWord: 0x02 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LENGTH,
    },
    'Aceleracao de avanco programada': {
        startWord: 0x04 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LINEARACCELERATION,
    },
    'Aceleracao de retorno programada': {
        startWord: 0x06 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LINEARACCELERATION,
    },
    'Velocidade de avanco programada': {
        startWord: 0x08 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LINEARVELOCITY,
    },
    'Velocidade de retorno programada': {
        startWord: 0x0A + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LINEARVELOCITY,
    },
    'Numero de mensagem no avanco': {
        startWord: 0x0C + RAMPRG,
        startBit: 0,
        bitSize: 8,
        caster: CASTING.NUMBER,
    },
    'Numero de mensagem no retorno': {
        startWord: 0x0D + RAMPRG,
        startBit: 0,
        bitSize: 8,
        caster: CASTING.NUMBER,
    },
    'posicao da primeira impressao no avanco': {
        startWord: 0x0E + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LENGTH,
    },
    'posicao da primeira impressao no retorno': {
        startWord: 0x10 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LENGTH,
    },
    'Posicao da ultima mensagem no avanco': {
        startWord: 0x12 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LENGTH,
    },
    'Posicao da ultima mensagem no retorno': {
        startWord: 0x14 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LENGTH,
    },
    'Largura do sinal de impressao': {
        startWord: 0x16 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LENGTH,
    },
    'Tempo para o start automatico': {
        startWord: 0x18 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).TIME,
    },
    'Tempo para o start externo': {
        startWord: 0x1A + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).TIME,
    },
    'Cota de antecipacao do start entre eixos (pinelmatico)': {
        startWord: 0x1C + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LENGTH,
    },
    'Retardo para o start automatico passo a passo': {
        startWord: 0x1E + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).TIME,
    },
    'Start automatico no avanco ligado': {
        startWord: 0x20 + RAMPRG,
        startBit: 0,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Start automatico no retorno ligado': {
        startWord: 0x20 + RAMPRG,
        startBit: 1,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Saida de start no avanco ligado': {
        startWord: 0x20 + RAMPRG,
        startBit: 2,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Saida de start no retorno ligado': {
        startWord: 0x20 + RAMPRG,
        startBit: 3,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Start externo habilitado ??': {
        startWord: 0x20 + RAMPRG,
        startBit: 4,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Logica do start externo ??': {
        startWord: 0x20 + RAMPRG,
        startBit: 5,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Entrada de start entre eixo habilitado ??': {
        startWord: 0x20 + RAMPRG,
        startBit: 6,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Start externo para referenciar habilitado ??': {
        startWord: 0x20 + RAMPRG,
        startBit: 7,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Logica do sinal de impressao': {
        startWord: 0x21 + RAMPRG,
        startBit: 0,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Logica do sinal de reversao': {
        startWord: 0x21 + RAMPRG,
        startBit: 1,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Selecao de impressao via serial ligada': {
        startWord: 0x21 + RAMPRG,
        startBit: 2,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Reversao de impressao via serial ligada': {
        startWord: 0x21 + RAMPRG,
        startBit: 3,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Zero Index habilitado p/ protecao': {
        startWord: 0x21 + RAMPRG,
        startBit: 4,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Zero Index habilitado p/ correcao': {
        startWord: 0x21 + RAMPRG,
        startBit: 5,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Reducao do nivel de corrente em repouso': {
        startWord: 0x21 + RAMPRG,
        startBit: 6,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Modo continuo/passo a passo': {
        startWord: 0x21 + RAMPRG,
        startBit: 7,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Retardo para o sinal de impressao': {
        startWord: 0x22 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).TIME,
    },
    'Divisor programado do taco': {
        startWord: 0x24 + RAMPRG,
        startBit: 0,
        bitSize: 8,
        caster: CASTING.NUMBER,
    },
    '(+/-) Tolerancia de Erro do zero index': {
        startWord: 0x26 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LENGTH,
    },
    'Numero de pulsos por volta do motor': {
        startWord: 0x28 + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.PULSES_PER_MOTOR_STEP,
    },
    'Valor programado da referencia': {
        startWord: 0x2A + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LENGTH,
    },
    'Aceleracao de referencia': {
        startWord: 0x2C + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LINEARACCELERATION,
    },
    'Velocidade de referencia': {
        startWord: 0x2E + RAMPRG,
        startBit: 0,
        bitSize: 16,
        caster: CASTING.KINEMATICS(e).LINEARVELOCITY,
    },
    'Saida de start passo a passo ?': {
        startWord: 0x30 + RAMPRG,
        startBit: 0,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Start automatico passo a passo': {
        startWord: 0x30 + RAMPRG,
        startBit: 1,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Selecao de mensagem por multipla': {
        startWord: 0x30 + RAMPRG,
        startBit: 2,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Selecao de mensagem por impresão': {
        startWord: 0x30 + RAMPRG,
        startBit: 3,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Selecao de mensagem pela paralela': {
        startWord: 0x30 + RAMPRG,
        startBit: 4,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Selecao de mensagem Decrementado no retorno': {
        startWord: 0x30 + RAMPRG,
        startBit: 5,
        bitSize: 1,
        caster: CASTING.LIGADO_DESLIGADO,
    },
    'Divisor programado do motor': {
        startWord: 0x31 + RAMPRG,
        startBit: 0,
        bitSize: 8,
        caster: CASTING.NUMBER,
    },
    'Start serial': {
        startWord: 0x32 + RAMPRG,
        startBit: 0,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Stop serial': {
        startWord: 0x32 + RAMPRG,
        startBit: 1,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Pausa serial': {
        startWord: 0x32 + RAMPRG,
        startBit: 2,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Modo manual serial': {
        startWord: 0x32 + RAMPRG,
        startBit: 3,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Teste de impressao serial': {
        startWord: 0x32 + RAMPRG,
        startBit: 4,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Usado na bahia sul, descrito na rotina LEITOK': {
        startWord: 0x32 + RAMPRG,
        startBit: 5,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Grava eprom2': {
        startWord: 0x32 + RAMPRG,
        startBit: 6,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Modo passo a passo': {
        startWord: 0x33 + RAMPRG,
        startBit: 0,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Força o proximo passo': {
        startWord: 0x33 + RAMPRG,
        startBit: 1,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Ignora o sensor do pistão': {
        startWord: 0x33 + RAMPRG,
        startBit: 2,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Ignora o sinal do vacuo': {
        startWord: 0x33 + RAMPRG,
        startBit: 3,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Ignora a proteção da porta': {
        startWord: 0x33 + RAMPRG,
        startBit: 4,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },
    'Start automatico': {
        startWord: 0x33 + RAMPRG,
        startBit: 5,
        bitSize: 1,
        caster: CASTING.BOOLEAN,
    },

})

