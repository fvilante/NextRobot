import { flattenDeep } from './ArrayFlattenDeep'

// helper - todo: move to core-utils
export const isArrayEqual = <T>(a1: readonly T[], a2: readonly T[]):boolean => 
    flattenDeep(a1.map( val1 => a2.map( val2 => val1===val2))).every( test => test===true )

