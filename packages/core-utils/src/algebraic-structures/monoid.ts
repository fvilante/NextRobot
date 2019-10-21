// inspired in static-land. See: https://github.com/fantasyland/static-land/blob/master/docs/spec.md

//todo: Document and automatic test algebra laws
export type Monoid<T> = {
    readonly concat: (a:T, b:T) => T
    readonly empty: () => T
}

export type AnyMonoid = Monoid<any>