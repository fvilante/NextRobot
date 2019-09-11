


// ------------ core ----------------


// ---- motion ----

export type AnyLinearUnit = 'milimeter' | 'meter' | 'linearPulse'

export type AnyAngleUnit = 'radian' | 'degree' | 'angularPulse'

export type AnyMotionUnit = AnyLinearUnit | AnyAngleUnit



// ---- time ----


export type AnyTimeUnit = 'second' | 'minute' | 'mpcTick'



// ---- all ----

export type AnyUnit = AnyLinearUnit | AnyAngleUnit | AnyTimeUnit
