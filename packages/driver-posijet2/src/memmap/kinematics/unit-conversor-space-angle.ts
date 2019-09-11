import { FromTo, __unsafeConvert, Converter } from "./unit-conversor-core"
import { AnyAngleUnit } from "./unit-core"



// ------------ Angle ------------------

const pi = Math.PI

// base
const radian: FromTo<'radian'> = {
    kind: 'radian',
    fromBase: x => x,
    toBase: x => x,
}

const degree: FromTo<'degree'> = {
    kind: 'degree',
    fromBase: rad => 360*(rad/(2*pi)),
    toBase: deg => (deg/360)*(2*pi)
}

const angularPulse = (pulsesPerRevolution: number): FromTo<'angularPulse'> => {
    return {
        kind: 'angularPulse',
        fromBase: rad => ((rad/(2*pi)) * pulsesPerRevolution),
        toBase: angularPulse => (angularPulse/pulsesPerRevolution)*(2*pi),
    }
}




export const __convertAngle: Converter<AnyAngleUnit> = (scalar, source, target) => __unsafeConvert(scalar, source, target)