
// Todo: Remove the old type Pair which is being using by other parts of core-utils 

/** note: Either has only one value of same time, Duple (from Tuple) has both values at same time */
// todo: Eager evaluation - Should it be lazy ?
export type Pair<A,B> = {
    readonly kind: 'Pair'
    readonly runUnsafe: () => readonly [A,B]
    readonly first: () => A
    readonly second: () => B
    readonly bimap: <C,D>(f: (_:A) => C, g: (_:B) => D) => Pair<C,D> 
}

export const Pair = <A,B>(a: A, b: B): Pair<A,B> => {

    type T = Pair<A,B>
    const runUnsafe: T['runUnsafe'] = () => [a, b] as readonly [A,B]

    const first: T['first'] = () => a

    const second: T['second'] = () => b

    const bimap: T['bimap'] = (f,g) => {
        return Pair(f(a),g(b)) //todo: mapleft mapright can be optimized if we avoid to construct it in terms of bimap because we omit the need for identity function
    }

    return {
        kind: 'Pair',
        runUnsafe,
        first,
        second,
        bimap,
    }
}