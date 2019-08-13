import { TypeScriptBuiltInTypes as Type} from '../TypeScriptBuiltInTypes'



export type DiscreteInterval = readonly [number]
export type RangeInterval = readonly [number, number]
export type Interval = DiscreteInterval | RangeInterval

const isDiscreteInterval = (_: Interval): _ is DiscreteInterval => {
    return _.length === 1
}

const isRangeInterval = (_: Interval): _ is RangeInterval => {
    return _.length === 2
}

