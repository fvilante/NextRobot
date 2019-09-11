import { FromTo, __unsafeConvert, Converter } from "./unit-conversor-core"
import { AnyTimeUnit } from "./unit-core"




// --------------- Time ----------------

// base
export const second: FromTo<'second'> = {
    kind: 'second',
    fromBase: x => x,
    toBase: x => x, 
}

export const minute: FromTo<'minute'> = {
    kind: 'minute',
    fromBase: x => x/60,
    toBase: x => x*60, 
}

/** microcontroler tick is a time measure */
export const mpcTick = (milisecondsPerMpcTick: number): FromTo<'mpcTick'> => {
    return { 
        kind: 'mpcTick',
        fromBase: sec => (sec*1000)/milisecondsPerMpcTick,
        toBase: mpcTick => (mpcTick*milisecondsPerMpcTick)/1000,
    }
}



export const __convertTime: Converter<AnyTimeUnit> = (scalar, source, target) => __unsafeConvert(scalar, source, target)


