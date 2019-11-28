import { Either, Left, Right, Either_ } from "../either"
import { Maybe, Nothing, Just } from "../maybe"
import { Future, Future_ } from "../future"
import { Try } from "../try"
import { Result } from "../result"
import { A } from "ts-toolbelt"

// inspired in scala zio library
// see: https://zio.dev/
// see: https://github.com/ghostdogpr/zio-cheatsheet

// SCALA -> TypeScript conventions I used:
//      1. Nothing -> void      --> for types that cannot been created
//      2. Unit -> undefined    --> for empty types that can be created but does mean nothing
//      3. Any -> any           --> for any particuar type that exists
//      Note: I'm not using TS 'null' type in any case. 

export type ZIOMatcherFn<E,A,B> = {
    readonly Error: (_: E) => B
    readonly Value: (_: A) => B 
}

export type ZIOMatcherFnM<R,E,A,B> = {
    readonly Error: (_: E) => ZIO<R,E,B> 
    readonly Value: (_: A) => ZIO<R,E,B> 
}

export type ZIO<R, E, A> = {
    readonly kind: 'ZIO'

    readonly unsafeRunResult: (_:R) => Result<E,A>
    readonly unsafeRunMaybe: (_:R) => Maybe<A>
    readonly unsafeRun: (_:R) => E extends void ? A : A | E
    readonly unsafeRunAOrElse: (_default: A) => (_:R) => A

    readonly map: <B>(f: (_:A) => B) => ZIO<R,E,B>
    readonly fmap: <B>(f: (_:A) => ZIO<R,E,B>) => ZIO<R,E,B>
    readonly mapError: <E0>(f: (_:E) => E0) => ZIO<R,E0,A>
    readonly fold: <B>(errFn: (_:E) => B, valueFn: (_:A) => B) => ZIO<R,void,B>
    readonly foldM: <B>(m: ZIOMatcherFnM<R,E,A,B>) => ZIO<R,E,B>

    readonly provide: (enviroment: R) => ZIO<any,E,A>
    readonly provideM: (enviroment: ZIO<any, E, R>) => ZIO<any, E, A> //todo: In Scala Zio E can be changed to a sub-type of E. I dont understand the use-case so I'm ommiting until further insight
    readonly contramap: <R0>(f: (_:R0) => R) => ZIO<R0,E,A>

    /**
     * In the callback passed to catchAll, you may return an effect with a different error type (or perhaps Nothing), which will be reflected in the type of effect returned by catchAll.
     */
    readonly catchAll: (f: (_:E) => ZIO<R,E,A> ) => ZIO<R,E,A>
    readonly result: () => ZIO<R, void, Result<E,A>> //see also 'absolve' which is the inverse operation

}

type SyncEffect<R,E,A> = (_:R) => Result<E,A>
type AsyncEffect<R,E,A> = (_:R) => Future<E,A>


const __ZIO = <R,E,A>(effect: SyncEffect<R,E,A> | AsyncEffect<R,E,A>, isAsync: boolean) => {

}



export const ZIO = <R,E,A>(effect: (_:R) => Result<E,A>): ZIO<R,E,A> => {

    const unsafeRun: ZIO<R,E,A>['unsafeRun'] = enviroment => {
        type _Return = ReturnType<ZIO<R, E, A>['unsafeRun']>
        return effect(enviroment).match<_Return>(
            err => err as _Return,
            val => val as _Return,
        )
    }

    const unsafeRunResult: ZIO<R,E,A>['unsafeRunResult'] = enviroment => effect(enviroment)

    const unsafeRunMaybe: ZIO<R,E,A>['unsafeRunMaybe'] = enviroment => effect(enviroment).match(
        err => Nothing(),
        val => Just(val),
    )


    const unsafeRunAOrElse: ZIO<R,E,A>['unsafeRunAOrElse'] = _default => enviroment => 
        effect(enviroment).match<A>(
            err => _default,
            val => val,
        )
        

    const map: ZIO<R,E,A>['map'] = f => 
        ZIO( env => effect(env).map(f) )


    const fmap: ZIO<R,E,A>['fmap'] = f => {
        type B = Parameters<Parameters<ReturnType<typeof f>['map']>[0]>[0]
        return ZIO( (enviroment:R) => unsafeRunResult(enviroment).match(
            err => ZIO_.fail(err) as unknown as ZIO<R,E,B>,
            val => f(val),
        ).unsafeRunResult(enviroment) )
    }

    const mapError: ZIO<R,E,A>['mapError'] = f => 
        ZIO( (enviroment: R) => effect(enviroment).mapError(f) )


    const provide: ZIO<R,E,A>['provide'] = enviroment => 
        ZIO( (_: R) => effect(enviroment) )

    const provideM: ZIO<R,E,A>['provideM'] = enviroment => {
        return enviroment.fmap( env => provide(env))
            
    }

    
    const fold: ZIO<R,E,A>['fold'] = ( g, f) => {
        type B = ReturnType<typeof g>
        return ZIO( (enviroment: R) => unsafeRunResult(enviroment).match(
            err => Result.Value(g(err)),
            val => Result.Value(f(val)),
        ))
    }

    const foldM: ZIO<R,E,A>['foldM'] = matcherM => {
        return ZIO( (env:R) => unsafeRunResult(env).match(
            err => matcherM.Error(err),
            val => matcherM.Value(val),
        ).unsafeRunResult(env) )
    }

    const contramap: ZIO<R,E,A>['contramap'] = f => {
        type R0 = Parameters<typeof f>[0]
        return ZIO( (_: R0) => unsafeRunResult(f(_)))
    }

    const catchAll: ZIO<R,E,A>['catchAll'] = f => {
        const a = ZIO( (env:R) => Result.Value<E,R>(env) ) 
        const b = a.fmap( r => { 
            const a = result()
            const b = a.map( e => e.match(
                err => f(err),
                val => ZIO( (env:R) => Result.Value<E,A>(val) ).provide(r),
            ))
            const c = b.provide(r).unsafeRunResult(undefined)
            const d = c.unsafeRun() 
            return d
        })
        return b
        
    }

    const result: ZIO<R,E,A>['result'] = () => {
        return ZIO( (env => {
            const a = unsafeRunResult(env)
            return Result.Value(a)
        }))
    }


    return {
        kind: 'ZIO',
        unsafeRun,
        unsafeRunAOrElse,
        unsafeRunResult,
        unsafeRunMaybe,
        map,
        fmap,
        mapError,
        fold,
        foldM,
        provide,
        provideM,
        contramap,
        catchAll,
        result,
    }

}

// ======= static part =======


export type ZIO_ = {

    readonly absolve: <R,E,A>(z: ZIO<R, E, Result<E,A>>) => ZIO<R,E,A>

    readonly flatten: <R,E,A>(mma: ZIO<R,E,ZIO<R,E,A>>) => ZIO<R,E,A>

    readonly fail: <E>(err: E) => ZIO<any, E, void>
    // eager constructor, use it to construct pure values
    readonly succeed: <A>(val: A) => ZIO<any, void, A>
    // lazy constructor, use it to construct from something that is an effects
    readonly effectTotal: <A>(val: () => A) => ZIO<any, void, A>

    // If you have some thing that is Trowable of that you don't know if it throws
    readonly effect: <A>(val: () => A) => ZIO<any, Error, A>

    readonly fromEither: <E,A>(ma: Either<E,A>) => ZIO<any, E,A>

    readonly fromFunction: <A,B>(f: (_:A) => B) => ZIO<A,void,B>

    readonly __fmap: typeof __fmap //todo: see function Note!

    //readonly fromAsync: <R,E,A>(f: (_:R) => Future<E,A>) => ZIO<R,E,A>
}

const absolve: ZIO_['absolve'] = mma => {
    type R = Parameters<(typeof mma)['provide']>[0]
    return ZIO( (env:R) => {
        const r = mma.unsafeRunResult(env)
        return Result.flatten(r)
    })
}

const fromEither: ZIO_['fromEither'] = ma => ZIO( env => Result.fromEither(ma) )

const fromFunction: ZIO_['fromFunction'] = f => ZIO( env => Result.Value(f(env)))




const flatten: ZIO_['flatten'] = mma => {
    return ZIO( enviroment => 
        mma.unsafeRunResult(enviroment).match(
            _err => Result.Error(_err),
            _val => _val.unsafeRunResult(enviroment),
        ))
}


const fail: ZIO_['fail'] = err => ZIO( env => Result.Error(err) )

const succeed: ZIO_['succeed'] = val => ZIO( env => Result.Value(val) )

const effectTotal: ZIO_['effectTotal'] = effect => ZIO( env => Result.Value( effect() )) 

const effect: ZIO_['effect'] = effect => ZIO( env => { 
    return Try(effect)
})


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
    fail,
    succeed,
    effectTotal,
    effect,
    fromEither,
    fromFunction,
    __fmap, //todo: provisory solution, see func impl note
}




// informal test

// Tests:  1. general 'control-flow' events, 2. using a effect from enviroment
const Test = () => {

    type Enviroment = {
        readonly logger: (msg: string) => void
    }

    const enviroment: Enviroment = {
        logger: msg => { console.log(`Logando Mensagem em dentro do enviroment ->: `); console.log(msg); } 
    }


    console.log(`Criando efeito...`)
    const a = ZIO<Enviroment, undefined, number>( env => { 
        console.log(`tou dentro do efeito`)
        console.log(`vou chamar um efeito do enviroment`)
        // tslint:disable-next-line: no-expression-statement
        env.logger(`esta msg foi enviada para o logger do enviroment`)
        console.log(`vou sair de dentro do efeito retornando 77, bye!`)
        return Result.Value(77)
    })
    console.log(`Efeito criado!`)
    console.log(`Rodando efeito...`)
    const r = a.unsafeRunAOrElse(66)(enviroment)
    console.log(`O retorno do efeito foi o número ${r}`)



}

// tests: 1. map, 2. fmap, 3. using a effect from enviroment
const Test2 = () => {

    type Enviroment = {
        readonly logger: (msg: string) => void
    }
    const enviroment: Enviroment = {
        logger: msg => { console.log(`Logando Mensagem em dentro do enviroment ->: `); console.log(msg); } 
    }
    
    const a = ZIO<Enviroment, undefined, number>( env => Result.Value(77)) 

    const mapped = a.map( x => `Hello __${String(x)}__ World!` )
    console.log(`tem que ter 'Hello __77__ World!' agora aqui -> `, mapped.unsafeRun(enviroment) )

    const fmapped = a.map( x => `Hello __${String(x)}__ World!` )
    const effect = fmapped.provide(enviroment).fmap( s => ZIO( () => Result.Value(`Balas juquinha: ${s}`)))
    console.log(`tem que 'Balas juquinha:' na frente do texto anterior -> `, effect.unsafeRun(undefined))

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
    const effect = () => { ib += 1}

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
        return Result.Value('Result Right!')
   
    })

    console.log(`Done.`)
    console.log(`Running effect.`)

    a.unsafeRun(undefined)

    console.log(`Program end.`)

}

// tslint:disable-next-line: no-expression-statement
//Test6()