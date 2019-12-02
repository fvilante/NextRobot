import { ZIO, ZIO_ } from "./zio";
import { Future, Future_ } from "../future";

// inspired in Scala language, 'Ref' type of ZIO and Catz-Effect libraries: 
//      see: 1. https://zio.dev/docs/datatypes/datatypes_ref
//           2. https://github.com/typelevel/cats-effect/blob/master/core/shared/src/main/scala/cats/effect/concurrent/Ref.scala
//           3. https://github.com/zio/zio/blob/008c851ca46f627482ff63b9e4cbac6f9fe069a0/core/shared/src/main/scala/zio/Ref.scala

//  Ref[A] models a asynchronous mutable reference to a value of type A which cannot fail
//  Note that you can still simulate fail using an 'Either' in the A channel if necessary
//  Obeys Functors law but you can map ZIO instead of 'Ref' so it is ommited here for reduce verbosity in st
export type Ref<R,E,A> = {
    // Gets the current value
    readonly get: () => ZIO<R, E, A>
    // Sets to the given value.
    readonly set: (_:A) => ZIO<R, E, undefined>
    // runs function f atomically in the stored value
    readonly update: (f: (_:A) => A) => ZIO<R, E, undefined>   
    // Atomically updates the current value with the results of applying the given function, returning the previous value.
    readonly getAndUpdate: (f: (_:A) => A) => ZIO<R, E, A>   
    // Atomically updates the current value with the results of applying the given function, returning the updated value.
    readonly updateAndGet: (f: (_:A) => A) => ZIO<R, E, A>
}

export const Ref = <R,E,A>(getter: Ref<R,E,A>['get'], setter: Ref<R,E,A>['set']): Ref<R,E,A> => {


    const get: Ref<R,E,A>['get'] = () => {
        return getter()
    }

    const set: Ref<R,E,A>['set'] = value => {
        return setter(value)
    }

    const update: Ref<R,E,A>['update'] = f => {
        return get().map(f).fmap( newValue => set(newValue) )   
    }
        
    const getAndUpdate: Ref<R,E,A>['getAndUpdate'] = f => {
        return get().fmap( a => {
            return set(f(a)).map( () => a)
        })
    }

    const updateAndGet: Ref<R,E,A>['updateAndGet'] = f => {
        return get().fmap( a => {
            const b = f(a)
            return set(b).map( () => b)
        })
    }

    return {
        get,
        set,
        update,
        getAndUpdate,
        updateAndGet,
    }

}


// static part



// informal test

const Test = async () => {

    type Logger = (_:string) => void
    const logger: Logger = _ => console.log(_)

    // tslint:disable: no-var-keyword no-expression-statement
    var variable = 10

    const getter: () => ZIO<Logger, void, number> = () => ZIO( log => {
        log(`*** Aguarde iniciando leitura da variavel...***`)
        return Future( ok => {
                setTimeout(() => {
                    log(`*** Variavel lida é ${variable} ***`)
                    ok(variable)
                }, 3000)  
        })  
    })

    const setter: (_: number) => ZIO<Logger, void, undefined> = value => ZIO( log => {
        log( `*** Setando variavel, aguarde... ***`)
        return Future( ok => {
            setTimeout(() => {
                log(`*** Variavel Setada ***`)
                variable = value 
                ok(undefined)
            }, 5000)  
        })
    })
           
    const n = Ref( getter, setter )

    console.log(`criando efeito...`)

    const e = n
        .updateAndGet( val => val+2 )
        .map( newVal => `valor depois da atualização é: ${newVal}`)
  
    const e2 = 
        e.fmap( s1 => 
        e.map(  s2 => 
            [s1,s2] as const)
        )

    console.log(`rodando efeito...`)

    const r = await e2.unsafeRun(s => logger(`#AMBIENTE_LOGING: ${s}`)) as readonly [string, string]

    console.log(`1) termino da PRIMEIRA execucao do efeito. Resultado do efeito: " ${r[0]} "`)
    console.log(`2) termino da SEGUNDA execucao do efeito. Resultado do efeito: " ${r[1]} "`)

    

}


Test()