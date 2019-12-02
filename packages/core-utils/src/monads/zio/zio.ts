import { Either, Left, Right, Either_ } from "../either"
import { Maybe, Nothing, Just } from "../maybe"
import { Future, Future_ } from "../future"
import { Try } from "../try"
import { Result } from "../result"

// inspired in scala zio library
// see: https://zio.dev/
// see: https://github.com/ghostdogpr/zio-cheatsheet

// SCALA -> TypeScript conventions I used:
//      1. Nothing -> void      --> for types that cannot been created
//      2. Unit -> undefined    --> for empty types that can be created but does mean nothing
//      3. Any -> any           --> for any particuar type that exists
//      Note: I'm not using TS 'null' type in any case. 



export type ZIO<R, E, A> = {
    readonly kind: 'ZIO'

    readonly unsafeRun: (_:R) => Promise< A | E > //todo: Should I benefit from use a way to extract void if A or/and E are void ?
    readonly unsafeRunResult: (_:R) => Promise<Result<E,A>>
    readonly unsafeRunMaybe: (_:R) => Promise<Maybe<A>>
    readonly unsafeRunAOrElse: (_default: A) => (_:R) => Promise<A>
    readonly unsafeRunFuture: (_:R) => Future<E,A> //ATTENTION: This execution is unsafe! Because it runs the ZIO to next step

    readonly map: <B>(f: (_:A) => B) => ZIO<R,E,B>
    readonly bimap: <E1,B>(errFn: (_: E) => E1, valueFn: (_: A) => B) => ZIO<R,E1,B> 
    readonly fmap: <B>(f: (_:A) => ZIO<R,E,B>) => ZIO<R,E,B>
    readonly mapError: <E0>(f: (_:E) => E0) => ZIO<R,E0,A>
    readonly fold: <B>(errFn: (_:E) => B, valueFn: (_:A) => B) => ZIO<R,void,B> 
    readonly matchM: <B>(errFnM: (_: E) => ZIO<R,E,B>, valueFnM: (_: A) => ZIO<R,E,B>) => ZIO<R,E,B>

    readonly provide: (enviroment: R) => ZIO<any,E,A>
    readonly provideM: (enviroment: ZIO<any, E, R>) => ZIO<any, E, A> //todo: In Scala Zio E can be changed to a sub-type of E. I dont understand the use-case so I'm ommiting until further insight
    readonly contramap: <R0>(f: (_:R0) => R) => ZIO<R0,E,A>

    readonly enviroment: () => ZIO<R,void,R> //todo: see what name zio uses to this structure

    /**
     * In the callback passed to catchAll, you may return an effect with a different error type (or perhaps Nothing), which will be reflected in the type of effect returned by catchAll.
     */
    readonly catchAll: (f: (_:E) => ZIO<R,E,A>) => ZIO<R,E,A> 
    readonly pullout: () => ZIO<R, void, Future<E,A>> //see also 'absolve' which is the inverse operation //todo: I invented this name (because otherwise call it either (official zio) or future is implementation dependent). Is there a better name ?

}

type SyncEffect<R,E,A> = (_:R) => Result<E,A>
type AsyncEffect<R,E,A> = (_:R) => Future<E,A>


const __ZIO = <R,E,A>(effect: SyncEffect<R,E,A> | AsyncEffect<R,E,A>, isAsync: boolean) => {

}

// Todo: Use Async for all calculations may not be very performant.  
//       When possible optimize to use sync calc every when possible.
// Note: For now you may use 'ZIO_.fromSync' constructor if you want to 
//       take advantage of future optimizations 
//       realated to sync Calls.
export const ZIO = <R,E,A>(effect: (_:R) => Future<E,A>): ZIO<R,E,A> => {

    const unsafeRun: ZIO<R,E,A>['unsafeRun'] = enviroment => {
        type _Return = ReturnType<ZIO<R, E, A>['unsafeRun']>
        return effect(enviroment).runRThenF<E | A>(
            err => err, 
            val => val,
        )
    }

    const unsafeRunResult: ZIO<R,E,A>['unsafeRunResult'] = enviroment => effect(enviroment).runR()

    const unsafeRunMaybe: ZIO<R,E,A>['unsafeRunMaybe'] = enviroment => effect(enviroment).runRThenF(
        err => Nothing(),
        val => Just(val),
    )


    const unsafeRunAOrElse: ZIO<R,E,A>['unsafeRunAOrElse'] = _default => enviroment => { 
        return effect(enviroment).runRThenF(
            err => _default,
            val => val,
        )
    }

    const unsafeRunFuture: ZIO<R,E,A>['unsafeRunFuture'] = enviroment => effect(enviroment)
    
    const map: ZIO<R,E,A>['map'] = f => {
        return ZIO( env => effect(env).map(f) )
    }

    const bimap: ZIO<R,E,A>['bimap'] = (g,f) => {
        return ZIO( (env:R) => effect(env).bimap(g,f))
    }

    const fmap: ZIO<R,E,A>['fmap'] = f => {
        return ZIO_.flatten(map(f))
    }

    const mapError: ZIO<R,E,A>['mapError'] = f => {
        return ZIO( (enviroment: R) => effect(enviroment).mapError(f) )
    }

    const fold: ZIO<R,E,A>['fold'] = ( g, f) => {
        return ZIO( (enviroment: R) => unsafeRunFuture(enviroment).fold(g,f) )
    }

    const matchM: ZIO<R,E,A>['matchM'] = (g, f) => {
        const a = ZIO( (enviroment:R) => {
            const b = unsafeRunFuture(enviroment).runRThenF(
                err => g(err),
                val => f(val),
            )
            const c = b.then( z => z.unsafeRunFuture(enviroment).runR() )
            const d = Future_.fromPromiseR( () => c )
            return d
        })
        return a
    }

    const provide: ZIO<R,E,A>['provide'] = enviroment => {
        return ZIO( (_: R) => effect(enviroment) )
    }

    const provideM: ZIO<R,E,A>['provideM'] = enviroment => {
        return enviroment.fmap( env => provide(env))   
    }

 

    const contramap: ZIO<R,E,A>['contramap'] = f => {
        type R0 = Parameters<typeof f>[0]
        return ZIO( (_: R0) => unsafeRunFuture(f(_)))
    }

    const enviroment: ZIO<R,E,A>['enviroment'] = () => {
        return ZIO( (_: R) => Future_.ok(_))
    }

    const catchAll: ZIO<R,E,A>['catchAll'] = f => {
        return ZIO_.flattenError(mapError(f))
    }

    const pullout: ZIO<R,E,A>['pullout'] = () => {
        return ZIO( (env => Future_.ok(unsafeRunFuture(env))) )
    }


    return {
        kind: 'ZIO',
        unsafeRun,
        unsafeRunResult,
        unsafeRunMaybe,
        unsafeRunAOrElse,
        unsafeRunFuture,

        map,
        bimap,
        fmap,
        mapError,
        fold,
        matchM,

        provide,
        provideM,
        contramap,

        enviroment,
        catchAll,
        pullout,
    }

}

// ======= static part =======


export type ZIO_ = {

    readonly absolve: <R,E,A>(z: ZIO<R, E, Future<E,A>>) => ZIO<R,E,A>

    readonly flatten: <R,E,A>(mma: ZIO<R,E,ZIO<R,E,A>>) => ZIO<R,E,A>

    readonly flattenError: <R,E,A>(mma: ZIO<R,ZIO<R,E,A>,A>) => ZIO<R,E,A>

    readonly fail: <E>(err: E) => ZIO<any, E, void>
    // eager constructor, use it to construct pure values
    readonly succeed: <A>(val: A) => ZIO<any, void, A>
    // lazy constructor, use it to construct from something that is an effects
    readonly effectTotal: <A>(val: () => A) => ZIO<any, void, A>

    // If you have some thing that is Trowable of that you don't know if it throws
    readonly effect: <A>(val: () => A) => ZIO<any, Error, A>

    readonly fromEither: <E,A>(ma: Either<E,A>) => ZIO<any, E,A>

    readonly fromFunction: <A,B>(f: (_:A) => B) => ZIO<A,void,B>

    readonly fromFuture: <E,A>(m: Future<E,A>) => ZIO<any,E,A>

    readonly fromAsync: <R,E,A>(f: (_:R) => Future<E,A>) => ZIO<R,E,A>
    readonly fromSync: <R,E,A>(f: (_:R) => Result<E,A>) => ZIO<R,E,A>


    readonly __fmap: typeof __fmap //todo: see function Note!

}

const absolve: ZIO_['absolve'] = mma => {
    type R = Parameters<(typeof mma)['provide']>[0]
    return ZIO( (env:R) => {
        const r = mma.unsafeRunFuture(env)
        return Future_.flatten(r)
    })
}

const flatten: ZIO_['flatten'] = mma => {
    type R = Parameters<(typeof mma)['provide']>[0]
    type _Z = Parameters<typeof mma['unsafeRunAOrElse']>[0]
    type A = Parameters<_Z['unsafeRunAOrElse']>[0]
    type E = Parameters<Parameters<_Z['mapError']>[0]>[0]
    const a = ZIO( (enviroment:R) => {
        const b = mma.unsafeRunFuture(enviroment)
        const c = b.runRThenF(
            _err => Future_.error(_err) as Future<E, A>,
            _val => _val.unsafeRunFuture(enviroment),
        )
        const d = c.then( f => f.runR())
        const e = Future_.fromPromiseR(() => d)
        return e
    })
    return a
}


const flattenError: ZIO_['flattenError'] = mma => {
    type R = Parameters<(typeof mma)['provide']>[0]
    type _Z = Parameters<Parameters<typeof mma['mapError']>[0]>[0]
    type A = Parameters<_Z['unsafeRunAOrElse']>[0]
    type E = Parameters<Parameters<_Z['mapError']>[0]>[0]
    const a = ZIO( (enviroment:R) => {
        const b = mma.unsafeRunFuture(enviroment)
        const c = b.runRThenF(
            _err => _err.unsafeRunFuture(enviroment),
            _val => Future_.ok(_val),
        )
        const d = c.then( f => f.runR())
        const e = Future_.fromPromiseR(() => d)
        return e
    })
    return a
}

const fail: ZIO_['fail'] = err => ZIO( env => Future_.error(err) )

const succeed: ZIO_['succeed'] = val => ZIO( env => Future_.ok(val) ) //todo: normalize name convention choose or '.succed' or '.ok'. 'Succed' is Scala ZIO Standard
 
const effectTotal: ZIO_['effectTotal'] = effect => ZIO( env => Future_.ok( effect() )) 

const effect: ZIO_['effect'] = effect => ZIO( env => { 
    return Future_.fromResult(() => Try(effect))
})

const fromEither: ZIO_['fromEither'] = ma => ZIO( env => Future_.fromEither(() => ma) )

const fromFunction: ZIO_['fromFunction'] = f => ZIO( env => Future_.ok(f(env)) )

const fromFuture: ZIO_['fromFuture'] = ma => ZIO( env => ma)

const fromAsync: ZIO_['fromAsync'] = ma => ZIO( env => ma(env))

const fromSync: ZIO_['fromSync'] = ma => ZIO( env => Future_.fromResult( () => ma(env) ) )

// TODO: This special fmap should be applied to normal itens of the interface
const __fmap = <R1 extends R0,E1,B,R0,E0 extends E1,A0>(m: ZIO<R0,E0,A0>, f: (_:A0) => ZIO<R1,E1,B>):ZIO<R1,E1,B> => {
    const m0 = m.contramap( (_:R1) => _)
    const m1 = m0.mapError( (_:E0):E1 => _)
    const m2 = m1.fmap(f)
    return m2
}



export const ZIO_: ZIO_ = {
    absolve,
    flatten,
    flattenError,
    fail,
    succeed,
    effectTotal,
    effect,
    fromEither,
    fromFunction,
    fromFuture,
    fromAsync,
    fromSync,
    __fmap, //todo: provisory solution, see func impl note
}




// informal test

// Tests:  1. general 'control-flow' events, 2. using a effect from enviroment
const Test1 = async () => {

    type Enviroment = {
        readonly logger: (msg: string) => void
    }

    const enviroment: Enviroment = {
        logger: msg => { console.log(`Logando Mensagem em dentro do enviroment ->: ${msg} <-`)} 
    }


    console.log(`Criando efeito...`)
    const a = ZIO<Enviroment, undefined, number>( env => { 
        console.log(`tou dentro do efeito`)
        console.log(`vou chamar um efeito do enviroment`)
        // tslint:disable-next-line: no-expression-statement
        env.logger(`esta msg foi enviada para o logger do enviroment`)
        console.log(`vou sair de dentro do efeito retornando 77, bye!`)
        return Future_.ok(77)
    })
    console.log(`Efeito criado!`)
    console.log(`Rodando efeito...`)
    const r = await a.unsafeRunAOrElse(66)(enviroment)
    console.log(`O retorno do efeito foi o número ${r}`)



}

// tests: 1. map, 2. fmap, 3. using a effect from enviroment
const Test2 = async () => {

    type Enviroment = {
        readonly logger: (msg: string) => void
    }
    const enviroment: Enviroment = {
        logger: msg => { console.log(`Logando Mensagem em dentro do enviroment ->: ${msg} <-`) } 
    }
    
    const a = ZIO<Enviroment, undefined, number>( env => Future_.ok(77)) 

    const mapped = a.map( x => `Hello __${String(x)}__ World!` )
    console.log(`tem que ter 'Hello __77__ World!' agora aqui -> `, await mapped.unsafeRun(enviroment) )

    const fmapped = a.fmap( x => ZIO( env => Future_.ok(`Hello __${String(x)}__ World!`) ))
    const effect = fmapped.provide(enviroment).fmap( s => ZIO( () => Future_.ok(`Balas juquinha: ${s}`)))
    console.log(`tem que ter 'Balas juquinha:' na frente do texto anterior -> `, await effect.unsafeRun(undefined))

}

// tests:   1. Narrowing of enviroment when using '.fail' and '.succed' methods,
//          2. Contramap
const Test3 = () => {
    // #1
    type ToNarrow = string
    const z: ZIO<ToNarrow, void, number> = ZIO_.succeed(10) // return type is ZIO<any,undefined, number>
    // ok! Enviroment type was narrowed in static-time from 'any' to 'string'

    // #2
    const g = (_: number[]):string => String(_)
    const z0 = z.contramap(g)
    // ok -> z0 has been contramapped in static-time
}

// tests: 1. Can I map an error that is 'void' ? 
const Test4 = () => {
    const z = ZIO_.succeed(10)
    const g = () => Error(`lala`)
    const g1 = (_: Error) => _.message
    const z0 = z.mapError(g)
    const z1 = z0.mapError(g1)
    // ok! -> Works in static time. 'void' is good because 'void' only form of creating is with the unit type '()'
}

// tests: 1. totalEffect (lazy, for effects) vs succed (eager, for pure values) 
const Test5 = () => {
    // tslint:disable: no-var-keyword no-expression-statement
    // initial -> zio -> output
    const ia = 1
    var ib = 1
    const effect = () => { ib += 1 }

    const za = ZIO_.succeed(ia)
    const zb = ZIO_.effectTotal(() => effect())

    const oa = za.unsafeRun(undefined)
    //const ob = zb.unsafeRun(undefined)

    console.log(oa)
    console.log(`variable initial = 1, effected = ${ib}`) // expected 2 because zb was unsafeRunned


}

// Check how it works with asynchronous Future-like Promise-like calls
const Test6 = () => {

    console.log(`Creating effect...`)

    const a = ZIO( (_:undefined) => {
        console.log(`Entered effect`) 
        const f = Future<void, number>( (ok, err) => { 
            setTimeout( () => ok(2), 2000)
        }).map( n => `numero obtido no futuro foi ${n}`)
        const r = f.runR()
        console.log(`Exiting effect`) 
        return Future_.ok('Result Right!')
   
    })

    console.log(`Done.`)
    console.log(`Running effect.`)

    a.unsafeRun(undefined)

    console.log(`Program end.`)

}

// tslint:disable-next-line: no-expression-statement
// Test1()
// Test2()
// Test3()
// Test4()
// Test5()
// Test6()