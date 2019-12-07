import { foldLeftArray } from "../array/foldLeftArray"
import { Maybe } from "./maybe"
import { identity } from "./identity"
import { Either } from "./either"

/** Results in a successful value of type A or an error of type E. This type works like Either, but the semantics enforces the Error Success reasoning */
export type Result<E,A> = {
    readonly kind: 'Result'

    readonly unsafeRun: () => (E|A) extends void ? void : E extends void ? A : A | E 

    readonly map: <B>(f: (_:A) => B) => Result<E,B>
    readonly fmap: <B>(f: (_:A) => Result<E,B>) => Result<E,B>
    readonly mapError: <E1>(f: (_:E) => E1) => Result<E1,A>
    readonly bimap: <E1,B>(errorFn: (_:E) => E1, valueFn: (_:A) => B) => Result<E1,B>
    
    readonly fromValue: (_defaultValue: A) => A
    readonly fromError: (_defaultError: E) => E

    readonly isError: () => boolean
    readonly isValue: () => boolean //todo: Maybe 'isOk' should be a better method name

    readonly fold: <R>(errorFn: (_: E) => R, valueFn: (_:A) => R) => Result<void,R>
    readonly foldLeft: <R>(errorFn: (_: E) => R, valueFn: (_:A) => R) => Result<R,void>
    readonly match: <R>(errorFn: (_: E) => R, valueFn: (_:A) => R) => R
}
 

const ResultConstructor = <E,A>( data: A | E, _isError: boolean ): Result<E,A> => {

    const unsafeRun: Result<E,A>['unsafeRun'] = () => data as ReturnType<Result<E,A>['unsafeRun']>

    const isError: Result<E,A>['isError'] = () => _isError

    const isValue: Result<E,A>['isValue'] = () => !isError()

    const match: Result<E,A>['match'] = (errorFn, valueFn) => {
        return isError()
            ? errorFn(data as E)
            : valueFn(data as A)
    }

    const fold: Result<E,A>['fold'] = (errorFn, valueFn) => {
        return Result.Value( match(errorFn, valueFn) )
    }
    
    const foldLeft: Result<E,A>['foldLeft'] = (errorFn, valueFn) => {
        return Result.Error( match(errorFn, valueFn) )
    }

    const bimap: Result<E,A>['bimap'] = (errorFn, valueFn) => {
        return match(
            err => Result.Error( errorFn(err) ),
            val => Result.Value( valueFn(val) ),
        )
    }

    const map: Result<E,A>['map'] = f => {
        return bimap( identity, f )
    }

    const fmap: Result<E,A>['fmap'] = f => {
        return match(
            err => Result.Error(err),
            val => f(val),
        )
    }

    const mapError: Result<E,A>['mapError'] = f => {
        return bimap( f, identity )
    }
        
    const fromValue: Result<E,A>['fromValue'] = _default => {
        return match(
            err => _default,
            val => val,
        ) 
    }

    const fromError: Result<E,A>['fromError'] = _defaultError => {
        return match(
            err => err,
            val => _defaultError,
        ) 
    }


    return {
        kind: 'Result', //todo: verify if this `kind` property can be removed. Don't know if it is really necessary (logging/trace?). I dont know the speed cost impact of mantain this. All monads are using this pattern
        unsafeRun,
        map,
        fmap,
        mapError,
        bimap,
        fromValue,
        fromError,
        isError,
        isValue,
        fold,
        foldLeft,
        match,
    }

}

// --- Static Part ---

// constructors


// static interface


/** Static part of the 'Result' monad */
type ResultStatic = {
    /** Ok construcor. Note: You should inform also the Error type on construction*/
    readonly Value: <E,A>(value: A) => Result<E,A>

    /** Error constructor. Note: You should inform also the Value type on construction */
    readonly Error: <E,A>(err: E) => Result<E,A>

    /** As maybe do not have Error details, error typ is mapped to undefined */
    readonly fromMaybe: <A>(ma: Maybe<A>) => Result<void,A> 

    readonly fromEither: <E,A>(ma: Either<E,A>) => Result<E,A>

    /** Extracts from a list of 'Result' all the 'Value' (non-errors!) elements. All elements are extracted in order */
    readonly allValues: <E,A>(rs: readonly Result<E,A>[]) => readonly A[]

    /** Extracts from a list of 'Result' all the 'Error' elements. All elements are extracted in order */
    readonly allErrors: <E,A>(rs: readonly Result<E,A>[]) => readonly E[]

    readonly flatten: <E,A>(mma: Result<E,Result<E,A>>) => Result<E,A>

}


// --- implemantations ----

// vanilla constructors

const ResultValue = <E,A>(value:A): Result<E,A> => ResultConstructor<E,A>(value, false)

const ResultError = <E,A>(err: E): Result<E,A> => ResultConstructor<E,A>(err, true)  

const fromMaybe: ResultStatic['fromMaybe'] = ma => {
    return ma.match({
        Just:       val =>  Result.Value(val),
        Nothing:            Result.Error(undefined as void) 
    })
}

const fromEither: ResultStatic['fromEither'] = ma => {
    return ma.match({
        Left:       err => Result.Error(err),
        Right:      val => Result.Value(val),
    })
}

// operations


const allValues = <E,A>(es: readonly Result<E,A>[]): readonly A[] => {
    return foldLeftArray(es, [] as readonly A[], (acc, cur) => {
        return cur.match(
            err => acc,
            val => [...acc, val],
        )
    })
    
}


const allErrors = <E,A>(es: readonly Result<E,A>[]): readonly E[] => {
    return foldLeftArray(es, [] as readonly E[], (acc, cur) => {
        return cur.match(
            err => [...acc, err],
            val => acc,
        )
    })
    
}


const flatten: ResultStatic['flatten'] = <E,A>(mma: Result<E,Result<E,A>>) => {
    return mma.match(
        _err =>  Result.Error<E,A>(_err),
        _val => _val
    )
}



export const Result: ResultStatic = {
    Value: ResultValue, // value type constructor
    Error: ResultError, // error type constructor
    allValues,  
    allErrors,
    fromMaybe,
    fromEither,
    flatten,
}




// informal test

const Test1 = () => {

    const r1 = Result.Value<Error, number>(10)
    const r2 = Result.Error<Error, string>(Error(`foo`))

    const a = r1
        .map( n => n*2)
        //.fmap( _ => Result(Error(`Forcing an Error`)))
        .bimap(
            err => `Erro: ${err.message}`,
            val => `valor: ${val}`,
        )
        .fromValue(`Deu Zica`)

    console.log(a)

    console.log(r2.mapError( e => `mas tbm deu Erro do tipo: ${e.message}`).fromError(`Ops zica de verdade!`))

}


// tslint:disable-next-line: no-expression-statement
//Test1()