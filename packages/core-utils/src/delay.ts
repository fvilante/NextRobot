import { Future } from "./monads/future"
import { Right } from "./monads/either"

export const delay = (ms:number):Future<undefined> =>
    Future( resolver => {
        // tslint:disable-next-line: no-expression-statement
        new Promise( (resolve) => { setTimeout( () => resolve(), ms) })
            .then( () => resolver(Right(undefined)) )
    })
