import { Either, Left, Right } from './either'
import { B, A } from 'ts-toolbelt'
import { IO } from './IO'

// --------------- UUID generator -----------------------------------------------------------

/** Impure function */
const __generateUUID_Inpure = function*():Generator<number> {
    // tslint:disable-next-line: no-let
    let UUID: number = 0
    while (true) {
        yield UUID+1
    }
}


const __generateUUID = ():number => {

    const iter = __generateUUID_Inpure()
    const curr = iter.next()
    // tslint:disable-next-line: no-if-statement
    if (curr.done) 
        throw new Error(`Gerador de UUIDs falhou. Erro fatal.`); //should never happens!
    else
        return curr.value 

}

type UUID = { readonly kind: 'UUID', readonly uuid: number}
const UUID = ():UUID => ({ kind: 'UUID', uuid: __generateUUID() })



// --------------- SetTimeout ----------------------------------------------------------------

// base 
type TimeoutFn = () => void
type TimerId = { readonly kind: 'TimerId', readonly uuid: UUID }

// registry
type TimeOutRegistry = { readonly uuid: UUID, readonly timeoutFn: TimeoutFn }
const timeoutRegistry = new Set<TimeOutRegistry>()
    
// function
type SetTimeout = (fn: TimeoutFn, miliseconds: number) => IO<TimerId>
const SetTimeout = (fn:TimeoutFn, miliseconds:number): IO<TimerId> => IO( () => {


    const uuid = UUID()
    const newRegistry = {uuid: UUID(), timeoutFn: fn} 

    // tslint:disable-next-line: no-expression-statement
    timeoutRegistry.add( newRegistry )

    return {kind: 'TimerId', uuid}

}) 




// ------------------------ FUTURE ----------------------------------------------




export type __Future<A,B,E> = {

    readonly kind: '__Future'

    readonly run: () => Either<E,B>

    readonly map: <C>(f: (_:B) => C) => __Future<A,C,E>
    

}

type Resolver<A> = (resolved:A) => void
type Rejecter<E> = (rejected:E) => void

type __FutureCallback<A,E> = (resolve: Resolver<A>, reject: Rejecter<E>) => void

type __FutureConstructor = <A,B,E>(callback: __FutureCallback<A,E>) => __Future<A,B,E>



/** Helper - Special constructor */
const __Future = <A,B,E>(callback: FutureCallback<A,E>, __map: (_:A) => B): __Future<A,B,E> => {

    
    const map = <C>(f: (_:B) => C): __Future<A,C,E> => {
        const r = __Future(callback, (_:A) => {
            const ab = __map
            const bc = f
            const ac = (_:A) => bc(ab(_))
            return ac(_)
        })    
        return r 
    }

    
    const resolver: Resolver<A> = value => { 

        // tslint:disable-next-line: no-expression-statement
        __map(value)
    
    }

    const rejecter: Rejecter<E> = error => {
        
    }

    const run = (): void => {

        callback(resolver, rejecter)

    }

    return { 
        kind: 'Future',
        run,
        map,
    }


}



export type Future<A,E> = {

    readonly kind: 'Future'

    readonly run: () => Either<E,A>

    /** maps right side of the either */
    readonly map: <B>(f: (_:A) => B) => Future<B,E>
    

}

type FutureConstructor = <A,E>(callback: FutureCallback<A,E>) => Future<A,E>

type FutureCallback<A,E> = (resolve: Resolver<A>, reject: Rejecter<E>) => void


export const Future: FutureConstructor = <A,E>(callback: FutureCallback<A,E>): Future<A,E> => {
    


}




// ------------------

// Informal Test


const Test = () => {

    console.log('1) Vou criar o future agora:')

    const futureMaker = (content: number): Future<number,'Erro'> => Future( (resolve, reject) => { 

        console.log(`************************************************`)
        console.log('4) Oi tou executando o future')

        console.log(`4.5) DENTRO DO FUTURE TEM -> ${content}`)

        // tslint:disable-next-line: no-if-statement
        if (content===10) 
            reject('Erro')
        else
            resolve(content)

        console.log(`5) Tou dentro, acabo de resolver com ${content}`)
        console.log(`************************************************`)

    })

    const futures = [1,2,3,4,5,6,10,30,50].map(futureMaker)

    console.log('2) criei o future:')

    console.log(futures)

    console.log('3) Abaixo vou rodar o future:')

    const result = futures.map( f => f.run().match<number | 'Erro'>( err => err, n => n) )

    console.log('6) aqui já devria ter rodado o future:')

    console.log(`7) o resultado final da rodada é: ${result}`)


}

const Test2 = () => {

    //const _a = new Promise( (resolve, reject) => resolve(10) )
    //const _b = _a.then( value => String(value))


    const a = Future( resolve => { console.log(`Primeiro Future rodando...`); resolve(1); } )
    const b = a.map( value => { console.log(`Segundo Future rodando, com valor recebido de: ${value} ...`); return String(value) } )
    
    console.log(`PRIMEIRA *************`,a )
    console.log(`variave a:`,a )
    console.log(`variave b:`, b)
    console.log(`rodando a:`, a.run())
    console.log(`rodando b:`, b.run())




}

Test2()


