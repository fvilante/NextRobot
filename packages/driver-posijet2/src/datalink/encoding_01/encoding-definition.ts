import { _Symbol, convertNumberToSymbol as Data, convertNumberToSymbol, convertSymbolToNumber } from './symbols'


type TypeCast<T> = {
    readonly toSymbol: (_: T) => _Symbol
    readonly fromSymbol: (_: _Symbol) => T
}

type FixedSizeParameter<T> = {
    /** Size of the parameter in number of bits */
    readonly size: number
    readonly typeCast: TypeCast<T> 
}

/** Function definition
 *  Type param T represents the function parameter type
 */
type FunctionDef<TName, T> = {
    /** Function name */
    readonly kind: TName
    /** Symbol representation */
    readonly symRep: readonly _Symbol[]
    /** Parameter Definition */
    readonly parDef: undefined | FixedSizeParameter<T>
}


const ESC = 27
const ESCDUP = ESC
const STX = 2
const ACK = 6
const NACK = 21
const ETX = 3


/** Master Start Block */
const MasterStartBlock: FunctionDef<'MasterStartBlock', undefined> = 
    {   kind: 'MasterStartBlock', 
        symRep: [ Data(ESC), Data(STX) ], 
        parDef: undefined
    }

const EndBlockWithChecksum: FunctionDef<'EndBlockWithChecksum', number> = 
    {   kind: 'EndBlockWithChecksum', 
        symRep: [ Data(ESC), Data(ETX) ], 
        parDef: { 
            size: 1, 
            typeCast: { 
                toSymbol: convertNumberToSymbol,
                fromSymbol: convertSymbolToNumber,
            } 
        }
    }

const EscIdentity: FunctionDef<'EscIdentity', undefined> = 
    {   kind: 'EscIdentity', 
        symRep: [ Data(ESC), Data(ESCDUP) ], 
        parDef: undefined
    }



const CodecBase = {
    MSB: MasterStartBlock,
    EBWC: EndBlockWithChecksum,
    ESCIdentity: EscIdentity,
}




