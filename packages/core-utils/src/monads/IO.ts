import { Either, Right, Left } from "./either";



export type IO<A> = {

    readonly kind: 'IO'

    readonly run: () => Either<Error,A>

    readonly map: <B>(f: (_:A) => B) => IO<B>

    readonly fmap: <B>(f: (_:A) => IO<B>) => IO<B>

}

/** just an interface (do not instantiate) */
type _IO<A> = {
    readonly Lazy: () => A
    readonly Constructor: (fn: _IO<A>['Lazy']) => IO<A> 
} & IO<A>


/** pure container for side-effects 
 * NOTE: It's highly recommended to type explicity the IO when constructing it
 */
export const IO = <A>( fn: _IO<A>['Lazy']): IO<A> => {

    const run: _IO<A>['run'] = () => {

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

    const map = <B>(f: (_:A) => B): IO<B> => 
        IO<B>( () => {
            // tslint:disable-next-line: no-expression-statement
            return run()
            .match<B>({
                Left: err => { throw err },
                Right: a => f(a)
            })
        }) 

    const fmap = <B>(f: (_:A) => IO<B>): IO<B> => IO<B> ( () => {
         // tslint:disable-next-line: no-expression-statement
        return run()
        .match({
            Left: err => { throw err },
            Right: a => f(a), 
        })
        .run()
        .match({
            Left: err => { throw err },
            Right: b => b
        })

    })
    

    return { 
        kind: 'IO',
        run,
        map,
        fmap,
    }

}


// --------------- Informal Test ---------------------------------------------------


// testing effect map and effect evaluation
const Test1 = () => {

    console.log(`lazy creating the IO effect`)
    const a = IO( () => { console.log(`-- Inside 'A' effect. Executing it. (throwing error!)--`); throw new Error(`Hi Artificial Error Here!`)} )
    console.log(`Effect 'A' created`)

    console.log(`lazy mapping effect a to a -> b`)
    const b = a.map( () => `-- Inside 'B' effect: This msg was gererated inside effect B--`) 
    const c = b.map( msg => { console.log(`--Inside 'C': Here is the output from effect 'B'-> ${msg}`)})

    console.log(`running the effects`)
    const d = c.run()

    console.log(`catching errors`)

    const e = d.match({
        Right: () => { console.log(`Finished: Sucessfull`)},
        Left: err => { console.log(`Finished: Error! This is the Error => ${err}`)}
    })


}


// tslint:disable-next-line: no-expression-statement
Test1()