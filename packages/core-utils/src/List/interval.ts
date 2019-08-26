import { TypeScriptBuiltInTypes as Type} from '../TypeScriptBuiltInTypes'

// Note: I'm using tuple and not interface for efficience reason
export type RangeInterval = readonly [number, number]

export const RangeInterval = (start: number, end: number): RangeInterval => [start, end]
