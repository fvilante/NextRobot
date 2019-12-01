
import { Result } from './result' 
import { Try } from './try'
import { Either, Right, Left } from './either'
import { identity } from './identity'
import { Maybe } from './maybe'




// ------------------------ FUTURE ----------------------------------------------


// version 1 => 2 type parameters and runP returns a promisse 

export type Future<E,A> = {

    readonly kind: 'Future'

    readonly runR: () => Promise<Result<E,A>>
    readonly runA: (_default: A) => Promise<A> // 'E' is discarded
    readonly runE: (_default: E) => Promise<E> // 'A' is discarded

    // runs promisse then bimap result
    readonly runRThen: <B,C>(errorFn: (_: E) => B, valueFn: (_:A) => C) => Promise<Result<B,C>>

    // runs promisse then fold result
    readonly runRThenF: <R>(errorFn: (_: E) => R, valueFn: (_:A) => R) => Promise<R>

    /** fold right */
    readonly fold: <R>(errorFn: (_: E) => R, valueFn: (_:A) => R) => Future<void,R>
    readonly foldLeft: <R>(errorFn: (_: E) => R, valueFn: (_:A) => R) => Future<R,void>

    //TODO: Develop bellow when posible: 
    //readonly isError: () => Future<E,boolean>
    //readonly isValue: () => Future<E,boolean> //todo: Maybe 'isOk' should be a better method name
    //readonly match: <R>(errorFn: (_: E) => R, valueFn: (_:A) => R) => R

    readonly bimap: <E1,B>(errorFn: (_:E) => E1, valueFn: (_:A) => B) => Future<E1,B>
    readonly map: <B>(f: (_:A) => B) => Future<E,B>
    readonly mapError: <E1>(f: (_:E) => E1) => Future<E1,A>

    readonly fmap: <B>(f: (_:A) => Future<E,B>) => Future<E,B>

}

// interface only (not instantiate it)
type Future__<E,A> = {
    readonly OkResolver: (_: A) => void
    readonly ErrorResolver: (_: E) => void
    readonly Callback: ( ok: Future__<E,A>['OkResolver'], err: Future__<E,A>['ErrorResolver']) => void
} & Future<E,A>





/** Attention: It's Highly recommended to explicitly type your Future constructions  */
export const Future = <E,A>(effect: Future__<E,A>['Callback']): Future<E,A> => {

    /** runP aways resolves to a Promise<Result<E,A>> even if an error hapens it will be manipulated inside Result and not inside Promise. Promise.catch never runs! ) */
    // tslint:disable: no-expression-statement
    const runR: Future__<E,A>['runR'] = async () => {
        return new Promise<Result<E,A>>( (resolve, reject) => { 
            // resolvers
            const ok: Future__<E,A>['OkResolver'] = _ => { 
                resolve(Result.Value(_))   
            }

            const err: Future__<E,A>['ErrorResolver'] = _ => {
                resolve(Result.Error(_))
            }
            
            // run effect
            effect(ok, err) 
        })
        
    } // tslint:enable: no-expression-statement

    const runRThen: Future__<E,A>['runRThen'] = (g,f) => {
        return runR().then( r => r.bimap(g,f) )
    }

    const runRThenF: Future__<E,A>['runRThenF'] = (g,f) => {
        return runR().then( r => r.match(g,f) )
    }

    const runA: Future__<E,A>['runA'] = _default => {
        return runRThenF( 
            _err => _default,
            _val => _val,
        )
    }

    const runE: Future__<E,A>['runE'] = _default => {
        return runRThenF( 
            _err => _err,
            _val => _default,
        )
    }



    const fold: Future__<E,A>['fold'] = (g,f) => {
        return Future( (ok, err) => {
            // tslint:disable-next-line: no-expression-statement
            runRThen( 
                _err => ok( g(_err) ) ,
                _val => ok( f(_val) ),
            )
        })
    }

    const foldLeft: Future__<E,A>['foldLeft'] = (g,f) => {
        return Future( (ok, err) => {
            // tslint:disable-next-line: no-expression-statement
            runRThen( 
                _err => err( g(_err) ) ,
                _val => err( f(_val) ),
            )
        })
    }

/*
    **********
    *** TODO: I'll let to FINISH develop the match function later *****
    *********

    const isError: Future<E,A>['isError'] = () => {
        const isError = () => runR().then( r => r.isError())
        const a = Future_.fromPromise(isError)
    }

    const isValue: Future<E,A>['isValue'] = () => !isError()

    const match: Future<E,A>['match'] = (errorFn, valueFn) => {
        return isError()
            ? errorFn(data as E)
            : valueFn(data as A)
    }
*/
    const bimap: Future__<E,A>['bimap'] = (g, f) => {
        return Future_.fromPromiseR( () => 
            runRThen(
                 _err => g(_err),
                 _val => f(_val),
            )
        )
    }

    const map: Future__<E,A>['map'] = f => {
        return bimap( identity, f )
    }


    const mapError: Future__<E,A>['mapError'] = g => {
        return bimap( g, identity )
    }

  
    const fmap: Future__<E,A>['fmap'] = f => {
        return Future_.flatten(map(f))
    }


    return { 
        kind: 'Future',
        runR,
        runA,
        runE,
        runRThen,
        runRThenF,
        fold,
        foldLeft,
        bimap,
        map,
        mapError,
        fmap,
    }


}

// Static Part

export type Future_ = {
    // constructors
    readonly ok: <E,A>(value: A) => Future<E,A>
    readonly error: <E,A>(error: E) => Future<E,A>
    readonly fromFunction: <A,B>(f: (_:A) => B) => (_:A) => Future<void,B>
    readonly fromPromise: <A>(_: () => Promise<A>) => Future<Error,A>
    readonly fromResult: <E,A>(_: () => Result<E,A>) => Future<E,A>
    readonly fromPromiseR: <E,A>(_: () => Promise<Result<E,A>>) => Future<E,A>
    readonly fromValue: <A>(f: () => A) => Future<void,A>
    readonly fromMaybe: <A>(f: () => Maybe<A>) => Future<void,A>
    readonly fromEither: <A,B>(f: () => Either<A,B>) => Future<A,B>

    readonly flatten: <E,A>(ffa: Future<E,Future<E,A>>) => Future<E,A>

    // array specialized
    readonly allResults: <E,A>(fas: readonly Future<E,A>[]) => Future<void, readonly Result<E,A>[]>
    readonly allValues: <E,A>(fas: readonly Future<E,A>[]) => Future<void, readonly A[]>
    readonly allErrors: <E,A>(fas: readonly Future<E,A>[]) => Future<void, readonly E[]>
}

const Future_ok: Future_['ok'] = value => Future( ok => ok(value) )
const Future_error: Future_['error'] = _err => Future( (_, err) => err(_err) )

const fromFunction: Future_['fromFunction'] = f => a => Future_.ok(f(a))

const fromPromise: Future_['fromPromise'] = p => {
    return Future( (ok, err) => {
        // tslint:disable-next-line: no-expression-statement
        Try( () => { 
            return p().then( value => ok(value)) 
        }).mapError( _err => err(_err))
    })
}

const fromResult: Future_['fromResult'] = r => {
    return Future( (ok, err) => {
        // tslint:disable-next-line: no-expression-statement
        r().fold(
            _err => err(_err),
            _val => ok(_val), 
        )
    })
}

const fromPromiseR: Future_['fromPromiseR'] = p => {
    return Future( (ok, err) => {
        // tslint:disable-next-line: no-expression-statement
        p().then( r => 
            r.fold(
                _err => err(_err),
                _val => ok(_val),
        ))  
    })
}

const fromValue: Future_['fromValue'] = v => {
    type A = ReturnType< typeof v>
    return Future_.fromResult( () => Result.Value<void,A>(v()))
}

const fromMaybe: Future_['fromMaybe'] = ma => {
    type A = Parameters<Parameters<ReturnType<typeof ma>['map']>[0]>[0]
    return Future_.fromResult<void,A>( () => Result.fromMaybe(ma()))
}

const fromEither: Future_['fromEither'] = ma => {
    return Future_.fromResult( () => Result.fromEither(ma()))
}


const flatten: Future_['flatten'] = ffa => {
    return Future( (ok, err) => {
        // tslint:disable-next-line: no-expression-statement
        ffa.runRThen(
            _err => err(_err),
            fa => fa.runRThen(
                _err => err(_err),
                _a   => ok(_a),
            ))
    })
}

/** Same as Promise.all() */
const allResults: Future_['allResults'] = fs => {
    return Future( (ok, error) => {
        const s0 = () => fs.map( fa => fa.runR())
        const s1 = () => Promise.all(s0())
            .then( results => ok(results))
        // tslint:disable-next-line: no-expression-statement
        s1() //run effect
    })
}

const allValues: Future_['allValues'] = fs => {
    return allResults(fs).map( rs => Result.allValues(rs))
}

const allErrors: Future_['allErrors'] = fs => {
    return allResults(fs).map( rs => Result.allErrors(rs))
}


export const Future_: Future_ = {
    ok: Future_ok,
    error: Future_error,
    fromFunction,
    fromPromise,
    fromResult,
    fromPromiseR,
    fromValue,
    fromMaybe,
    fromEither,
    flatten,
    allResults,
    allValues,
    allErrors,
}


// ------------------

// Informal Test

const Test1 = async () => {

    const f1 = Future<Error, number>( (ok, err) => {
        console.log(`--I'm inside the 'F1' Future--`)
        // tslint:disable-next-line: no-expression-statement
        ok(20)
    }).map( n => n * 100)

    const f2 = (n:number) => Future<Error, string>( (ok, err) => {
        console.log(`--I'm inside the 'F2' Future--`)
        // tslint:disable-next-line: no-expression-statement
        ok(`Yey Mrs Number '${n}'. Hello `)
        // err(Error(`ERROR:Yey Mrs Number '${n}'. Hello `))
    }).map( s => s + ` World !`)


    const f3 = f1.fold(
        err => `Finished: Throw this error --> ${err}`,
        value => `Finished: Successful, value --> ${ value }`,
    )


    const f4 = f1.fmap( n => f2(n))

    const defaultErrorMsg = `If you're looking this an left happned`
    const r1 = await f3.runA(defaultErrorMsg)
    const r2 = await f4.runA(defaultErrorMsg)

    console.log(r1)
    console.log(r2)

}

// join
const Test2 = () => {

    const fa = Future<Error,number>( ok => ok(10))
    const ffa = fa.map( num => Future<Error, number>( ok => ok(num) ) )
    const r = flatten(ffa)

    const a = r.runRThenF(
        err => `error happened: ${err}`,
        val => `Good value: ${val}`,
    )

}

//Test1()
//Test2()
