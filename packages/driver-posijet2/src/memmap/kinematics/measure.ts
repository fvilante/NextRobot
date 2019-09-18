import { DIMENSION, add as dimensionAdder, sub as dimensionSubtracter, EXP, Result as ValidStaticNumbers } from "./dimension";
import  {

    Time,
    Angle,
    Space,
    Mass,

    UnitConversor as __UnitConversor,
    TypeConstructor,
    
    HKT,

    TypeUnits

} from './units-core'
import { mapObjectIndexed } from "@nextrobot/core-utils";




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
S extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
T extends TypeUnits['Time'],
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
    >(scalar: number, dimension: DIMENSION<L,T,A,M>, unit: UNIT<LU,TU,AU,MU> )
    : Measure<L,T,A,M,LU,TU,AU,MU> => ({scalar, dimension, unit})


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
    L extends EXP, 
    T extends EXP, 
    A extends EXP, 
    M extends EXP,
    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'], 
    >(a: Measure<L,T,A,M,LU,TU,AU,MU>) => (b: Measure<L,T,A,M,LU,TU,AU,MU>): Measure<L,T,A,M,LU,TU,AU,MU> => {
        return Measure(a.scalar + b.scalar, a.dimension, a.unit)
     }


/** subtracts b from a */
const sub = <
    L extends EXP, 
    T extends EXP, 
    A extends EXP, 
    M extends EXP,
    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'], 
    >(a: Measure<L,T,A,M,LU,TU,AU,MU>) => (b: Measure<L,T,A,M,LU,TU,AU,MU>): Measure<L,T,A,M,LU,TU,AU,MU> => {
        return Measure(a.scalar - b.scalar, a.dimension, a.unit)
     }



// MEASURE MULTIPLICATION OPERATIONS --------------------------------------------------------------- 

const mul = <
    L0 extends EXP, 
    T0 extends EXP, 
    A0 extends EXP, 
    M0 extends EXP,
    L1 extends EXP, 
    T1 extends EXP, 
    A1 extends EXP, 
    M1 extends EXP,
    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'], 
     >(a: Measure<L0,T0,A0,M0,LU,TU,AU,MU>, b: Measure<L1,T1,A1,M1,LU,TU,AU,MU>) => {
        
        const newScalar = a.scalar * b.scalar
        const newDimension = dimensionAdder(a.dimension, b.dimension)
        const newUnit = a.unit
        
        return Measure(newScalar, newDimension, newUnit)
      }



/** divides a by b*/
const div = <
    L0 extends EXP, 
    T0 extends EXP, 
    A0 extends EXP, 
    M0 extends EXP,
    L1 extends EXP, 
    T1 extends EXP, 
    A1 extends EXP, 
    M1 extends EXP,
    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'], 
      >(a: Measure<L0,T0,A0,M0,LU,TU,AU,MU>, b: Measure<L1,T1,A1,M1,LU,TU,AU,MU>) => {
          return Measure(a.scalar / b.scalar, dimensionSubtracter(a.dimension, b.dimension), a.unit)
       }



// MEASURE MULTIPLICATION BY SCALAR OPERATIONS --------------------------------------------------------------- 



const scalarMul = <
    L extends EXP, 
    T extends EXP, 
    A extends EXP, 
    M extends EXP,
    LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU extends TypeUnits['Time'],
    AU extends TypeUnits['Angle'],
    MU extends TypeUnits['Mass'], 
    >(scalar: number, o: Measure<L,T,A,M,LU,TU,AU,MU>): Measure<L,T,A,M,LU,TU,AU,MU> => {
        return Measure(scalar * o.scalar, o.dimension, o.unit)
     }


const scalarDiv = <
     L extends EXP, 
     T extends EXP, 
     A extends EXP, 
     M extends EXP,
     LU extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
     TU extends TypeUnits['Time'],
     AU extends TypeUnits['Angle'],
     MU extends TypeUnits['Mass'], 
     >(scalar: number, o: Measure<L,T,A,M,LU,TU,AU,MU>): Measure<L,T,A,M,LU,TU,AU,MU> => {
         return Measure(o.scalar / scalar, o.dimension, o.unit)
      }
 

// MEASURE MULTIPLICATION BY SCALAR OPERATIONS --------------------------------------------------------------- 

type UnitConversorArgument<
    L extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    T extends TypeUnits['Time'],
    A extends TypeUnits['Angle'],
    M extends TypeUnits['Mass'],    
    > = {
    readonly length: L
    readonly time: T
    readonly angle: A
    readonly mass: M

}

const UnitConversorArgument = <
    L extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    T extends TypeUnits['Time'],
    A extends TypeUnits['Angle'],
    M extends TypeUnits['Mass'],    
    >( lengthUnit: L, timeUnit: T, angleUnit: A, massUnit: M): UnitConversorArgument<L,T,A,M> => ({

        length: lengthUnit, 
        time: timeUnit, 
        angle: angleUnit, 
        mass: massUnit,

    })

const BASEUNIT: UnitConversorArgument<'m','min','rad','kg'> = {
    length: 'm',
    time: 'min',
    angle: 'rad',
    mass: 'kg',
}


const UnitConversor = <   
    L extends EXP, 
    T extends EXP, 
    A extends EXP, 
    M extends EXP,
    LU0 extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    TU0 extends TypeUnits['Time'],
    AU0 extends TypeUnits['Angle'],
    MU0 extends TypeUnits['Mass'], 
    LU1 extends TypeUnits['Space'], 
    TU1 extends TypeUnits['Time'],
    AU1 extends TypeUnits['Angle'],
    MU1 extends TypeUnits['Mass']> 
    (m: Measure<L,T,A,M,LU0,TU0,AU0,MU0>, newUnit: UnitConversorArgument<LU1,TU1,AU1,MU1>): Measure<L,T,A,M,LU1,TU1,AU1,MU1> => {


        const length = __UnitConversor(m.unit.length, newUnit.length)
        const time = __UnitConversor(m.unit.time, newUnit.time) 
        const angle = __UnitConversor(m.unit.angle, newUnit.angle)
        const mass = __UnitConversor(m.unit.mass, newUnit.mass) 

        const exp_length = Number(m.dimension.LENGTH)
        const exp_time = Number(m.dimension.TIME)
        const exp_angle = Number(m.dimension.ANGLE)
        const exp_mass = Number(m.dimension.MASS)


        const _newUnit = UNIT(newUnit.length, newUnit.time, newUnit.angle, newUnit.mass)
        const _newScalar = 
            m.scalar    * ( Math.pow(length.value.number,   exp_length) )
                        * ( Math.pow(time.value.number,     exp_time) )
                        * ( Math.pow(angle.value.number,     exp_angle) )
                        * ( Math.pow(mass.value.number,     exp_mass) )

        console.log('12093840138412384128341-23841')
        console.log(m.scalar)
        console.log(_newScalar)
        console.log(length.value.number, time.value.number, angle.value.number, mass.value.number)
        console.log(exp_length, exp_time, exp_angle, exp_mass)

        return Measure(_newScalar, m.dimension, _newUnit)

    }





const Test = () => {

    const t0 = TIME(2, 'min')
    const t1 = TIME(5, 'min')
    const s2 = mul(t0, t1)

    const j0 = scalarMul(2,s2)
    const j1 = scalarDiv(2,s2)

    const s0 = LENGTH(0, 'm')
    const s1 = LENGTH(10, 'mm')
    
    const a = sum(t0)(t1)
    //const b = sum(t0,s0) // OK -> error in type of s0
    
    const s0_ = UnitConversor(s0, {...BASEUNIT, length: 'mm'})

    const delta_t = sub(t1)(t0)
    const delta_s = sub(s1)(s0_)
    const velocity = div(delta_s, delta_t) 

    console.table(velocity) // Measure<"1", "-1", "0", "0">

    const acceleration = div(velocity, TIME(1, 'min'))
    const acceleration2 = div(delta_s, mul(TIME(1, 'min'), TIME(1, 'min')))

    const r = sum(acceleration)(acceleration2)

    console.table(acceleration) // Measure<"1", "-1", "0", "0">

    const acc_avanco = LINEARACCELERATION(10, 'm', 'sec')

    const fn = <L extends TypeUnits['Space'], T extends TypeUnits['Time']>(o: LINEARACCELERATION<L,T>) => {
        const a = o.unit
        console.table(o)
        return o
    }

    const x = fn(acc_avanco)

    console.table(delta_s.dimension)
    console.table(delta_s.scalar)
    console.table(delta_s.unit)

    const tt0 = TIME(10, 'sec')
    const tt1 = TIME(2, 'min')

    const tt1_ = UnitConversor(tt1, {...BASEUNIT, time: 'sec'})

    const summed = sum(tt0)(tt1_)

    const toPrint = [tt0, tt1, tt1_, summed]

    const print = () => {

        toPrint.map( measure => { 

            console.log()
            console.log('medida *******************')
            console.log(measure)
            console.log('table *******************')

            const b = () => mapObjectIndexed(measure.unit, (value, key) => {

                console.table(value.value)

            })

            // tslint:disable-next-line: no-expression-statement
            b()
            console.log()

        })
    }

    // tslint:disable-next-line: no-expression-statement
    print()

    console.log(tt1)
    console.log(tt1_)

    
}


const Test2 = () => {

    const tt0 = TIME(10, 'sec')
    const tt1 = TIME(2, 'min')

    const tt1_ = UnitConversor(tt1, {...BASEUNIT, time: 'sec'})

    console.log(tt1)
    console.log(tt1_)
}

// tslint:disable-next-line: no-expression-statement
Test2()




