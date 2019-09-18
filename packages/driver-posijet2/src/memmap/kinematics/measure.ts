import { 
    Dimension as Expoent, 
    AnyDimension as AnyExpoent,
    add as dimensionAdder, 
    sub as dimensionSubtracter,
    EXP, 
    Result as ValidStaticNumbers 
} from "./dimension";

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




export type UnitSystem<
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



/** Define all primitive units */
export const UnitSystem = <
    L extends TypeUnits['Space'], //todo: change name convention: from 'Space' to 'Length'
    T extends TypeUnits['Time'],
    A extends TypeUnits['Angle'],
    M extends TypeUnits['Mass'],    
    >(u: UnitSystem<L,T,A,M>): UnitSystem<L,T,A,M> => ({

        length: u.length, 
        time: u.time, 
        angle: u.angle, 
        mass: u.mass,

})


type AnyUnitSystem = UnitSystem<TypeUnits['Space'], TypeUnits['Time'], TypeUnits['Angle'], TypeUnits['Mass']>


/** Unit System: International System */
export const InternationalSystem: UnitSystem<'m','min','rad','kg'> = {
    length: 'm',
    time: 'min',
    angle: 'rad',
    mass: 'kg',
}


type Measure<
    E extends AnyExpoent,
    U extends AnyUnitSystem,
    > = {
    readonly scalar: number
    readonly expoent: E
    readonly unitSystem: U
} 

const Measure = <
    E extends AnyExpoent,
    U extends AnyUnitSystem,
    >(scalar: number, expoent: E, unitSystem: U )
    : Measure<E,U> => ({scalar, expoent, unitSystem})



// DIMENSIONS:
// [LENGTH, TIME, ANGLE, MASS]

// TYPES ---------------------------------------------------------------------------


export type LENGTH<U extends AnyUnitSystem> =   Measure<Expoent<'1','0','0','0'>, U>
export type TIME<U extends AnyUnitSystem>  =   Measure<Expoent<'0','1','0','0'>, U>
export type ANGLE<U extends AnyUnitSystem> =   Measure<Expoent<'0','0','1','0'>, U>
export type MASS<U extends AnyUnitSystem>  =   Measure<Expoent<'0','0','0','1'>, U>

export type LINEARVELOCITY<U extends AnyUnitSystem> = Measure<Expoent<'1','-1','0','0'>, U>
export type LINEARACCELERATION<U extends AnyUnitSystem> = Measure<Expoent<'1','-2','0','0'>, U>

export type ANGULARVELOCITY<U extends AnyUnitSystem> = Measure<Expoent<'0','-1','1','0'>, U>
export type ANGULARACCELERATION<U extends AnyUnitSystem> = Measure<Expoent<'0','-2','1','0'>, U>



// TYPE CONSTRUCTORS --------------------------------------------------------------- 


export const LENGTH =  <U extends AnyUnitSystem>  (scalar: number, unitSystem: U): LENGTH<U> => Measure(scalar, Expoent('1','0','0','0'), unitSystem)
export const TIME =    <U extends AnyUnitSystem>  (scalar: number, unitSystem: U): TIME<U> =>   Measure(scalar, Expoent('0','1','0','0'), unitSystem)
export const ANGLE =   <U extends AnyUnitSystem>  (scalar: number, unitSystem: U): ANGLE<U> =>  Measure(scalar, Expoent('0','0','1','0'), unitSystem)
export const MASS =    <U extends AnyUnitSystem>  (scalar: number, unitSystem: U): MASS<U> =>   Measure(scalar, Expoent('0','0','0','1'), unitSystem)

export const LINEARVELOCITY = <U extends AnyUnitSystem>(scalar: number, unitSystem: U): LINEARVELOCITY<U> => Measure(scalar, Expoent('1','-1','0','0'), unitSystem)
export const LINEARACCELERATION = <U extends AnyUnitSystem>(scalar: number, unitSystem: U): LINEARACCELERATION<U> => Measure(scalar, Expoent('1','-2','0','0'), unitSystem)

export const ANGULARVELOCITY = <U extends AnyUnitSystem>(scalar: number, unitSystem: U): ANGULARVELOCITY<U> => Measure(scalar, Expoent('0','-1','1','0'), unitSystem)
export const ANGULARACCELERATION = <U extends AnyUnitSystem>(scalar: number, unitSystem: U): ANGULARACCELERATION<U> => Measure(scalar, Expoent('0','-2','1','0'), unitSystem)




// MEASURE ADDITION OPERATIONS --------------------------------------------------------------- 


export const sum = <
    E extends AnyExpoent,
    U extends AnyUnitSystem,
    >(a: Measure<E,U>, b: Measure<E,U>): Measure<E,U> => {
        return Measure(a.scalar + b.scalar, a.expoent, a.unitSystem)
     }


/** subtracts b from a */
export const sub = <
    E extends AnyExpoent,
    U extends AnyUnitSystem,
    >(a: Measure<E,U>, b: Measure<E,U>): Measure<E,U> => {
        return Measure(a.scalar - b.scalar, a.expoent, a.unitSystem)
     }



// MEASURE MULTIPLICATION OPERATIONS --------------------------------------------------------------- 

export const mul = <
    L0 extends EXP, 
    T0 extends EXP, 
    A0 extends EXP, 
    M0 extends EXP,
    L1 extends EXP, 
    T1 extends EXP, 
    A1 extends EXP, 
    M1 extends EXP,
    U extends AnyUnitSystem, 
    >(a: Measure<Expoent<L0,T0,A0,M0>,U>, b: Measure<Expoent<L1,T1,A1,M1>,U>) => {

        const newScalar = a.scalar * b.scalar
        const newExpoent = dimensionAdder(a.expoent, b.expoent)
        const newUnitSystem = a.unitSystem
        
        return Measure(newScalar, newExpoent, newUnitSystem)
    }



/** divides a by b*/
export const div = <
    L0 extends EXP, 
    T0 extends EXP, 
    A0 extends EXP, 
    M0 extends EXP,
    L1 extends EXP, 
    T1 extends EXP, 
    A1 extends EXP, 
    M1 extends EXP,
    U extends AnyUnitSystem, 
    >(a: Measure<Expoent<L0,T0,A0,M0>,U>, b: Measure<Expoent<L1,T1,A1,M1>,U>) => {

          return Measure(a.scalar / b.scalar, dimensionSubtracter(a.expoent, b.expoent), a.unitSystem)
          
    }



// MEASURE MULTIPLICATION BY SCALAR OPERATIONS --------------------------------------------------------------- 



export const scalarMul = <
    E0 extends AnyExpoent,
    E1 extends AnyExpoent,
    U extends AnyUnitSystem,
    >(scalar: number, o: Measure<E1,U>): Measure<E1,U> => {
        return Measure(scalar * o.scalar, o.expoent, o.unitSystem)
     }


export const scalarDiv = <
    E0 extends AnyExpoent,
    E1 extends AnyExpoent,
    U extends AnyUnitSystem,
    >(scalar: number, o: Measure<E1,U>):  Measure<E1,U> => {
         return Measure(o.scalar / scalar, o.expoent, o.unitSystem)
    }
 

// MEASURE MULTIPLICATION BY SCALAR OPERATIONS --------------------------------------------------------------- 


export const UnitSystemConversor = <   
    E extends AnyExpoent,
    UA extends AnyUnitSystem,
    UB extends AnyUnitSystem
    >(m: Measure<E,UA>, newUnitSystem: UB): Measure<E,UB> => {


        const length = __UnitConversor(Space(1, m.unitSystem.length), newUnitSystem.length)
        const time = __UnitConversor(Time(1, m.unitSystem.time), newUnitSystem.time) 
        const angle = __UnitConversor(Angle(1, m.unitSystem.angle), newUnitSystem.angle)
        const mass = __UnitConversor(Mass(1, m.unitSystem.mass), newUnitSystem.mass) 

        const exp_length = Number(m.expoent.length)
        const exp_time = Number(m.expoent.time)
        const exp_angle = Number(m.expoent.angle)
        const exp_mass = Number(m.expoent.mass)

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

        return Measure(_newScalar, m.expoent, newUnitSystem)

}



// informal test


const Test = () => {

    const US1 = InternationalSystem 
    const PO1 = UnitSystem({angle: 'rad', length: 'mm', mass: 'kg', time: 'sec'})
    const II1 = UnitSystem({angle: 'rad', length: 'inch', mass: 'kg', time: 'min'})

    const t0 = TIME(2, US1)
    const t1 = TIME(5, US1)
    const s2 = mul(t0, t1)

    const j0 = scalarMul(2,s2)
    const j1 = scalarDiv(2,s2)

    const s0 = LENGTH(0, US1)
    const s1 = LENGTH(10, US1)
    
    const a = sum(t0, t1)
    //const b = sum(t0,s0) // OK -> error in type of s0
    
    const s0_ = UnitSystemConversor(s0, US1)

    const delta_t = sub(t1, t0)
    const delta_s = UnitSystemConversor(sub(s1, s0_), US1 )
    const velocity = div(delta_s, delta_t) 

    console.table(velocity) // Measure<"1", "-1", "0", "0">

    const acceleration = div(velocity, TIME(1, US1))
    const acceleration2 = div(delta_s, mul(TIME(1, US1), TIME(1, US1)))

    const r = sum(acceleration, acceleration2)

    console.table(acceleration) // Measure<"1", "-1", "0", "0">

    const acc_avanco = LINEARACCELERATION(10, US1)

    const fn = <U extends AnyUnitSystem>(o: LINEARACCELERATION<U>) => {
        const a = o.unitSystem
        console.table(o)
        return o
    }

    const x = fn(acc_avanco)

    console.table(delta_s.expoent)
    console.table(delta_s.scalar)
    console.table(delta_s.unitSystem)

    const tt0 = TIME(10, PO1)
    const tt1 = TIME(2, PO1)

    const tt1_ = UnitSystemConversor(tt1, PO1)

    const summed = sum(tt0, tt1_)

    const toPrint = [tt0, tt1, tt1_, summed]

    const print = () => {

        toPrint.map( measure => { 

            console.log()
            console.log('medida *******************')
            console.log(measure)
            console.log('table *******************')

            const b = () => mapObjectIndexed(measure.unitSystem, (value, key) => {

                console.table(value)

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

    const US0 = InternationalSystem 

    const tt0 = TIME(10, US0)
    const tt1 = TIME(2, US0)

    const tt1_ = UnitSystemConversor(tt1, US0)

    console.log(tt1)
    console.log(tt1_)
}

const Test3 = () => {

    const US0 = InternationalSystem 

    const v0 = LINEARVELOCITY(10, US0)
    const v1 = UnitSystemConversor(LINEARVELOCITY(10, US0), US0)
    const delta_v = sub(v1, v0)

    const t0 = TIME(0, US0)
    const t1 = TIME(10, US0)
    const delta_t = sub(t1, t0)
    
    const delta_t_ = UnitSystemConversor(delta_t, US0)

    const acceleration = div(delta_v, delta_t_)
    
}

const Test4 = () => {

    const US0 = InternationalSystem
    const BR1 = UnitSystem({...InternationalSystem, time: 'sec'})

    const s0 = LENGTH(10, US0)
    const s1 = LENGTH(20, US0)
    const delta_s = sub(s1, s0)

    const t0 = TIME(2, US0)
    const t1 = UnitSystemConversor(t0, BR1)
    const delta_t = sub(t1, UnitSystemConversor(t0, BR1))

    const d = div(delta_s, UnitSystemConversor(delta_t, US0))

    console.log(t0)
    console.log(t1)

}


// tslint:disable: no-expression-statement

const runAllTests = () => {
    Test()
    Test2()
    Test3()
    Test4()
}


runAllTests()




