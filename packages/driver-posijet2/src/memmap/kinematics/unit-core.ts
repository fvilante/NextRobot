


// ------------ core ----------------


// ---- motion ----

export type AnyTranslationUnit = 'milimeter' | 'meter' | 'linear-pulse'

export type AnyRotationUnit = 'radian' | 'degree' | 'angular-pulse'

export type AnyMotionUnit = AnyTranslationUnit | AnyRotationUnit



// ---- time ----


export type AnyTimeUnit = 'second' | 'minute' | 'mpcTick'



// ---- all ----

export type AnyUnit = AnyTranslationUnit | AnyRotationUnit | AnyTimeUnit
