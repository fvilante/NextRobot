import { FromTo, __unsafeConvert, Converter } from "./unit-conversor-core"
import { AnyLinearUnit } from "./unit-core"



// -------------- translation -------------- 

// base
const milimeter: FromTo<'milimeter'> = {
    kind: 'milimeter',
    fromBase: x => x,
    toBase: x => x
}

const meter: FromTo<'meter'> = {
    kind: 'meter',
    fromBase: x => x*1000,
    toBase: x => x/1000,
}

const linearPulse = (milimetersPerPulse: number):FromTo<'linearPulse'> => {
    return { 
        kind: 'linearPulse',
        fromBase: mm => mm/milimetersPerPulse,
        toBase: pulses => pulses*milimetersPerPulse,
    }
}

export const __convertLinear: Converter<AnyLinearUnit> = (scalar, source, target) => __unsafeConvert(scalar, source, target)


