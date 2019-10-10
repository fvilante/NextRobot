
import { TransactResult, AnyTransactResult } from './transaction/TransactResult'
import { Reader, range, rangeSync, foldLeftArray } from '@nextrobot/core-utils'
import { Env } from './transaction/Env'
import { AnyDirecao } from './transaction/pacote-models/base-model/Direcao'
import { transact } from './transaction/transact'
import { PacoteDeTransmissao } from './transaction/pacote-models/PacoteDeTransmissao'
import { serialPortOpenner_PC } from '@nextrobot/serialport-manager'
import { CmppAddress } from './transaction/CmppAddress'
import { generatorToList } from '@nextrobot/core-utils/lib/Generators/number-generator-sync'


/** general use callback to inform intermediate data of loading progress  */
type LoadBarCallback = (percentage:number) => void


type WordAddress = number
type WordValue = number

type ServiceWork<D extends AnyDirecao> = Reader<Env, Promise<TransactResult<D>>>


export type TransportService = {

    readonly run: <D extends AnyDirecao, T extends TransactResult<D>>(w: readonly ServiceWork<D>[], env: Env,  loading?: LoadBarCallback) => Promise<readonly TransactResult<D>[]>
    
    //lazy (pure) operations

    readonly Set16BitsValue:        (waddr: WordAddress, value: WordValue)      => ServiceWork<'Envio'>

    readonly Set16BitsBitmask:      (waddr: WordAddress, bitmask: WordValue)    => ServiceWork<'MascaraSetarBits'>

    readonly Reset16BitsBitmask:    (waddr: WordAddress, bitmask: WordValue)    => ServiceWork<'MascaraResetarBits'>

    readonly Get16BitsValue:        (waddr: WordAddress)                        => ServiceWork<'Solicitacao'>

}


// =============== implementations ==================================================================

//helpers
const runTransaction_Helper = <D extends AnyDirecao>(env: Env, pacote: PacoteDeTransmissao<D>) => transact(pacote).run(env)
const makeErrorMsg = <E extends Error>(err: E) => `Erro no service Cmpp de transport-layer. Detalhe: ${err}`


const run: TransportService['run']  = async <D extends AnyDirecao>(works: readonly ServiceWork<D>[], env: Env, loading?: LoadBarCallback): Promise<readonly TransactResult<D>[]> => {

    // tslint:disable: no-let no-expression-statement no-if-statement
    let result: TransactResult<D>[] = []

    let count: number = works.length

    for (const work of works) {

        // run
        const r = await work.run(env)
        result = [...result, r]

        // inform
        if (loading) { 
            const concluded_percentage = Math.round((((count-works.length)*(-1))/works.length)*100)
            loading( concluded_percentage)
        }
        count = count - 1
    }

    return result
}

const Set16BitsValue: TransportService['Set16BitsValue'] = (waddr, value) => Reader( env => { 

    const pacote = PacoteDeTransmissao('Envio', waddr, value)

    return new Promise( async (resolve, reject) => {
        try {
            resolve(await runTransaction_Helper(env, pacote))
        } catch (err) {
            reject(makeErrorMsg(err))
        }        
    } )
})

const Get16BitsValue: TransportService['Get16BitsValue'] = (waddr) => Reader( env => { 

    const pacote = PacoteDeTransmissao('Solicitacao', waddr, 0)

    return new Promise( async (resolve, reject) => {
        try {
            resolve(await runTransaction_Helper(env, pacote))
        } catch (err) {
            reject(makeErrorMsg(err))
        }        
    } )
})


const Set16BitsBitmask: TransportService['Set16BitsBitmask'] = (waddr, bitmask) => Reader( env => { 

    const pacote = PacoteDeTransmissao('MascaraSetarBits', waddr, bitmask)

    return new Promise( async (resolve, reject) => {
        try {
            resolve(await runTransaction_Helper(env, pacote))
        } catch (err) {
            reject(makeErrorMsg(err))
        }        
    } )
})


const Reset16BitsBitmask: TransportService['Reset16BitsBitmask'] = (waddr, bitmask) => Reader( env => { 

    const pacote = PacoteDeTransmissao('MascaraResetarBits', waddr, bitmask)

    return new Promise( async (resolve, reject) => {
        try {
            resolve(await runTransaction_Helper(env, pacote))
        } catch (err) {
            reject(makeErrorMsg(err))
        }        
    } )
})


export const GetTransportService = ():TransportService => ({

    run,

    Set16BitsValue,

    Get16BitsValue,

    Set16BitsBitmask,

    Reset16BitsBitmask,

})



// -------------- informal test -------------------

const service = GetTransportService()

const env: Env = {
    portOpener: serialPortOpenner_PC,
    cmppAddress: CmppAddress({baudRate: 9600, channel: 0, portName: 'COM6'})
}

const Test1 = async () => {

    //send just of transacion

    const e1 = service.Get16BitsValue(0x70)

    const a = e1.run(env)

    console.log(await a) //ok

}


const Test2 = async () => {

    //little batch of transacions

    const e1 = service.Get16BitsValue(0x70)
    const e2 = service.Set16BitsValue(0x70, 10)
    const e3 = service.Get16BitsValue(0x70)

    const r1 = await service.run([e1], env)
    const r2 = await service.run([e2], env)
    const r3 = await service.run([e3], env)
        

    console.log(r1, r2, r3)

}

const Test3 = async () => {

    //big batch of transacions

    const addrs = foldLeftArray( generatorToList(rangeSync(0,0xff)), [] as number[], (acc, cur) => {
        const black_list_addresses:number[] = [58,217,224,231] //[58, 217, 224, 231]
        return black_list_addresses.includes(cur) ? [...acc] : [...acc, cur]
    })

    const works = addrs.map( addr => service.Get16BitsValue(addr))

    const r = await service.run(works, env, porcentagem => console.log(`porcentagem ${porcentagem}%`))

    console.log(`Resultdo: `)
    const b = r.map( x => console.log(x) )

}


// tslint:disable-next-line: no-expression-statement
Test3()