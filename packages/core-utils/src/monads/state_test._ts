import { __ } from '../message/message'
import type from 'ramda/es/type'
import { S } from 'ts-toolbelt'
import { isArrayEqual } from '../type-utils/isEqual'
import { Maybe, Nothing, Just } from './maybe'

type Byte = number

/** receive one byte, one by one, and check if it is a ESC,  
 * if it is ESC return a ESC_Signal message with the subsequent byte else return Data_Signal*/ 


type StatefulResult<R> = readonly [State, R]

//todo: undefined here maybe implementation specific. Eventually it would not be enforced in a generic case. Check if this undefined can be removed/abstracted
type StetefulFunction<S,A> = (state: S) => StatefulResult<A> 


// -----------  Configuration ------------------------

type Config = {
    readonly ESCSymbol: readonly Byte[]
    readonly ESCIdSymbol: readonly Byte[]
    readonly CMDLength: number
    readonly CMDCallbackList: {
        [CMD in number]: () => void
    } 
}





// -----------  Messages ------------------------

type ESC = __<'ESC', readonly Byte[]>
const ESC = (payload: readonly Byte[]):ESC => Message('ESC', payload)

type DATA = __<'DATA', readonly Byte[]>
const DATA = (payload: readonly Byte[]): DATA => Message('DATA', payload)

type Signal = ESC | DATA | {readonly kind: `Command not found`} | {readonly kind: `Processing` }



// -----------  state ------------------------

type Steps = 'waiting_esc' | 'esc_received_collecting_command' | 'invalid_command' | 'valid_command' | 'reseting'

type State = {
    readonly currentStep: Steps
    readonly processingBuffer: readonly Byte[]
}

const InitialState: State = {
    currentStep: 'waiting_esc',
    processingBuffer: []
}

// -----------  machine state transitions ------------------------


const executeOnlyIfCurrentStepIsSpecifically = <A>(step: Steps, fn: StetefulFunction<State, A | undefined>): StetefulFunction<State, A | undefined> => s => 
    s.currentStep !== step ? [s, undefined] as const: fn(s)

const putOneByteIntoBuffer = (b: Byte): StetefulFunction<State, undefined> => s => [ {...s, processingBuffer: [...s.processingBuffer, b] }, undefined ]

// todo: statically assures that this function is called 'byte by byte' 
const isBufferEqualTo = (data: readonly Byte[]): StetefulFunction<State, Maybe<boolean>> => s => {
    const a = data
    const b = s.processingBuffer
    const canCompare = b.length === a.length
    const r = canCompare ? Just( isArrayEqual(a,b) ) : Nothing<boolean>()
    return [s,r]
}

const getBufferLength = (): StetefulFunction<State, number> => s => [s, s.processingBuffer.length]

const getBuffer = (): StetefulFunction<State, readonly Byte[]> => s => [s, s.processingBuffer]

const resetBuffer = (): StetefulFunction<State, readonly undefined> => s => [{...s, processingBuffer: []}, undefined]

const hasFoundESC = (config: Config):StetefulFunction<State, Maybe<boolean>> => s => { 
    const esc = config.ESCSymbol
    const [_, a] = isBufferEqualTo(esc)(s)
    return [s, a]   
} 


const isESC = (config: Config):StetefulFunction<State, Maybe<boolean>> => s => isBufferEqualTo(config.ESCSymbol)(s)
const isESCId = (config: Config):StetefulFunction<State, Maybe<boolean>> => s => isBufferEqualTo(config.ESCIdSymbol)(s)

// todo: statically assures that this function is called 'byte by byte' 
const getCommand = (config: Config):StetefulFunction<State, Maybe<readonly Byte[]>> => s => {
    const commandExpectedLength = config.CMDLength
    const [ , bufferLength] = getBufferLength()(s)
    const r = (bufferLength < commandExpectedLength)
        ? Nothing<readonly Byte[]>()
        : Just(getBuffer()(s)[1])
    return [s, r]
}

const ifTruePopBuffer = (condition1: Steps, andCondition2: () => boolean): StetefulFunction<State, Maybe<readonly Byte[]>> => s => {
    // tslint:disable-next-line: no-expression-statement  no-if-statement
    const isTrue = condition1 && andCondition2() 
    const buffer = () => getBuffer()(s)[1]
    const just = () =>  [s, Just( buffer() ) ] as const
    const nothing = () => [s, Nothing<readonly Byte[]>()] as const
    const r = isTrue 
        ? just()          
        : nothing()
    return r


const getSignal = (config:Config):StetefulFunction<State, Signal> => s0 => {
    const [s1, a] = ifCurrentStepIsNotInitiatedInitializeIt(s0)
    const [s2, maybeESC] = getESC

}


const processByte = (config: Config) => (byte: Byte):StetefulFunction<State, undefined> => s => {

    const [s1,] = putOneByteIntoBuffer(byte)(s)
    const [s2, hasEsc] = hasFoundESC(config)(s1)
    const [s3, ESC ] = [s2, hasEsc === 'Yes' ? getBuffer()(s2)[1] : undefined]
    const [s4, ]

}


//

type Transition<From extends Steps, To extends Steps> = (from: From, to: To) => (b: Byte) => StetefulFunction<State, Signal>

type    WaitingEsc                      =   Transition<'waiting_esc',   'waiting_esc'>
type    EscReceivedBeginWaitingCommand  =   Transition<'waiting_esc',   'waiting_cmd'>
type    InvalidCommand                  =   Transition<'waiting_cmd',   'InvalidCommand'>
type    Reset                           =   Transition<'waiting_cmd'   , 'waiting_esc'> 

const WaitingEsc: WaitingEsc = (from:'waiting_esc', to:'waiting_esc') => byte => s => {

    const [s1,] = executeOnlyIfCurrentStepIsSpecifically( 'waiting_esc', putOneByteIntoBuffer(byte))(s)
    const [s2,] = 
}


// -----------  processor ------------------------

const IdentifyCommandOrData = (b: Byte, s0: State): StatefulResult<Signal> => {

    const [s1,a] = ifCurrentStepIsNotInitiatedInitializeIt(s0)

    const [s2,b] = ifByteIsCerta
                            

}

const ifCurrentStepIsNotInitiatedInitializeIt = (s: State): StatefulResult<void> => {
    const newStep:State['currentStep'] = s.currentStep === 'not_initiated' ? 'waiting_esc' : s.currentStep
    return [{ ...s, currentStep: newStep }, undefined]
}
    