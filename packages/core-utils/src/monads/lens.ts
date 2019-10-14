import { Maybe, Just, Nothing } from "./maybe"
import { Either } from "./either"



// todo: abstract modify metothds to 'modify' -> Functor[_]

/** 
 * A lens can be thought of as a first class getter/setter. A Lens[S, A] 
 * is a data type that knows how to get an A out of an S, or set an A in an S. */
export type Lens<S,A> = {
    readonly get: (s:S) => A
    readonly set: (s:S, a:A) => S
    readonly modify: (s:S) => (f: (_:A) => A) => S
    readonly modifyMaybe: (s:S) => (f: (_:A) => Maybe<A>) => Maybe<S>
    readonly modifyEither: (s:S) => <E>(f: (_:A) => Either<E,A>) => Either<E,S>
}

export const Lens = <S,A>(get: Lens<S,A>['get'], set: Lens<S,A>['set']): Lens<S,A> => {

    const modify: Lens<S,A>['modify'] = s => f => {
        return set(s, f( get(s) ))
    }

    const modifyMaybe: Lens<S,A>['modifyMaybe'] = s => f => {
        const ma = f(get(s))
        return ma.map( a => set(s,a))
    }

    const modifyEither: Lens<S,A>['modifyEither'] = s => f => {
        const ma = f(get(s))
        return ma.map( a => set(s,a))
    }

    return {
        get,
        set,
        modify,
        modifyMaybe,
        modifyEither,
    }

}

export type LensComposer = <A,B,C>(outer: Lens<A,B>, inner: Lens<B, C>) => Lens<A, C>

export const LensComposer: LensComposer = <A,B,C>(outer: Lens<A,B>, inner: Lens<B, C>): Lens<A, C> => {
    const get: Lens<A,C>['get'] = a => inner.get(outer.get(a))
    
    const set: Lens<A,C>['set'] = (a,c) => {
        const currentB = outer.get(a)
        const newB = inner.set(currentB, c)
        const newA = outer.set(a, newB)
        return newA

    }

    return Lens(get, set)
}


const Test1 = () => {

    // arbitrary data structure

    type StorageA = {
        readonly foo: number,
        readonly bar: string,
        readonly qeux: readonly string[]
        readonly pstate: readonly number[]
        readonly target: number | 'Surprise' 
    }

    const StorageA: StorageA = {
        foo: 2,
        bar: 'oi',
        qeux: ['hello', 'world'],
        pstate: [1,2,3],
        target: 777,
    }

    type StorageB = {
        readonly foo: number,
        readonly bar: string,
        readonly storageA: StorageA,
    }

    const StorageB: StorageB = {
        foo: 2,
        bar: 'oi',
        storageA:  StorageA,
    }

    type BigStorage = {
        readonly foo: number,
        readonly bar: string,
        readonly storageA: StorageA,
        readonly storageB: StorageB,
    }

    const BigStorage: BigStorage = {
        foo: 2,
        bar: 'oi',
        storageA: {...StorageA, target: 'Surprise' },
        storageB: StorageB,
    }

    // lenses

    const _StorageATarget : Lens<StorageA, StorageA['target']> = Lens( s => s.target, (s,a) => ({...s, target: a })) 
    const _StorageBStorageA : Lens<StorageB, StorageA> = Lens( s => s.storageA, (s,a) => ({ ...s, storageA: a }))
    const _BigStorageStorageB : Lens<BigStorage, StorageB> = Lens( s => s.storageB, (s,a) => ({...s, storageB: a}))

    // lens composition

    const _BigStorageStorageBTarget = LensComposer(LensComposer(_BigStorageStorageB, _StorageBStorageA), _StorageATarget)

    // lens alias

    const lens = _BigStorageStorageBTarget



    // lens test

    const a = lens.get(BigStorage) 

    console.log(a) // 777

    const b = lens.modify(BigStorage)( v => v!=='Surprise' ? 'Surprise' : 666 )

    console.log(b) // ok -> changed to 'Surprise'

}


// tslint:disable-next-line: no-expression-statement
//Test1()