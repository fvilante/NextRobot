import { Either, Right, Left, matchEither } from "./either";



export type IO<A> = {

    readonly kind: 'IO'

    readonly run: () => Either<Error,A>

    readonly map: <B>(f: (_:A) => B) => IO<B>

}

/** todo: extract Lazy<T> to a file named CommonTypes.ts ? */
export type Lazy<T> = () => T

export type IOConstructor = <A>( fn: Lazy<A>) => IO<A>

export const IO: IOConstructor = <A>( fn: Lazy<A>):IO<A> => {

    const run = ():Either<Error,A> => {

        try {
            return Right(fn()) 
        }
        catch(e) {
            // tslint:disable: no-if-statement
            if(e instanceof Error) {
                // IDE type hinting now available
                // properly handle Error e
                return Left(e) 
            }
            else if(typeof e === 'string' || e instanceof String) {
                // IDE type hinting now available
                // properly handle e or...stop using libraries that throw naked strings
                return Left(new Error(String(e))) 
            }
            else if(typeof e === 'number' || e instanceof Number) {
                // IDE type hinting now available
                // properly handle e or...stop using libraries that throw naked numbers
                return Left(new Error(String(e)))
            }
            else if(typeof e === 'boolean' || e instanceof Boolean) {
                // IDE type hinting now available
                // properly handle e or...stop using libraries that throw naked booleans
                return Left(new Error(String(e)))
            }
            else {
                // if we can't figure out what what we are dealing with then
                // probably cannot recover...therefore, rethrow
                // Note to Self: Rethink my life choices and choose better libraries to use.
                return Left(new Error(String(e)))
            }
            // tslint:enable: no-if-statement
        }

    } 

    const map = <B>(f: (_:A) => B): IO<B> => {

        // tslint:disable: no-if-statement

        const newIO = ():IO<B> => IO( () => {

            const previous = run()
            
            if (previous.isLeft()) 
                throw (previous.getValue() as Error)
            else {
                const current = IO(() => f(previous.getValue() as A)).run()
                if (current.isLeft())
                    throw (current.getValue() as Error)
                else {
                    return (current.getValue() as B)
                }


            } 
                
        })

        return newIO()

    }

    return { 
        kind: 'IO',
        run,
        map,
    }

}


// --------------- Informal Test ---------------------------------------------------

// tslint:disable: no-expression-statement no-expression-statement

const Test = () => {

    type MakeLazy= <A>(_:A) => Lazy<A>
    const MakeLazy: MakeLazy = value => () => { 
        console.log(`Running Effect... Done! Returning value =`, value)
        return value
    } 

    const lazy = MakeLazy('Hello')

    const a = IO(lazy)

    const b = a.map( s => `${s} world`)

    const c = b.map( s => { throw new TypeError('Err juca'); return s.toUpperCase(); } )

    const d = c.map( s => s.length)

    const effects = [a,b,c,d]

    console.log(`Os efeitos foram criados, porem nao-executados`)
    console.log(effects)

    console.log(`Iniciando executador de efeitos.`)

    const runEffects = () => effects.map( effect => {
        
        const r = effect.run() as Either<Error, string | number>
        const value = r.match<string | Error>(err => err, value => String(value))

        return `V=` + value

    })

    console.log(`Resultado dos efeitos processados`)
    console.log(runEffects())


}

const Test2 = () => {

    const log = (recado:string) => () => console.log(`Meu recado: ${recado}`) 
    console.log(`Criando efeito...:`)
    const efeito =  
        IO(     log('PASSO 1'))
        .map(   log('PASSO 2'))
        // error introduced
        .map(   () => {throw new TypeError('Uma msg de erro qualquer!'); return log('PASSO 3')()} )
        .map(   log('PASSO 4'))
        .map(   () => 5)
        .map(   n => { log(`PASSO 5 (retroativo!) e PASSO ${n+1}`)(); return n+1;} )

    console.log(`Efeito criado =`, efeito)


    console.log(`** Rodando efeito...: ** `)
    
    const r = efeito.run()
    console.log(`** Fim da execucao do efeito: ** `)

    const final = r.match<number | string>( err => ` Deu Erro, veja msg:` + err.message, n => n)
    console.log(`Resultado final da execucao do efeito:`, final)


}


//Test2()