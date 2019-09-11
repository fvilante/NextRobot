import { FromTo, __unsafeConvert, Converter } from "./unit-conversor-core"
import { AnyTranslationUnit } from "./unit-core"



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

const linearPulse = (milimetersPerPulse: number):FromTo<'linear-pulse'> => {
    return { 
        kind: 'linear-pulse',
        fromBase: mm => mm/milimetersPerPulse,
        toBase: pulses => pulses*milimetersPerPulse,
    }
}

export const __convertTranslation: Converter<AnyTranslationUnit> = (scalar, source, target) => __unsafeConvert(scalar, source, target)


