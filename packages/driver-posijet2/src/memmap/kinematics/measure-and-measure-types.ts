import { DIMENSION, ANYDIMENSION, add as dimensionAdder, sub as dimensionSubtracter, EXP, Result as ValidStaticNumbers } from "./dimension-operation";

import  {

    Time,
    Angle,
    Space,
    Mass,

    UnitConversor,
    TypeConstructor,
    
    HKT,

    TypeUnits

} from './units-core'
import { T } from "ts-toolbelt";


const BASE_UNIT : UNIT<'m','min','rad','kg'> = {
    length: TypeConstructor.Space(1,'m'),
    time: TypeConstructor.Time(1,'min'),
    angle: TypeConstructor.Angle(1,'rad'),
    mass: TypeConstructor.Mass(1,'kg'),
} as const

type BASE_UNIT = typeof BASE_UNIT



type UNIT<
    S extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    T extends TypeUnits['Time'],
    A extends TypeUnits['Angle'],
    M extends TypeUnits['Mass'],    
    > = {

    readonly length: Space<S>
    readonly time: Time<T>
    readonly angle: Angle<A>
    readonly mass: Mass<M>

}

const UNIT = <
T extends TypeUnits['Time'],
S extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
A extends TypeUnits['Angle'],
M extends TypeUnits['Mass'],    
>( lengthUnit: S, timeUnit: T, angleUnit: A, massUnit: M): UNIT<S,T,A,M> => ({

    length: Space(1, lengthUnit), 
    time: Time(1, timeUnit), 
    angle: Angle(1, angleUnit), 
    mass: Mass(1, massUnit)

})




type Measure<
    T extends ValidStaticNumbers, 
    L extends ValidStaticNumbers,
    A extends ValidStaticNumbers, 
    M extends ValidStaticNumbers,
    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'],  

    > = {
    
    readonly scalar: number
    readonly dimension: DIMENSION<T,L,A,M> 
    readonly unit: UNIT<LU,TU,AU,MU>
} 

const Measure = <
    L extends ValidStaticNumbers,
    T extends ValidStaticNumbers, 
    A extends ValidStaticNumbers, 
    M extends ValidStaticNumbers,

    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'],    
    >(scalar: number, dimension: DIMENSION<T,L,A,M>, unit: UNIT<LU,TU,AU,MU> )
    : Measure<T,L,A,M,LU,TU,AU,MU> => ({scalar, dimension, unit})


// DIMENSIONS:
// [LENGTH, TIME, ANGLE, MASS]

// TYPES ---------------------------------------------------------------------------

type ADIMENSIONAL = Measure<'0','0','0','0','m','min','rad','kg'>

type LENGTH<L extends   TypeUnits['Space']> =   Measure<'1','0','0','0',L,'min','rad','kg'>
type TIME<T extends     TypeUnits['Time']>  =   Measure<'0','1','0','0','m',T,'rad','kg'>
type ANGLE<A extends    TypeUnits['Angle']> =   Measure<'0','0','1','0','m','min',A,'kg'>
type MASS<M extends     TypeUnits['Mass']>  =   Measure<'0','0','0','1','m','min','rad',M>

type LINEARVELOCITY<        L extends TypeUnits['Space'], T extends TypeUnits['Time']> = Measure<'1','-1','0','0',L,T,'rad','kg'>
type LINEARACCELERATION<    L extends TypeUnits['Space'], T extends TypeUnits['Time']> = Measure<'1','-2','0','0',L,T,'rad','kg'>

type ANGULARVELOCITY<       A extends TypeUnits['Angle'], T extends TypeUnits['Time']> = Measure<'0','-1','1','0','m',T,A,'kg'>
type ANGULARACCELERATION<   A extends TypeUnits['Angle'], T extends TypeUnits['Time']> = Measure<'0','-2','1','0','m',T,A,'kg'>



// TYPE CONSTRUCTORS --------------------------------------------------------------- 


const ADIMENSIONAL = (scalar: number): ADIMENSIONAL => Measure(scalar, DIMENSION('0','0','0','0'), UNIT('m', 'min', 'rad','kg'))

const LENGTH =  <L extends TypeUnits['Space']>  (scalar: number, lengthUnit: L): LENGTH<L> =>   Measure(scalar, DIMENSION('1','0','0','0'), UNIT(lengthUnit, 'min',  'rad','kg'))
const TIME =    <T extends TypeUnits['Time']>   (scalar: number, timeUnit: T): TIME<T> =>       Measure(scalar, DIMENSION('0','1','0','0'), UNIT('m', timeUnit, 'rad','kg'))
const ANGLE =   <A extends TypeUnits['Angle']>  (scalar: number, angleUnit: A): ANGLE<A> =>     Measure(scalar, DIMENSION('0','0','1','0'), UNIT('m', 'min', angleUnit,'kg'))
const MASS =    <M extends TypeUnits['Mass']>   (scalar: number, massUnit: M): MASS<M> =>       Measure(scalar, DIMENSION('0','0','0','1'), UNIT('m', 'min', 'rad', massUnit))

const LINEARVELOCITY = <L extends TypeUnits['Space'], T extends TypeUnits['Time']>(scalar: number, lengthUnit: L, timeUnit: T): LINEARVELOCITY<L,T> => Measure(scalar, DIMENSION('1','-1','0','0'), UNIT(lengthUnit, timeUnit, 'rad', 'kg'))
const LINEARACCELERATION = <L extends TypeUnits['Space'], T extends TypeUnits['Time']>(scalar: number, lengthUnit: L, timeUnit: T): LINEARACCELERATION<L,T> => Measure(scalar, DIMENSION('1','-2','0','0'), UNIT(lengthUnit, timeUnit, 'rad', 'kg'))

const ANGULARVELOCITY = <A extends TypeUnits['Angle'], T extends TypeUnits['Time']>(scalar: number, angleUnit: A, timeUnit: T): ANGULARVELOCITY<A,T> => Measure(scalar, DIMENSION('0','-1','1','0'), UNIT('m', timeUnit, angleUnit, 'kg'))
const ANGULARACCELERATION = <A extends TypeUnits['Angle'], T extends TypeUnits['Time']>(scalar: number, angleUnit: A, timeUnit: T): ANGULARACCELERATION<A,T> => Measure(scalar, DIMENSION('0','-2','1','0'), UNIT('m', timeUnit, angleUnit, 'kg'))


// MEASURE ADDITION OPERATIONS --------------------------------------------------------------- 


const sum = <
    T extends EXP, 
    L extends EXP, 
    A extends EXP, 
    M extends EXP,
    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'], 
    >(a: Measure<L,T,A,M,LU,TU,AU,MU>, b: Measure<L,T,A,M,LU,TU,AU,MU>): Measure<L,T,A,M,LU,TU,AU,MU> => {
        return Measure(a.scalar + b.scalar, a.dimension, a.unit)
     }


/** subtracts b from a */
const sub = <
    T extends EXP, 
    L extends EXP, 
    A extends EXP, 
    M extends EXP,
    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'], 
    >(a: Measure<L,T,A,M,LU,TU,AU,MU>, b: Measure<L,T,A,M,LU,TU,AU,MU>): Measure<L,T,A,M,LU,TU,AU,MU> => {
        return Measure(a.scalar - b.scalar, a.dimension, a.unit)
     }



// MEASURE MULTIPLICATION OPERATIONS --------------------------------------------------------------- 

const mul = <
    T0 extends EXP, 
    L0 extends EXP, 
    A0 extends EXP, 
    M0 extends EXP,
    T1 extends EXP, 
    L1 extends EXP, 
    A1 extends EXP, 
    M1 extends EXP,
    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'], 
     >(a: Measure<L0,T0,A0,M0,LU,TU,AU,MU>, b: Measure<L1,T1,A1,M1,LU,TU,AU,MU>) => {
         return Measure(a.scalar * b.scalar, dimensionAdder(a.dimension, b.dimension), a.unit)
      }






/** divides a by b*/
const div = <
    T0 extends EXP, 
    L0 extends EXP, 
    A0 extends EXP, 
    M0 extends EXP,
    T1 extends EXP, 
    L1 extends EXP, 
    A1 extends EXP, 
    M1 extends EXP,
    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'], 
      >(a: Measure<L0,T0,A0,M0,LU,TU,AU,MU>, b: Measure<L1,T1,A1,M1,LU,TU,AU,MU>) => {
          return Measure(a.scalar / b.scalar, dimensionSubtracter(a.dimension, b.dimension), a.unit)
       }


const Test = () => {

    const t0 = TIME(2, 'sec')
    const t1 = TIME(5, 'min')
    const j = mul(t0,t1)
    const s0 = LENGTH(0, 'm')
    const s1 = LENGTH(10, 'm')
    
    const a = sum(t0,t1)
    //const b = sum(t0,s0) // OK -> error in type of s0
    
    const delta_t = sub(t1,t0)
    const delta_s = sub(s1,s0)
    const velocity = div(delta_s, delta_t) 

    console.table(velocity) // Measure<"1", "-1", "0", "0">

    const acceleration = div(velocity, TIME(1, 'min'))
    const acceleration2 = div(delta_s, mul(TIME(1, 'min'), TIME(1, 'min')))

    const r = sum(acceleration,acceleration2)

    console.table(acceleration) // Measure<"1", "-1", "0", "0">

    const acc_avanco = LINEARACCELERATION(10, 'm', 'sec')

    const fn = <L extends TypeUnits['Space'], T extends TypeUnits['Time']>(o: LINEARACCELERATION<L,T>) => {
        const a = o.unit
        console.table(o)
    }

    
}

// tslint:disable-next-line: no-expression-statement
Test()




