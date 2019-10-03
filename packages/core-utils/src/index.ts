
// type utils
export { mapObjectIndexed } from './object/mapObjectIndexed'
export { FilterKeysByValue } from './type-utils/type-utils-interfaceIntrospector'
export { MappedObject } from './object/mapObjectIndexed'
export { FindInTuple } from './type-utils/FindInTuple'

//type guard
export { TypeScriptBuiltInTypes, TypeGuard } from './type-utils/TypeScriptBuiltInTypes' 

// type safety
export { exhaustiveSwitch } from './type-utils/exhaustiveSwitch'

//pair
export { objectToPairs } from './pair/objectToPairs'
export { Pair, Pairs } from './pair/pair'

// utils on arrays
export { flattenDeep } from './array/ArrayFlattenDeep'
export { foldLeftArray, FoldLeftArray, FoldLeftCallback } from './array/foldLeftArray'
export { findRangesOnArray, FixedSizeSearchFromLeft } from './List/find-ranges'
export { hasValueInArray } from './array/hasValueInArray'

// functional - monads
export { Maybe, Just, Nothing } from './monads/maybe'
export { Either, Left, Right, filterByLeft, filterByRight, matchEither} from './monads/either'
export { Reader } from './monads/reader'
export { Writer } from './monads/writer'
export { IO, Lazy, IOConstructor } from './monads/IO'

// functional - tools
export { zipWith, ZipWithFn } from './functional/zipWith'


// Generators
export { Observed, StartEnd, StartEndStep, ZeroToEnd } from './Generators/core-types'
// sync
export { mapGenerator as mapSyncGenerator, range as rangeSync, generatorToList as syncGeneratorToList, listToGenerator as listToSyncGenerator} from './Generators/number-generator-sync'
// async
export { range } from './Generators/async/range'
export { map as mapObserved } from './Generators/async/map'
export { take } from './Generators/async/take'
export { subscribe } from './Generators/async/subscribe'
export { bufferCount } from './Generators/async/bufferCount'

// equality
export { isArrayEqual } from './type-utils/isEqual'

//stats
export { min, max, average } from './statistics'

// Message
export { Message, AnyMessage, PatternMatchFnObject, Match } from './message/message'

// delay
export { delay } from './delay'

// bitWise
export { Bit, bitToBoolean, bolleanToBit, setBit, clearBit, updateBit } from './bitTools' 

// misc
export { getKeyByValue } from './object/getKeyByValue'

// static algebra
export * from './static-algebra/static-sum-and-subtraction'