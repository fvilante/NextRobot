
import { Reader } from "./reader"
import { Lens } from "./lens"
import comparator from "ramda/es/comparator"
import { Maybe, Nothing, Just } from "./maybe"
import { isArrayEqual } from "../type-utils/isEqual"
import { foldLeftArray } from "../array/foldLeftArray"
import { Message } from "../message/message"
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
    readonly monitor: <T>(fn: (_:S) => T) => State<S, T>

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

    const monitor: State<S,A>['monitor'] = fn => {
        return State( (s0:S) => { 
            const s1 = runS(s0)
            return [s1, fn(s1)] 
        })
    }

    const get: State<S,A>['get'] = () => {
        return State( (s0:S) => {
            const s1 = runS(s0)
            return [s1, s1] 
        })
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

    const fmap: State<S,A>['fmap'] = fn => {
        
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
        monitor,
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


// This test is not Finished (draft only, where just for provisory documentation)
const Test3 = () => {

    // internal state type

    type Comparator = {
        readonly buffer: readonly number[]
    } 

    // monad instantiation constructor 

    const getState = ():State<Comparator, undefined> => State( s => [s, undefined] )

    // ----- state transitions --------

    type Modifier<S> = (s:S) => S

    const pushSymbol = (symbol: number): Modifier<Comparator> => s => ({...s, buffer: [...s.buffer, symbol ]})
    const resetBuffer: Modifier<Comparator> = s => ({...s, buffer: [] })


    // ------- state inspector --------

    type Inspector<S,T> = (s: S) => T

    const compareTo = (symbols: readonly number[]): Inspector<Comparator, Maybe<boolean>> => s => { 
        //attention unsafe: change Maybe to Either<Error,..>. 
        //todo: make this function safe
        const r = symbols.length 
        const b = s.buffer.length
        const isError = b > r
        const cannotCompareYet = b < r
        const doCompare = () => isArrayEqual(s.buffer, symbols)
        return isError || cannotCompareYet 
            ? Nothing<boolean>()    // r !== b
            : Just( doCompare() )   // r === b

    }

    
    // fmapers 

    type Msgs = Message<'ESC', readonly number[]> | Message<'UNKNOWN', readonly number[]>

    const castBoolToMsg = (mb: Maybe<boolean>): State<Comparator, Maybe<Msgs>> => State( s => {
        const msgs = mb.map( b => 
                b ? Message('ESC', s.buffer) : Message('UNKNOWN', s.buffer)
            )
        return [s, msgs]
    })

    const resetBufferWhenDone = (mb: Maybe<Msgs>): State<Comparator, Maybe<Msgs>> => State (s => {
        const newS = mb.isJust ? resetBuffer(s) : s
        return [newS, mb]
    })

    // state operations finals

    const tokenComparator  = (token: readonly number[]) => (symbol: number): State<Comparator, Maybe<Msgs>> => 
                getState()
                .modify(  pushSymbol( symbol ) )
                .monitor( compareTo( token ) )
                .fmap( castBoolToMsg )
                .fmap( resetBufferWhenDone )

   

    
    const s0: Comparator = { buffer:[ ] } 

    const input = [1,2,3,4,5]

    type S2 = {
        readonly ms: State<Comparator, Maybe<Msgs>>
        readonly out: readonly Msgs[]

    }

   
    // This test is not Finished


}

// tslint:disable-next-line: no-expression-statement
//Test3()
