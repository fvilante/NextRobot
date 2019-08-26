import { Message } from '@nextrobot/core-utils'

export const _Symbol = (x: number) => Message<'_Symbol', number>('_Symbol', x)
export type _Symbol = ReturnType<typeof _Symbol>

export type Symbols = readonly _Symbol[]


export const convertNumberToSymbol = (x: number) => _Symbol(x)
export const convertSymbolToNumber = (s: _Symbol) => s.payload




