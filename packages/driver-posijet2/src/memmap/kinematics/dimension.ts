import { _add, _sub, _A, _B, Table , __A, __B, TableSub, mapObjectIndexed} from '@nextrobot/core-utils'

// addiction types ---------------------------------------
type AddEXP = _A & _B<_A>
type AddResult = Table[AddEXP][AddEXP]

// subtraction types ---------------------------------------
type SubEXP = __A & __B<__A>
type SubResult = TableSub[SubEXP][SubEXP]


// add / sub combination ---------------------------------------
export type EXP = AddEXP | SubEXP
export type Result = AddResult | SubResult


// Dimension Type ---------------------------------------

export type DIMENSION<L extends Result, T extends Result, A extends Result, M extends Result> = {
    readonly LENGTH: L,
    readonly TIME: T,
    readonly ANGLE: A,
    readonly MASS: M,
}

export type ANYDIMENSION = DIMENSION<Result, Result, Result, Result>


/**
 * ATTENTION: there is an acceptable range of calculation (normally from -10 to +10)
 * if some result calculation is outside this range you'll have compilation problem
 */
export const DIMENSION = <L extends Result, T extends Result, A extends Result, M extends Result>(LENGTH: L, TIME: T, ANGLE: A, MASS: M):DIMENSION<L,T,A,M> => ({LENGTH, TIME, ANGLE, MASS})


// Addition operator ---------------------------------------


export const add = <
    L0 extends EXP,
    T0 extends EXP,
    A0 extends EXP,
    M0 extends EXP,
    L1 extends EXP,
    T1 extends EXP,
    A1 extends EXP,
    M1 extends EXP,
    >(a: DIMENSION<L0,T0,A0,M0>, b: DIMENSION<L1,T1,A1,M1>) => { 


        const newTime = _add(a.TIME, b.TIME) 
        const newLength = _add(a.LENGTH, b.LENGTH) 
        const newAngle = _add(a.ANGLE, b.ANGLE)
        const newMass = _add(a.MASS, b.MASS)

        return DIMENSION(newLength, newTime, newAngle, newMass)

}


// Subtraction operation ---------------------------------------

export const sub = <
    L0 extends EXP,
    T0 extends EXP,
    A0 extends EXP,
    M0 extends EXP,
    L1 extends EXP,
    T1 extends EXP,
    A1 extends EXP,
    M1 extends EXP,
    >(a: DIMENSION<L0,T0,A0,M0>, b: DIMENSION<L1,T1,A1,M1>) => { 


        const newTime = _sub(a.TIME, b.TIME) 
        const newLength = _sub(a.LENGTH, b.LENGTH) 
        const newAngle = _sub(a.ANGLE, b.ANGLE)
        const newMass = _sub(a.MASS, b.MASS)

        return DIMENSION(newLength, newTime,  newAngle, newMass)

}


// Informal Test ------------------------------------------------

const Test = () => {

    // there is an acceptable range of calculation (normally from -10 to +10)
    // if some result calculation is outside this range you'll have compilation problem

    const d1 = DIMENSION('-1','0', '0', '1')
    const d2 = DIMENSION('1','-2', '0', '1')
    
    const d = add(d1,d2)
    const e = add(d, d1)
    
    const f = sub(e, d1)

    console.log('expected:', 'DIMENSION<"-1", "-2", "0", "3">')
    console.table(e)
    console.log(console.log('expected:', 'DIMENSION<"0", "-2", "0", "2">'))
    console.table(f)

}

// tslint:disable-next-line: no-expression-statement
//Test()

