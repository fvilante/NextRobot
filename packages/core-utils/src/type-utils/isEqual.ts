import { flattenDeep } from '../array/ArrayFlattenDeep'
import { equals} from 'ramda'

// fix: this function is not working (using ramda instead temporarily)
const __isArrayEqual = <T>(a1: readonly T[], a2: readonly T[]):boolean => 
    // todo: can be optimized: using map in place of a reducer avoid early return
    flattenDeep(a1.map( val1 => a2.map( val2 => val1===val2))).every( test => test===true )


export const isArrayEqual = <T>(a1: readonly T[], a2: readonly T[]):boolean => equals(a1,a2) 

