
export type UNITNAME = string

type Kind<T extends string> = { readonly kind: T}

type EXPOENT = -2 | -1 | 0 | 1 | 2 


type UNITS = {
    readonly SPACE: 'mm' | 'm' | 'inch'
    readonly ANGLE: 'rad' | 'deg'
    readonly TIME: 's' | 'min'
}

type ALLDIMENSIONS = keyof UNITS

type ANYUNITS = UNITS[ALLDIMENSIONS]

type Dimension<K extends ALLDIMENSIONS, U extends UNITS[K], E extends EXPOENT> =  {
    readonly kind: K
    readonly exp: E
    readonly scalar: number
    readonly unit: U
} 

type AnyDimension = Dimension<ALLDIMENSIONS, ANYUNITS, EXPOENT>




type TIME<T extends UNITS['TIME'],  E extends EXPOENT> = Dimension<'TIME',T, E> 
type SPACE<S extends UNITS['SPACE'],  E extends EXPOENT> = Dimension<'SPACE', S, E> 
type ANGLE<A extends UNITS['ANGLE'],  E extends EXPOENT> = Dimension<'ANGLE', A, E> 

type ANYTIME = TIME<UNITS['TIME'], EXPOENT>
type ANYSPACE = SPACE<UNITS['SPACE'], EXPOENT>
type ANYANGLE = ANGLE<UNITS['ANGLE'], EXPOENT>


type Time<T extends UNITS['TIME']> = TIME<T, 1>
type Space<S extends UNITS['SPACE']> = SPACE<S, 1>
type Angle<A extends UNITS['ANGLE']> = ANGLE<A, 1>


const Time = <T extends UNITS['TIME']>(scalar: number, unit: T): Time<T> => ({kind:'TIME', exp:1, scalar, unit})
const Space = <S extends UNITS['SPACE']>(scalar: number, unit: S): Space<S> => ({kind:'SPACE', exp:1, scalar, unit})
const Angle = <A extends UNITS['ANGLE']>(scalar: number, unit: A): Angle<A> => ({kind:'ANGLE', exp:1, scalar, unit})

type DISPLACEMENT_UNITS = UNITS['SPACE' | 'ANGLE']

type DISPLACEMENT<D extends DISPLACEMENT_UNITS, E extends EXPOENT> = 
    D extends UNITS['SPACE']  ? SPACE<D, E> 
        : D extends UNITS['ANGLE'] ? ANGLE<D,E> : never 

type ANYDISPLACEMENT = DISPLACEMENT<DISPLACEMENT_UNITS, EXPOENT>

// ----


type DimensionMapperFn<
    K extends ALLDIMENSIONS,
    U extends UNITS[K],
    E extends EXPOENT> = {
    [X in keyof Dimension<K,U,E>]?: (a: Dimension<K,U,E>[X]) => Dimension<K,U,E>[X]
}

const DimensionMap = <
    K extends ALLDIMENSIONS,
    U extends UNITS[K],
    E extends EXPOENT,
    > (o: Dimension<K,U,E>, fn: DimensionMapperFn<K,U,E>): Dimension<K,U,E> => {

        const mappedData: Dimension<K,U,E> = {
            ...o,
            kind:   fn.kind     ? fn.kind(o.kind)       : o.kind,
            exp:    fn.exp      ? fn.exp(o.exp)         : o.exp,
            scalar: fn.scalar   ? fn.scalar(o.scalar)   : o.scalar,
            unit:   fn.unit     ? fn.unit(o.unit)       : o.unit,
        }

        return mappedData 
}



// tslint:disable: readonly-keyword readonly-array
type Linear<L extends EXPOENT, T extends EXPOENT> = ['L', L, 'T', T]
type Angular<A extends EXPOENT, T extends EXPOENT> = ['A', A, 'T', T]
// tslint:enable: readonly-keyword readonly-array

type LinearUniverse = {
    readonly Space: Linear<1,0>
    readonly Time: Linear<0,1>
    readonly Velocity: Linear<1,-1>
    readonly Accelertion: Linear<1,-2> 
}

type AngularUniverse = {
    readonly Space: Angular<1,0>
    readonly Time: Angular<0,1>
    readonly Velocity: Linear<1,-1>
    readonly Accelertion: Linear<1,-2> 
}

