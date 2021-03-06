import { Future } from "./monads/future"

export const delay = (ms: number): Future<void, undefined> =>
    Future( ok => {
        // tslint:disable-next-line: no-expression-statement
        setTimeout( () => ok(undefined), ms)
    })
