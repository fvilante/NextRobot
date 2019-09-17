import { DIMENSION, ANYDIMENSION, add as dimensionAdder, sub as dimensionSubtracter, EXP, Result } from "./dimension-operation";




type Measure<T extends Result, L extends Result, A extends Result, M extends Result> = {
    readonly scalar: number
    readonly dimension: DIMENSION<T,L,A,M> 
} 

const Measure = <T extends Result, L extends Result, A extends Result, M extends Result>(scalar: number, dimension: DIMENSION<T,L,A,M>): Measure<T,L,A,M> => ({scalar, dimension})


// DIMENSIONS:
// [LENGTH, TIME, ANGLE, MASS]

// TYPES ---------------------------------------------------------------------------

type ADIMENSIONAL = Measure<'0','0','0','0'>
type TIME = Measure<'0','1','0','0'>
type LENGTH = Measure<'1','0','0','0'>
type ANGLE = Measure<'0','0','1','0'>
type MASS = Measure<'0','0','0','1'>

type LINEARVELOCITY = Measure<'1','-1','0','0'>
type LINEARACCELERATION = Measure<'1','-2','0','0'>

type ANGULARVELOCITY = Measure<'0','-1','1','0'>
type ANGULARACCELERATION = Measure<'0','-2','1','0'>

// TYPE CONSTRUCTORS --------------------------------------------------------------- 


const ADIMENSIONAL = (scalar: number): ADIMENSIONAL => ({ scalar, dimension: DIMENSION('0','0','0','0')})

const TIME = (scalar: number): TIME => ({ scalar, dimension: DIMENSION('0','1','0','0')})
const LENGTH = (scalar: number): LENGTH => ({ scalar, dimension: DIMENSION('1','0','0','0')})
const ANGLE = (scalar: number): ANGLE => ({ scalar, dimension: DIMENSION('0','0','1','0')})
const MASS = (scalar: number): MASS => ({ scalar, dimension: DIMENSION('0','0','0','1')})

const LINEARVELOCITY = (scalar: number): LINEARVELOCITY => ({ scalar, dimension: DIMENSION('1','-1','0','0')})
const LINEARACCELERATION = (scalar: number): LINEARACCELERATION => ({ scalar, dimension: DIMENSION('1','-2','0','0')})

const ANGULARVELOCITY = (scalar: number): ANGULARVELOCITY => ({ scalar, dimension: DIMENSION('0','-1','1','0')})
const ANGULARACCELERATION = (scalar: number): ANGULARACCELERATION => ({ scalar, dimension: DIMENSION('0','-2','1','0')})


// MEASURE ADDITION OPERATIONS --------------------------------------------------------------- 


const sum = <
    T extends EXP, 
    L extends EXP, 
    A extends EXP, 
    M extends EXP
    >(a: Measure<T,L,A,M>, b: Measure<T,L,A,M>): Measure<T,L,A,M> => {
        return Measure(a.scalar + b.scalar, b.dimension)
     }


/** subtracts b from a */
const sub = <
     T extends EXP, 
     L extends EXP, 
     A extends EXP, 
     M extends EXP
     >(a: Measure<T,L,A,M>, b: Measure<T,L,A,M>): Measure<T,L,A,M> => {
         return Measure(a.scalar - b.scalar, b.dimension)
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
     >(a: Measure<T0,L0,A0,M0>, b: Measure<T1,L1,A1,M1>) => {
         return Measure(a.scalar * b.scalar, dimensionAdder(a.dimension, b.dimension))
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
      >(a: Measure<T0,L0,A0,M0>, b: Measure<T1,L1,A1,M1>) => {
          return Measure(a.scalar / b.scalar, dimensionSubtracter(a.dimension, b.dimension))
       }


const Test = () => {

    const t0 = TIME(2)
    const t1 = TIME(5)
    const j = mul(t0,t1)
    const s0 = TIME(0)
    const s1 = LENGTH(10)
    
    const a = sum(t0,t1)
    //const b = sum(t0,s0) // OK -> error in type of s0
    
    const delta_t = sub(t1,t0)
    const delta_s = sub(s1,s0)
    const velocity = div(delta_s, delta_t) 

    console.table(velocity) // Measure<"1", "-1", "0", "0">

    const acceleration = div(velocity, TIME(1))
    const acceleration2 = div(delta_s, mul(TIME(1), TIME(1)))

    const r = sum(acceleration,acceleration2)

    console.table(acceleration) // Measure<"1", "-1", "0", "0">

    const acc_avanco = LINEARACCELERATION(10)

    
}

// tslint:disable-next-line: no-expression-statement
Test()




