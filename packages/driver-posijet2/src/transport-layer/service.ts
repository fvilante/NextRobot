
import { TransactResult } from './transaction/TransactResult'
import { Reader } from '@nextrobot/core-utils'
import { Env } from './transaction/Env'
import { AnyDirecao } from './transaction/pacote-models/base-model/Direcao'
import { transact } from './transaction/transact'
import { PacoteDeTransmissao } from './transaction/pacote-models/PacoteDeTransmissao'


type WordAddress = number
type WordValue = number

type ServiceWork<D extends AnyDirecao> = Reader<Env, Promise<TransactResult<D>>>


export type Service = {

    readonly run: <D extends AnyDirecao>(w: ServiceWork<D>, env: Env) => Promise<TransactResult<D>>
    
    //lazy (pure) operations

    readonly Set16BitsValue:        (waddr: WordAddress, value: WordValue)      => ServiceWork<'Envio'>

    readonly Set16BitsBitmask:      (waddr: WordAddress, bitmask: WordValue)    => ServiceWork<'MascaraSetarBits'>

    readonly Reset16BitsBitmask:    (waddr: WordAddress, bitmask: WordValue)    => ServiceWork<'MascaraResetarBits'>

    readonly Get16BitsValue:        (waddr: WordAddress)                        => ServiceWork<'Solicitacao'>

}

//helpers
const runTransaction_Helper = <D extends AnyDirecao>(env: Env, pacote: PacoteDeTransmissao<D>) => transact(env.cmppAddress, pacote).run(env)
const makeErrorMsg = <E extends Error>(err: E) => `Erro no service Cmpp de transport-layer. Detalhe: ${err}`


// ----- implementations ------------

const run: Service['run'] = (work, env) => work.run(env)

const Set16BitsValue: Service['Set16BitsValue'] = (waddr, value) => Reader( env => { 

    const pacote = PacoteDeTransmissao('Envio', waddr, value)

    return new Promise( async (resolve, reject) => {
        try {
            resolve(await runTransaction_Helper(env, pacote))
        } catch (err) {
            reject(makeErrorMsg(err))
        }        
    } )
})

const Get16BitsValue: Service['Get16BitsValue'] = (waddr) => Reader( env => { 

    const pacote = PacoteDeTransmissao('Solicitacao', waddr, 0)

    return new Promise( async (resolve, reject) => {
        try {
            resolve(await runTransaction_Helper(env, pacote))
        } catch (err) {
            reject(makeErrorMsg(err))
        }        
    } )
})


const Set16BitsBitmask: Service['Set16BitsBitmask'] = (waddr, bitmask) => Reader( env => { 

    const pacote = PacoteDeTransmissao('MascaraSetarBits', waddr, bitmask)

    return new Promise( async (resolve, reject) => {
        try {
            resolve(await runTransaction_Helper(env, pacote))
        } catch (err) {
            reject(makeErrorMsg(err))
        }        
    } )
})


const Reset16BitsBitmask: Service['Reset16BitsBitmask'] = (waddr, bitmask) => Reader( env => { 

    const pacote = PacoteDeTransmissao('MascaraResetarBits', waddr, bitmask)

    return new Promise( async (resolve, reject) => {
        try {
            resolve(await runTransaction_Helper(env, pacote))
        } catch (err) {
            reject(makeErrorMsg(err))
        }        
    } )
})


export const GetService = ():Service => ({

    run,

    Set16BitsValue,

    Get16BitsValue,

    Set16BitsBitmask,

    Reset16BitsBitmask,

})