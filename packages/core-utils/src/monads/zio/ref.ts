import { ZIO, ZIO_ } from "./zio";
import { Right } from "../either";

// inspired in Scala language, 'Ref' type of ZIO and Catz-Effect libraries: 
//      see: 1. https://zio.dev/docs/datatypes/datatypes_ref
//           2. https://github.com/typelevel/cats-effect/blob/master/core/shared/src/main/scala/cats/effect/concurrent/Ref.scala
//           3. https://github.com/zio/zio/blob/008c851ca46f627482ff63b9e4cbac6f9fe069a0/core/shared/src/main/scala/zio/Ref.scala

//  Ref[A] models a asynchronous mutable reference to a value of type A which cannot fail
//  Note that you can still simulate fail using an 'Either' in the A channel if necessary
//  Obeys Functors law but you can map ZIO instead of 'Ref' so it is ommited here for reduce verbosity in st
export type Ref<A> = {
    // Gets the current value
    readonly get: () => ZIO<any, void, A>
    // Sets to the given value.
    readonly set: (_:A) => ZIO<any, void, undefined>
    // runs function f atomically in the stored value
    readonly update: (f: (_:A) => A) => ZIO<any, void, undefined>   
    // Atomically updates the current value with the results of applying the given function, returning the previous value.
    readonly getAndUpdate: (f: (_:A) => A) => ZIO<any, void, A>   
    // Atomically updates the current value with the results of applying the given function, returning the updated value.
    readonly updateAndGet: (f: (_:A) => A) => ZIO<any, void, A>
}

export const Ref = <A>(getter: Ref<A>['get'], setter: Ref<A>['set']): Ref<A> => {

    const get: Ref<A>['get'] = () => {
        return ZIO_.succeed(undefined).fmap( () => getter() )
    }

    const set: Ref<A>['set'] = value => {
        return ZIO_.succeed(undefined).fmap( () => setter(value) )
    }

    const update: Ref<A>['update'] = f => 
        get()
            .map(f)
            .fmap( value => set(value) )

    
    const getAndUpdate: Ref<A>['getAndUpdate'] = f => {
        return ZIO( env => {
            const a = get().unsafeRun(undefined)
            // tslint:disable-next-line: no-expression-statement
            set( f(a) ).unsafeRun(undefined)
            return Right<void,A>(a)
        })
    }

    const updateAndGet: Ref<A>['updateAndGet'] = f => {
        return ZIO( env => { 
            const a = get().unsafeRun(undefined)
            const updatedA = f(a)
            // tslint:disable-next-line: no-expression-statement
            set( updatedA ).unsafeRun(undefined)
            return Right<void,A>(updatedA)
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

const Test = () => {

    // tslint:disable: no-var-keyword no-expression-statement
    var variable = 10

    const getter = () => { return ZIO_.effectTotal(() => variable) } 
    const setter = (value: number) => {    
        setTimeout(() =>{
            console.log(`*** Setando variabvel ***`)
            variable = value 
        }, 1000) 
        
        return ZIO_.succeed(undefined)
    }

    const n = Ref<number>( getter, setter )

    console.log(`criando efeito...`)

    //const showRef = (n: Ref<number>) => ZIO_.succeed(undefined).fmap( env => n.get().map( value => console.log(`o valor dentro é ${value}`) ) ) 
    //const resetRef = (n: Ref<number>) => ZIO_.succeed(undefined).fmap( () => n.updateAndGet(_ => 0).map( _ => console.log(`resetei, agora é ${_}`) ) )
    //const incrementRef = (n: Ref<number>) => ZIO_.succeed(undefined).fmap( () => n.updateAndGet(_ => _ + 1).map( _ => console.log(`incrementei, depois de incrementar ficou ${_}`) ) )
    const showRef = (n: Ref<number>) => n.get().map( value => console.log(`o valor dentro é ${value}`) )  
    const resetRef = (n: Ref<number>) => n.updateAndGet(_ => 0).map( _ => console.log(`resetei, agora é ${_}`) )
    const incrementRef = (n: Ref<number>) => n.updateAndGet(_ => _ + 1).map( _ => console.log(`incrementei, depois de incrementar ficou ${_}`) ) 
    
    // quero resetar e incrementar 2 vezes e ao termino imprimir na tela o resultado

    const show1 = showRef(n)
    const show2 = showRef(n)
    const reset = resetRef(n)
    const inc = incrementRef(n)

    //const r = reset.fmap( _ => inc).fmap( _ => inc).fmap( _ => showRef(n) )
/*
    const r = 
        reset
            .fmap( () => show )
            .fmap( () => inc )
            .fmap( () => show )
            */

    const r = 
        showRef(n)
        .fmap( () => resetRef(n))
        .fmap( () => inc)
        .fmap( () => inc)
        .fmap( () => showRef(n))
        .fmap( () => show2)


    console.log(`efeito criado!`)
    console.log(`executando efeito. Resultado:`)
    r.unsafeRun(undefined)

    const ms = 5000
    setTimeout( () => {
        console.log(`apos ${ms} minutos apos rodar efeito:`)
        console.log(`imprimindo imperativamente valor da variável neste exato momento`, variable)
    },ms)
  


}


//Test()