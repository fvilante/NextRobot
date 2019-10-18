
// ================================================
// Haskell Maybe
// ================================================

type Func<A,B> = (_:A) => B

// ThrowError :: Error e => e -> absurd
const ThrowError = <E extends Error> (err: E): never => {
    throw err
}

type MaybeMatcherFn<A,R> = {
    readonly Just: (a:A) => R
    readonly Nothing: R
}

// Maybe

export class _Just<A> {
    readonly kind: 'Just' = 'Just'
    constructor(private _value: A) { }
    readonly value = this._value
    static readonly of = <B>(value:B):_Just<B> => new _Just(value)
}

// todo: experimentar fazer o nothing um simbolo diferente de undefined
export class _Nothing<A> {
    readonly kind: 'Nothing' = 'Nothing'
    constructor(private _value: undefined) { }
    readonly value = this._value
    static readonly of = <B>(_: undefined): _Nothing<B> => new _Nothing<B>(undefined)
}


export const isJust = <A>(data: _Just<A> | _Nothing<A>): data is _Just<A> => 
    (<_Just<A>>data).kind === 'Just'

export const isNothing = <A>(data: _Just<A> | _Nothing<A>): data is _Nothing<A> => 
    (<_Nothing<A>>data).kind === 'Nothing'


export class Maybe<A> {

    constructor(private _value: _Just<A> | _Nothing<A> ) { }

    static readonly of = <B>(value: _Nothing<B> | _Just<B>): Maybe<B> =>
        isJust(value) 
           ? new Maybe(new _Just(value.value))
           : new Maybe(new _Nothing(undefined))


    readonly value = this._value

    // nothing :: Maybe m => () => m b
    static readonly Nothing = <B>(_: undefined = undefined): Maybe<B> => 
        new Maybe(new _Nothing<B>(_))
    
    // just :: Maybe m => b => m b
    static readonly Just = <B>(value:B):Maybe<B> => new Maybe(new _Just(value))

    // isNothing :: boolean
    readonly isNothing = !isJust(this._value)

    // isJust :: boolean
    readonly isJust = isJust(this._value)

    // map :: Maybe m => m a -> (a -> b) -> m b
    readonly map = <B>(f: Func<A, B>): Maybe<B> => 
        this.isNothing 
            ? Maybe.Nothing<B>() 
            : Maybe.Just( f( (this.value as _Just<A>).value ) )
    


    // fmap :: Maybe m => m a -> (a -> m b) -> m b
    readonly fmap = <B>(f: Func<A, Maybe<B>>): Maybe<B> => this.join(this.map(f))

    // join :: Maybe m => m m b -> m b 
    readonly join = <B>(mmb: Maybe<Maybe<B>>): Maybe<B> =>
        mmb.isNothing
            ? Maybe.Nothing<B>(undefined)
            : (mmb.value as _Just<Maybe<B>>).value




    //ATTENTION: Don't call unless you are sure you have a just
    readonly _fromJust = ():A | never => 
        this.isNothing
            ? ThrowError(new TypeError("Erro: Maybe lancou uma excessao em fromJust") )
            : (this.value as _Just<A>).value


    readonly match = <R>(matcher: MaybeMatcherFn<A,R>):R => {
        return this.isJust ? matcher.Just(this._fromJust()) : matcher.Nothing
    }


    // fromMaybe :: b -> Maybe b -> b 
    readonly fromMaybe = (default_: A) => Maybe.fromMaybe(default_)(this)
    static readonly fromMaybe = <B>(default_: B) => (mb: Maybe<B>):B =>
        mb.isNothing
            ? default_
            : mb._fromJust()


    // listToMaybe :: [b] -> Maybe b
    // Note: [b] is a list with one element (sigleton list)
    static readonly listToMaybe = <B>(arr: readonly B[]): Maybe<B> =>
        arr.length === 0 
            ? Maybe.Nothing<B>()
            : Maybe.Just(arr[0])   

    // maybeToList :: Maybe b -> [b] 
    static readonly maybeToList = <B>(mb: Maybe<B>): ReadonlyArray<B> =>
        mb.isNothing
            ? []
            : [mb._fromJust()]

    // catMaybes :: [Maybe b] -> [b]
    // takes a list of maybes and convert in a list of values (discarding Nothings)
    // fix: would accept a heterougeneous maybe array
    // fix: would use a reduce function for performance
    static readonly catMaybes = <B>(arr: ReadonlyArray<Maybe<B>>): ReadonlyArray<B> =>
        [...arr]
            .filter( m => m.isJust )
            .map( m => m._fromJust() )

        

}

// Helper constructors

export const Just = <A>(a: A): Maybe<A> => Maybe.Just(a)
// ATTENTION: You WOULD enter the type parameter explicitly when invoking Nothing (ie: Nothing<number>() )
export const Nothing = <A>(_: undefined = undefined) : Maybe<A> => Maybe.Nothing<A>(undefined)


// informal test

const Test = () => {

    const a = Just(10)
    const b = Nothing<number>()
    const c = 0//a.fromMaybe(50)
    const c2 = 0//b.fromMaybe(1000)

    console.log(a.isJust)

    console.log('funciona')

}



