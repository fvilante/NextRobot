


export type TypedNumber<T> = {readonly number: number,  readonly type: T }
export const TypedNumber = <T>(number: number, type: T): TypedNumber<T> => ({ number, type })

type AnyTypedNumber = TypedNumber<string>


/*

type Formula = (space: number , time: number ) => number

const Formulas: {[K in string]: Formula} = {

    Time: (space, time) => time,
    Space: (space, time) => space,
    Velocity: (space, time) => space / time,
    Acceleraion: (space, time) => space / time^2

}
*/



type URIs = 'Time' | 'Space' | 'Angle' | 'Mass'


export type HKT<K extends URIs, A> = { 
    readonly kind: K, 
    readonly value: TypedNumber<A> 
}


// Units

type TimeUnit = 'sec' | 'min'
type SpaceUnit = 'mm' | 'm' | 'inch'
type AngleUnit = 'rad'
type MassUnit = 'kg'
type AnyUnit = TimeUnit | SpaceUnit | AngleUnit | MassUnit

export type TypeUnits = {
    readonly Time: TimeUnit 
    readonly Space: SpaceUnit
    readonly Angle: AngleUnit
    readonly Mass: MassUnit
}

const TypeUnits = {
    Time: ['sec', 'min'],
    Space: ['mm'],
    Angle: ['rad'],
    Mass: ['kg'],
} as const


// type constructors

export type Time<T extends TimeUnit> = HKT<'Time',T>
export type Space<S extends SpaceUnit> = HKT<'Space', S>
export type Angle<A extends AngleUnit> = HKT<'Angle', A>
export type Mass<M extends MassUnit> = HKT<'Mass', M>

type AnyAngle = Angle<AngleUnit>
type AnySpace = Space<SpaceUnit>
type AnyTime = Time<TimeUnit>
type AnyMass = Mass<MassUnit>


export const Angle = <A extends AngleUnit>(value: number, unit: A): Angle<A> => ({kind: 'Angle', value: TypedNumber(value, unit)})
export const Time = <T extends TimeUnit>(value: number, unit: T): Time<T> => ({kind: 'Time', value: TypedNumber(value, unit)})
export const Space = <S extends SpaceUnit>(value: number, unit: S): Space<S> => ({kind: 'Space', value: TypedNumber(value, unit)})
export const Mass = <M extends MassUnit>(value: number, unit: M): Mass<M> => ({kind: 'Mass', value: TypedNumber(value, unit)})


export const TypeConstructor = {
    Time,
    Space,
    Angle,
    Mass,
}


// Map - Type Conversion

type HKTMap<K extends URIs> = <A extends TypeUnits[K], B extends TypeUnits[K]>(o: HKT<K,A>, fn: (a: TypedNumber<A>) =>  TypedNumber<B>) => HKT<K,B> 

const lift = <K extends URIs, A extends  TypeUnits[K]>(ctor: (value: number, unit: A) => HKT<K,A>, v: TypedNumber<A>) => ctor(v.number, v.type)

const TimeMap: HKTMap<'Time'> = (o, fn) => lift(Time, fn(o.value))
const SpaceMap: HKTMap<'Space'> = (o, fn) => lift(Space, fn(o.value))
const AngleMap: HKTMap<'Angle'> = (o, fn) => lift(Angle, fn(o.value))
const MassMap: HKTMap<'Mass'> = (o, fn) => lift(Mass, fn(o.value))

const Map = {
    Time: TimeMap,
    Space: SpaceMap,
    Angle: AngleMap,
    Mass: MassMap,
}

type FromTo<A, B> = {
    readonly fromBase: (_: TypedNumber<B>) => TypedNumber<A>
    readonly toBase: (_:  TypedNumber<A>) => TypedNumber<B>
}

type ConversionTable<K extends URIs, B extends TypeUnits[K]> = {
    [A in TypeUnits[K]]: FromTo<A,B>
} & { readonly kind: K, readonly baseUnit: B }


const GetTimeConversionTable: () => ConversionTable<'Time', 'sec'> = () => {
    
    // helper ctors
    const _sec =  (n: number) => TypedNumber(n, 'sec' as const)
    const _min =  (n: number) => TypedNumber(n, 'min' as const)
    
    return {
        kind: 'Time',
        baseUnit: 'sec',

        sec: {
            fromBase: sec => sec,
            toBase: sec => sec,
        },
        min: {
            fromBase: sec => _min(sec.number/60),
            toBase: min => _sec(min.number*60),
        },

    }
}


const GetSpaceConversionTable: () => ConversionTable<'Space', 'mm'> = () => {    
    
    // helpers ctors
    const _mm = (n: number) => TypedNumber(n, 'mm' as  const)
    const _meter = (n: number) => TypedNumber(n, 'm' as  const)
    const _inch = (n: number) => TypedNumber(n, 'inch' as  const)

    return {
        kind: 'Space',
        baseUnit: 'mm',

        mm: {
            fromBase: mm => mm,
            toBase: mm => mm,
        },

        inch: {
            fromBase: mm => _inch(mm.number/25.4),
            toBase: inch => _mm(inch.number*25.4),
        },

        m: {
            fromBase: mm => _meter(mm.number/1000),
            toBase: meter => _mm(meter.number*1000),
        },    


    }
}

const GetAngleConversionTable: () => ConversionTable<'Angle', 'rad'> = () => {    
    return {
        kind: 'Angle',
        baseUnit: 'rad',

        rad: {
            fromBase: rad => rad,
            toBase: rad => rad,
        },
    }
}

const GetMassConversionTable: () => ConversionTable<'Mass', 'kg'> = () => {    
    return {
        kind: 'Mass',
        baseUnit: 'kg',

        kg: {
            fromBase: kg => kg,
            toBase: kg => kg,
        },
    }
}

const GetConversionTable = {
    Time: GetTimeConversionTable(),
    Space: GetSpaceConversionTable(),
    Angle: GetAngleConversionTable(),
    Mass: GetMassConversionTable(),
}

type ConvertionFn<A,B> = (a: TypedNumber<A>) => TypedNumber<B>

const getConvertionFn = <K extends URIs, A extends TypeUnits[K], B extends TypeUnits[K]>(kind: K, fromUnit:A, toUnit: B):ConvertionFn<A,B> => {
    const conversionTable = GetConversionTable[kind]
    
    type AnyDimension = URIs
    type AnyBaseUnit = typeof conversionTable.baseUnit
    type AnyConversionTable = ConversionTable<AnyDimension, AnyBaseUnit>
    type AnyUnit = TypeUnits[keyof TypeUnits]
    
    const anyConversionTable = conversionTable as AnyConversionTable
    const _fromUnit = fromUnit as AnyUnit
    const _toUnit = toUnit as AnyUnit

    type ToBase = FromTo<A,AnyBaseUnit>['toBase']
    type FromBase = FromTo<B,AnyBaseUnit>['fromBase']

    const toBase = anyConversionTable[_fromUnit].toBase as ToBase
    const fromBase = anyConversionTable[_toUnit].fromBase as FromBase
    const r = (v: TypedNumber<A>) =>  fromBase(toBase(v))
    return r
}



export const UnitConversor = <K extends URIs, A extends  TypeUnits[K], B extends TypeUnits[K]>(o: HKT<K,A>, newUnit: B): HKT<K,B> => {

    type AnyMapper = HKTMap<URIs>

    const convertionFn = getConvertionFn(o.kind, o.value.type, newUnit)
    const mapper = Map[o.kind] as AnyMapper
    const mapped = mapper(o, convertionFn)
    const r = mapped as HKT<K,B>
    return r 
    

}

const Test1 = () => {
    const t0 = Time(60,'sec')
    const t1 = UnitConversor(t0, 'min')
    
    const s0 = Space(25,'mm')
    const s1 = UnitConversor(s0,'inch')

    const m0 = Mass(25,'kg')
    const m1 = UnitConversor(s0,'inch')
    
    console.table(s0)
    console.table(s1)
}



// =========================================================================================================



export type LinearToAngular = 
    <A extends TypeUnits['Space']>(radius: Space<A>) => 
    <B extends TypeUnits['Space'], C extends TypeUnits['Angle']>(o: Space<B>, newUnit: C) => Angle<C>

export const LinearToAngular: LinearToAngular = radius => (o, newUnit) => {
    const twoPi = 2 * Math.PI
    const _radius = UnitConversor(radius, o.value.type)
    const _radiusLength = _radius.value.number
    const _linearLenght = o.value.number
    const angleInRad = Angle(_linearLenght / (_radiusLength * twoPi), 'rad') //todo: check this linear to rad numeric calc
    const r0 = UnitConversor(angleInRad, newUnit)
    return r0
}


const Test2 = () => {

    const pi = Math.PI

    const radius = Space(1, 'mm')
    const length = Space(2*pi, 'mm')
    const angle = LinearToAngular(radius)(length, 'rad')

    console.table(radius)
    console.table(length)
    console.table(angle)

}

// tslint:disable-next-line: no-expression-statement
Test2()



// ======================================================


type Sum =  <K extends URIs, A extends  TypeUnits[K]>(a: HKT<K,A>, b: HKT<K,A>) => HKT<K,A>
type Subtract = <K extends URIs, A extends  TypeUnits[K]>(a: HKT<K,A>, b: HKT<K,A>) => HKT<K,A>
type Multiply_ = <K extends URIs, A extends  TypeUnits[K], B extends  TypeUnits[K], C>(a: HKT<K,A>, b: HKT<K,B>) => "V"
type Divide =  <K extends URIs, A extends  TypeUnits[K], B extends  TypeUnits[K], C>(a: HKT<K,A>, b: HKT<K,B>) => "V"


const Sum: Sum = <K extends URIs, A extends  TypeUnits[K]>(a: HKT<K,A>, b: HKT<K,A>): HKT<K,A> =>{

    type TypeConstructor = (value:number, unit: A) => HKT<K, A>

    const ctor =  TypeConstructor[a.kind] as TypeConstructor
    const a0 = a.value.number
    const b0 = b.value.number
    const unit = a.value.type
    const summed = TypedNumber( a0 + b0 , unit ) 
    const r = lift(ctor, summed)
    return r 

}

/** subtract b from a */
const Subtract: Subtract = <K extends URIs, A extends  TypeUnits[K]>(a: HKT<K,A>, b: HKT<K,A>): HKT<K,A> => {
    type TypeConstructor = (value:number, unit: A) => HKT<K, A>
    const ctor =  TypeConstructor[a.kind] as TypeConstructor
    const bInverted = lift(ctor, TypedNumber(-b.value.number, b.value.type))
    return Sum(a, bInverted)
}


const Multiply_: Multiply_ = (a,b) => 'V'
const Divide: Divide = (a,b) => 'V'

const FieldConstructor = {
    Sum,
    Subtract,
    Multiply: Multiply_,
    Divide,
}


/*

type FieldOperations = keyof typeof FieldConstructor

type TypedOperationName =  'Multiply' | 'Divide'

type TypedNumberRelation<O extends TypedOperationName, A, B> = { readonly number: number, readonly type: readonly [O, A, B ]}

type MultipledTypedNumber<A,B> = TypedNumberRelation<'Multiply',A, B>
type DividedTypedNumber<A,B> = TypedNumberRelation<'Divide',A,B>

type VelocityFormula<S extends SpaceUnit, T extends TimeUnit> = DividedTypedNumber<S, T>
type AccelerationFormula<S extends SpaceUnit, T extends TimeUnit> = DividedTypedNumber<S, MultipledTypedNumber<T,T>>


type URI2 = 'Velocity' | 'Acceleration'

type AnyDisplacementUnit = TypeUnits['Space'] | TypeUnits['Angle']

type DisplacementTimeRelation<D extends AnyMotion, T extends AnyTime> = 'C'

type Velocity<K extends URI2, D extends AnyDisplacementUnit, T extends TimeUnit> = { 
    readonly kind: K,
    readonly  
    readonly displacement: D
    readonly time: T, 
    readonly spaceTimeRelation: DisplacementTimeRelation<M,T> }


type LinearVelocity<S extends TypeUnits['Space'], T extends TypeUnits['Time']> = Velocity<'Velocity', S, T>
type AngularVelocity<A extends TypeUnits['Angle'], T extends TypeUnits['Time']> =  Velocity<'Velocity', A, T>

type LinearVelocityConstructor = <S extends TypeUnits['Space'], T extends TypeUnits['Time']>(displacement: Space<S>, time: Time<T>) => LinearVelocity<S,T>
type AngularVelocityConstructor = <A extends TypeUnits['Angle'], T extends TypeUnits['Time']>(displacement: Angle<A>, time: Time<T>) => AngularVelocity<A,T>


/** Relates space and time */

/*
type LinearRelation<Space, Time> =  

type AnyFieldConstructor = typeof FieldConstructor[keyof typeof FieldConstructor]






const Multiply: Multiply_ = <K extends URIs, A extends  TypeUnits[K], B extends  TypeUnits[K], C>(a: HKT<K,A>, b: HKT<K,B>) => C

*/