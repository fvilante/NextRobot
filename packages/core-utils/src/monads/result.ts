import { foldLeftArray } from "../array/foldLeftArray"


export type ResultMatcher<A,R> = {
    readonly Ok: (_:A) => R
    readonly Error: (_: Error) => R 
}


/** Result A or Error. This type works like Either, buf left is setted to 'Error' while Right is setted to 'A' */
export type Result<A> = {
    readonly kind: 'Result'

    readonly map: <B>(f: (_:A) => B) => Result<B>
    readonly fmap: <B>(f: (_:A) => Result<B>) => Result<B>
    
    readonly fromValue: (_defaultValue: A) => A
    readonly fromError: (_defaultError: Error) => Error

    readonly isError: () => boolean
    readonly isValue: () => boolean //todo: Maybe 'isOk' should be a better method name

    readonly match: <R>(m: ResultMatcher<A,R>) => R
}


export const Result = <A>( data: A | Error ): Result<A> => {

    const isError: Result<A>['isError'] = () => {
        return (data instanceof Error) ? true : false
    }

    const isValue: Result<A>['isValue'] = () => !isError()

    const match: Result<A>['match'] = matcher => {
        return isError()
            ? matcher.Error(data as Error)
            : matcher.Ok( data as A)
    }


    const map: Result<A>['map'] = f => {
        type B = ReturnType<typeof f>
        return match({
            Ok:     val => Result(f(val)),
            Error:  err => Result(err) as unknown as Result<B>,
        })
    }

    const fmap: Result<A>['fmap'] = f => {
        type B = ReturnType<ReturnType<typeof f>['fromValue']>
        return match({
            Ok:     val => f(val),
            Error:  err => Result(err) as unknown as Result<B>,
        })
    }

    const fromValue: Result<A>['fromValue'] = _default => {
        return match({
            Ok:     val => val,
            Error:  err => _default,
        }) 
    }

    const fromError: Result<A>['fromError'] = _default => {
        return match({
            Ok:     val => _default,
            Error:  err => err,
        }) 
    }

    return {

        kind: 'Result',

        map,
        fmap,
        fromValue,
        fromError,
        isError,
        isValue,
        match,

    }

}

// --- Static Part ---

// constructors


const Result_Ok = <A>(val:A):Result<A> => Result(val)

const Result_Error = <A>(err: Error):Result<A> => Result<A>(err)  


// operations



const filterByOk = <A>(es: readonly Result<A>[]): readonly A[] => {
    return foldLeftArray(es, [] as readonly A[], (acc, cur) => {
        return cur.match({
            Error:  _   => acc,
            Ok:     val => [...acc, val]
        })
    })
    
}


const filterByError = <A>(es: readonly Result<A>[]): readonly Error[] => {
    return foldLeftArray(es, [] as readonly Error[], (acc, cur) => {
        return cur.match({
            Error:  err => [...acc, err],
            Ok:     _   => acc,
        })
    })
    
}


// static interface


/** Static part of the 'Result' monad */
export type Result_ = {
    /** Ok construcor */
    readonly Ok: <A>(val: A) => Result<A>

    /** Error constructor */
    readonly Error: <A>(err: Error) => Result<A>

    /** Extracts from a list of 'Result' all the 'Ok' elements. All elements are extracted in order */
    readonly filterByOk: <A>(es: readonly Result<A>[]) => readonly A[]

    /** Extracts from a list of 'Result' all the 'Error' elements. All elements are extracted in order */
    readonly filterByError: <A>(es: readonly Result<A>[]) => readonly Error[]
}

export const Result_: Result_ = {
    Ok: Result_Ok,
    Error: Result_Error,
    filterByOk,
    filterByError,
}




// informal test

const Test1 = () => {

    const r1 = Result(10)
    const r2 = Result(Error(`foo`))


    const a = r1
        .map( n => String(n))
        //.fmap( _ => Result(Error(`Forcing an Error`)))
        .match({
            Ok:     val => Result(`valor: ${val}`),
            Error:  err => Result(`Erro: ${err.message}`),
        })
        .fromValue(`Deu Zica`)

    console.log(a)

}


// tslint:disable-next-line: no-expression-statement
//Test1()