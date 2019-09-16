
export type UNITNAME = string

type Kind<T extends string> = { readonly kind: T}

type EXPOENT = -2 | -1 | 0 | 1 | 2 


type UNITS = {
    readonly LENGTH: 'mm' | 'm' | 'inch'
    readonly ANGLE: 'rad' | 'deg'
    readonly TIME: 's' | 'min'
}

type ALLDIMENSIONS = keyof UNITS

type ANYUNIT = UNITS[ALLDIMENSIONS]


// ----
// ----






type Dimension<K extends ALLDIMENSIONS, U extends UNITS[K], E extends EXPOENT> = {
    readonly kind: K
    readonly unit: U
    readonly exp: E
}

type AnyDimension = Dimension<ALLDIMENSIONS, ANYUNIT, EXPOENT>

type LENGHT<U extends UNITS['LENGTH'], E extends EXPOENT = EXPOENT> = Dimension<'LENGTH', U, E>
type ANGLE<U extends UNITS['ANGLE'], E extends EXPOENT = EXPOENT> = Dimension<'ANGLE', U, E>
type TIME<U extends UNITS['TIME'], E extends EXPOENT = EXPOENT> = Dimension<'TIME', U, E>
type DISPLACEMENT<U extends UNITS['ANGLE' | 'LENGTH'], E extends EXPOENT = EXPOENT> = 
    U extends UNITS['LENGTH'] ? LENGHT<U,E> :
    U extends UNITS['ANGLE'] ? ANGLE<U,E> : never 


type ANYLENGTH<E extends EXPOENT = EXPOENT> = LENGHT<UNITS['LENGTH'], E>
type ANYANGLE<E extends EXPOENT = EXPOENT> = ANGLE<UNITS['ANGLE'], E>
type ANYTIME<E extends EXPOENT = EXPOENT> = TIME<UNITS['TIME'], E>
type ANYDISPLACEMENT<E extends EXPOENT = EXPOENT> = DISPLACEMENT<UNITS['ANGLE' | 'LENGTH'], E>



type Measure<
    D extends ANYANGLE | ANYLENGTH | 'None',
    T extends ANYTIME | 'None',
    > = { 
    readonly scalar: number, 
    readonly DA: { 
        readonly D: D, 
        readonly T: T 
        }
    }


type AnyMeasure = {
    readonly Time:                  Measure< 'None',             ANYTIME<1>>
    readonly Frequency:             Measure< 'None',             ANYTIME<-1>>
    readonly Angle:                 Measure< ANYANGLE<1>,        'None'>
    readonly Length:                Measure< ANYLENGTH<1>,       'None'>
    readonly LinearVelocity:        Measure< ANYLENGTH<1>,       ANYTIME<-1>>
    readonly AngularVelocity:       Measure< ANYANGLE<1>,        ANYTIME<-1>>
    readonly LinearAcceleration:    Measure< ANYLENGTH<1>,       ANYTIME<-2>>
    readonly AngularAcceleration:   Measure< ANYANGLE<1>,        ANYTIME<-2>>
    readonly AnyMeasure:            Measure< ANYDISPLACEMENT,    ANYTIME>

    readonly Velocity:              AnyMeasure['LinearVelocity']       | AnyMeasure['AngularVelocity']
    readonly Acceleration:          AnyMeasure['LinearAcceleration']   | AnyMeasure['AngularAcceleration']
    readonly Displacement:          AnyMeasure['Length']               | AnyMeasure['Angle']
}




type TimeConstructor = <
    U extends UNITS['TIME'],
    >(scalar: number, unit: U) => Measure<'None', TIME<U,1>>

type FrequencyConstructor = <
    U extends UNITS['TIME'],
    >(scalar: number, unit: U) => Measure<'None', TIME<U,-1>>


type AngleConstructor = <
    U extends UNITS['ANGLE'],
    >(scalar: number, unit: U) => Measure<ANGLE<U,1>, 'None'>

type LengthConstructor = <
    U extends UNITS['LENGTH'],
    >(scalar: number, unit: U) => Measure<LENGHT<U,1>, 'None'>

type LinearVelocityConstructor = <
    L extends UNITS['LENGTH'],
    T extends UNITS['TIME'],
    >(scalar: number, lenghtUnit: L, timeUnit: T) => Measure<LENGHT<L,1>, TIME<T,-1>>    

type AngularVelocityConstructor = <
    L extends UNITS['ANGLE'],
    T extends UNITS['TIME'],
    >(scalar: number, lenghtUnit: L, timeUnit: T) => Measure<ANGLE<L,1>, TIME<T,-1>>    

type LinearAccelerationConstructor = <
    L extends UNITS['LENGTH'],
    T extends UNITS['TIME'],
    >(scalar: number, lenghtUnit: L, timeUnit: T) => Measure<LENGHT<L,1>, TIME<T,-2>>    

    
type AngularAccelerationConstructor = <
    L extends UNITS['ANGLE'],
    T extends UNITS['TIME'],
    >(scalar: number, lenghtUnit: L, timeUnit: T) => Measure<ANGLE<L,1>, TIME<T,-2>>

type VelocityConstructor = <
    D extends UNITS['LENGTH'] | UNITS['ANGLE'],
    T extends UNITS['TIME'],
    >(scalar: number, displacementUnit: D, timeUnit: T) => Measure<DISPLACEMENT<D,1>, TIME<T,-1>>

type AccelerationConstructor = <
    D extends UNITS['LENGTH'] | UNITS['ANGLE'],
    T extends UNITS['TIME'],
    >(scalar: number, displacementUnit: D, timeUnit: T) => Measure<DISPLACEMENT<D,1>, TIME<T,-2>>

type DisplacementConstructor = <
    D extends UNITS['LENGTH'] | UNITS['ANGLE'],
    >(scalar: number, displacementUnit: D) => Measure<DISPLACEMENT<D,1>, 'None'>

type Constructor = {
    readonly Time: TimeConstructor
    readonly Frequency: FrequencyConstructor
    readonly Angle: AngleConstructor
    readonly Length: LengthConstructor
    readonly LinearVelocity: LinearVelocityConstructor
    readonly AngularVelocity: AngularVelocityConstructor
    readonly LinearAcceleration: LinearAccelerationConstructor
    readonly AngularAcceleration: AngularAccelerationConstructor
    //readonly AnyMeasure: AnyMeasureConstructor
    
    //readonly Velocity: VelocityConstructor
    //readonly Acceleration: AccelerationConstructor
    //readonly Displacement: DisplacementConstructor
}

const Constructor: Constructor = {
    Time:                   (scalar, unit) =>   ({ scalar, DA: { D: 'None',                             T: { kind: 'TIME', unit, exp: 1 } } } ),
    Frequency:              (scalar, unit) =>   ({ scalar, DA: { D: 'None',                             T: { kind: 'TIME', unit, exp: -1 } } } ),
    Angle:                  (scalar, unit) =>   ({ scalar, DA: { D: { kind: 'ANGLE', unit, exp: 1},     T: 'None' } } ),
    Length:                 (scalar, unit) =>   ({ scalar, DA: { D: { kind: 'LENGTH', unit, exp: 1},    T: 'None' } } ),
    
    LinearVelocity:         (scalar, lenghtUnit, timeUnit) =>   ({ scalar, DA: { D: { kind: 'LENGTH', unit: lenghtUnit, exp: 1},   T: { kind: 'TIME', unit: timeUnit, exp: -1 } } } ),
    AngularVelocity:        (scalar, lenghtUnit, timeUnit) =>   ({ scalar, DA: { D: { kind: 'ANGLE', unit: lenghtUnit, exp: 1},    T: { kind: 'TIME', unit: timeUnit, exp: -1 } } } ),
    LinearAcceleration:     (scalar, lenghtUnit, timeUnit) =>   ({ scalar, DA: { D: { kind: 'LENGTH', unit: lenghtUnit, exp: 1},   T: { kind: 'TIME', unit: timeUnit, exp: -2 } } } ),
    AngularAcceleration:    (scalar, lenghtUnit, timeUnit) =>   ({ scalar, DA: { D: { kind: 'ANGLE', unit: lenghtUnit, exp: 1},    T: { kind: 'TIME', unit: timeUnit, exp: -2 } } } ),
    //AnyMeasure:
    
    // todo: create (linear | angular) constructors bellow

    //Velocity:               
    //Acceleration:
    //Displacement:

}

/** convert units of pure primitives */
const TimeUnitConversion = <
    A extends UNITS['TIME'],
    B extends UNITS['TIME'],
    >(  a: Measure<'None', TIME<A>>, 
        newUnit: B , 
        ): Measure<'None', TIME<B>> => {
        
        //fix: put real transformatin here
        const newScalar = a.scalar * 2
           
        return {...a, scalar: newScalar, DA: { ...a.DA, T: { ...a.DA.T, unit: newUnit} }}
}


/** convert units of pure primitives */
const LengthUnitConversion = <
    A extends UNITS['LENGTH'],
    B extends UNITS['LENGTH'],
    >(  a: Measure<LENGHT<A>, 'None'>, 
        newUnit: B , 
        ): Measure<LENGHT<B>, 'None'> => {
        
        //fix: put real transformatin here
        const newScalar = a.scalar * 2      
           
        return {...a, scalar: newScalar, DA: { ...a.DA, D: { ...a.DA.D, unit: newUnit} }}
}

/** convert units of pure primitives */
const AngleUnitConversion = <
    A extends UNITS['ANGLE'],
    B extends UNITS['ANGLE'],
    >(  a: Measure<ANGLE<A>, 'None'>, 
        newUnit: B , 
        ): Measure<ANGLE<B>, 'None'> => {
        
        //fix: put real transformatin here
        const newScalar = a.scalar * 2      
           
        return {...a, scalar: newScalar, DA: { ...a.DA, D: { ...a.DA.D, unit: newUnit} }}
}


const Sum = <
    D extends UNITS['ANGLE'] | UNITS['LENGTH'],
    T extends UNITS['TIME'] ,
    >(  a: Measure<DISPLACEMENT<D> | 'None', TIME<T> | 'None'>, 
        b: Measure<DISPLACEMENT<D> | 'None', TIME<T> | 'None'>, 
        ): Measure<DISPLACEMENT<D> | 'None', TIME<T> | 'None'> => {

            return {...a, scalar: a.scalar + b.scalar}
            
    }

const Sub = <
    D extends UNITS['ANGLE'] | UNITS['LENGTH'],
    T extends UNITS['TIME'] ,
    >(  a: Measure<DISPLACEMENT<D> | 'None', TIME<T> | 'None'>, 
        b: Measure<DISPLACEMENT<D> | 'None', TIME<T> | 'None'>, 
        ): Measure<DISPLACEMENT<D> | 'None', TIME<T> | 'None'> => {

            return {...a, scalar: a.scalar - b.scalar}
            
    }


const Mult = <
    D extends UNITS['ANGLE'] | UNITS['LENGTH'],
    T extends UNITS['TIME'] ,
    >(  a: Measure<DISPLACEMENT<D> | 'None', TIME<T> | 'None'>, 
        b: Measure<DISPLACEMENT<D> | 'None', TIME<T> | 'None'>, 
        ): Measure<DISPLACEMENT<D> | 'None', TIME<T> | 'None'> => {

            const newScalar = a.scalar * b.scalar
            const DexpA = a.DA.D === 'None' ? 'None' : a.DA.D.exp
            const DexpB = a.DA.D === 'None' ? 'None' : a.DA.D.exp

            return {...a, scalar: a.scalar - b.scalar}
            
    }




const unit = Constructor

const s0 = unit.Length(10,'mm')
const s1 = unit.Length(50,'mm')
const t0 = unit.Time(0, 's')
const t1 = unit.Time(10, 's')
const delta = (a,b) => add(a,inv(b))
const div = (a,b) => mul(a, inv(b))
const v = .....
const a = .....


const rampa = (unit) => convert( div(sqr(v), mult(2,a)), unit)
const vi = div( delta(s1,s0), delta(t0,t1) )
*/