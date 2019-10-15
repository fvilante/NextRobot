import { S, B, A } from "ts-toolbelt"
import { Reader } from "./reader"
import { Maybe } from "./maybe"
import { Either } from "./either"
import { Lens } from "./lens"
/** 
 * inspired in Cats, the Scala language's library, and in Haskell language.
 * 
 * see:
 *      cats source code:            https://github.com/typelevel/cats/blob/master/core/src/main/scala/cats/data/IndexedStateT.scala
 *      scala-tutorial state monad:  http://eed3si9n.com/learning-scalaz/State.html
 *      haskell wiki-book:           https://en.wikibooks.org/wiki/Haskell/Understanding_monads/State
 */


export type State<S,A> = {

    readonly kind: 'State'

    readonly run: (initialState: S) => readonly [S,A]

    readonly runA: (initialState: S) => A

    readonly runS: (initialState: S) => S

    /**
    * Return `valueB` and maintain the input state.
    */
    readonly pure: <B>(valueB: B) => State<S,B>

    /**
    * Modify the input state and return undefined.
    */
    readonly modify: (fn: (_:S) => S) => State<S, undefined>

    /**
    * Inspect a value from the input state, without modifying the state.
    */
    readonly inspect: <T>(fn: (_:S) => T) => State<S, T>

    /**
    * Return the input state without modifying it.
    */
    readonly get: () => State<S,S>

    /**
    * Set the state to `s` and return Unit.
    */
    readonly put: (_: S) => State<S, undefined>

    /**
    * Maps the return value
    */
    readonly map: <B>(f: (_:A) => B) => State<S,B>

    /**
    * Maps the return value and change state
    */
    readonly fmap: <B>(f: (_:A) => State<S,B>) => State<S,B>

}

export const State = <S,A>(nextState: (_:S) => readonly [S, A]): State<S,A> => {

    const identity = <T>(x:T) => x

    const run: State<S,A>['run'] = initialState => {
        return nextState(initialState)
    }

    const runA: State<S,A>['runA'] = initialState => {
        return nextState(initialState)[1]
    }
    
    const runS: State<S,A>['runS'] = initialState => {
        return nextState(initialState)[0]
    }

    const pure: State<S,A>['pure'] = value => {
        return State( (s0:S) => [runS(s0), value] )
    }

    const modify: State<S,A>['modify'] = fn => {
        return State( (s0:S) => [fn(runS(s0)), undefined] )
    }

    const inspect: State<S,A>['inspect'] = fn => {
        return State( (s0:S) => [s0, fn(s0)] )
    }

    const get: State<S,A>['get'] = () => {
        return inspect( identity )
    }

    const put: State<S,A>['put'] = newS0 => {
        return State( (otherS0:S) => [newS0,undefined] )
    }

    const map: State<S,A>['map'] = fn => {

        return State( (s0:S) => {
            const [sa, a] = run(s0)
            return [sa, fn(a)]
        } )

    }

    const fmap: State<S,A>['fmap'] = fn =>  {
        
        const f = (s0:S) => {
            const [sa, a] = run(s0)
            const stateB = fn(a)
            const [sb, b] = stateB.run(sa)
            return [sb, b] as const
        }

        return State(f)    

    }


    return {
        kind: 'State',
        run,
        runA,
        runS,
        pure,
        modify,
        inspect,
        get,
        put,
        map,
        fmap,
    }

}



// --- informal test ---


const Test1 = () => {
    // example of use 1

    type Store = {
        readonly input: readonly number[] 
    }

    const addToStore = (a: readonly number[]) => State( (s0: Store) => {
        const newStore = {...s0, input: [...s0.input, ...a] as const}
        return [newStore, undefined] as const
    } )

    const clearStore =  (s0: Store) => {
        return ({ input: [] });
    } 

    const s0 = addToStore( [1,2,3] )
    const s1 = s0.modify( clearStore )
    const s2 = s1.put( { input: [1,2,3,4] as const } )
    const s3 = s2.get()
    const s4 = s3.fmap( s => addToStore([10,20,30,99, ...s.input]) )

    console.log( s4.run({input: [ 80,90 ] }))


}


//



const Test2 = () => {
    
    type PState = {
        readonly phase: '0' | 'A' | 'B' | 'C' | 'D'
        readonly toProcess: readonly number[]
    }

    const PState: PState = {
        phase: 'A',
        toProcess: [666,777]
    }

    type BigStorage = {
        readonly foo: number,
        readonly bar: string,
        readonly qeux: readonly string[]
        readonly pstate: PState
    }

    const BigStorage: BigStorage = {
        foo: 10,
        bar: 'hi',
        qeux: ['hello', 'world'],
        pstate: PState,
    }


    const pstate: Lens<BigStorage,PState> = Lens(s => s.pstate, (s,a) => ({...s, pstate: a}) )



    const GetEnv = () => Reader( (x:BigStorage) => x)
    const GetLens = () => Lens<BigStorage,PState>(s => s.pstate, (s,a) => ({...s, pstate: a}) )



    const pushData = (data: readonly number[]) => GetEnv().map( bigStore => {
        return GetLens().modify(bigStore)( p => ({...p, toProcess: data} ))
    })

    const p1 = pushData([1,2,3,4])
    const p2 = pushData([6,7,8,9])
    const p3 = pushData([10,11,12])


    const s1 = pushData([1,2,3,4]).run(BigStorage)


}

// tslint:disable-next-line: no-expression-statement
//Test2()
