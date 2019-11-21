import { Either, Right, Left } from "./either";


/** Try execute an unsafeEffect and catches the error into the left side of either
 * Note: Eager evaluation
 */
export const Try = <A>(LazyUnsafeEffect: () => A): Either<Error,A> => {

    try { 
        return Right( LazyUnsafeEffect() ) 
    } catch(e) {
        // tslint:disable: no-if-statement
        if(e instanceof Error) {
            // properly handle Error e
            return Left(e) 
        }
        else if(typeof e === 'string' || e instanceof String) {
            // properly handle e or...stop using libraries that throw naked strings
            return Left(new Error(String(e))) 
        }
        else if(typeof e === 'number' || e instanceof Number) {
            // properly handle e or...stop using libraries that throw naked numbers
            return Left(new Error(String(e)))
        }
        else if(typeof e === 'boolean' || e instanceof Boolean) {
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


// informal test

const Test = () => {

    type AnyEither = Either<any,any>

    const DoThrows = () => {
        throw new Error(`I've been throwed an error!`)
        return 2
    }

    const NoThrow = () => {
        return `hello world`
    }

    const a = Try(DoThrows) // Ok a is type: Either<Error, number>
    const b = Try(NoThrow)  // ok b is type: Either<Error, string>

    const showResult = <T extends AnyEither>(e: T):string => {
        return e.match({
            Left:   err => `Peguei o erro: "${err.message}"`,
            Right:  val => `Valor chegou: "${val}"`
        })
    }

    console.log(showResult(a))
    console.log(showResult(b))
    /**
     *  OK --> Outputs are:
     *  Peguei o erro: "I've been throwed an error!"
        Valor chegou: "hello world"
     */

}

// tslint:disable-next-line: no-expression-statement
//Test()
