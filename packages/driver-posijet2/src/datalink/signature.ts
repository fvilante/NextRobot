import { AnyRCommand, Command } from './command-stamper'
import { exhaustiveSwitch, mapObjectIndexed, flattenDeep, objectToPairs, Pairs, Pair, max } from '@nextrobot/core-utils';
import { MappedObject, isArrayEqual } from '@nextrobot/core-utils'


const ESC = 27
const ETX = 3
const STX = 2
const ACK = 6
const NACK = 21 
const ESCDUP = 27 //ESCDUP may be a code different of ESC




/** Waved Symbols */
type WaveElement = number
type Wave = readonly WaveElement[] 


type CommandFixedLenghtParameter = { 
    readonly kind: 'CommandFixedLenghtParameter'
    readonly code: Wave 
    readonly parameterLength: number //in size of WSymbols
}

type FreeCommand = { 
    readonly kind: 'FreeCommand'
    readonly code: Wave
    readonly parameterLength: 0 
}

type CommandWithNoParameter = {
    readonly kind: 'CommandWithNoParameter'
    readonly code: Wave 
}

type MakeSignatures<T> = {
    [K in keyof  T]: T[K] extends undefined 
        ? CommandWithNoParameter
        : CommandFixedLenghtParameter | FreeCommand
}

type Signatures = MakeSignatures<Command>


const Signatures: Signatures = {
    StartMaster: {kind: 'CommandWithNoParameter', code: [ESC, STX]},
    StartSlave: {kind: 'CommandWithNoParameter', code: [ESC, ACK]},
    StartSlaveWithError: {kind: 'CommandWithNoParameter', code: [ESC, NACK]},
    EndFrameWithCheckSum: {kind: 'CommandFixedLenghtParameter', code: [ESC, ETX], parameterLength: 1},
    FreeData: {kind: 'FreeCommand', code: [], parameterLength: 0},
}



// todo: implement
const wrapCheckSumToUint8 = (checksum: number):number => checksum*2

const duplicateEsc = (data: Wave): Wave => 
    flattenDeep(data.map( element => element===ESC ? [ESC, ESCDUP] : [element]))



/** map AnyRCommand to WSymbol */
function mapToWave(c: AnyRCommand ): Wave {

    const code = Signatures[c.kind].code

    switch(c.kind) {

        case 'StartMaster': 
        case 'StartSlave':
        case 'StartSlaveWithError': 
            return code

        case 'EndFrameWithCheckSum':
            return [...code, wrapCheckSumToUint8(c.parameters.checksum) ]

        case 'FreeData':
            return duplicateEsc([...c.parameters.data])

        default:
            return exhaustiveSwitch(c)


    }


}


// -----------------


const testGen = async function*(): AsyncIterableIterator<WaveElement> {
    yield* [
        ESC, STX, 1,2,3,4, ESC,ETX,12,
        ESC, ACK, 1,2,3,4, ESC,ETX,12,
        ESC, NACK, 1,2,3,4, ESC,ETX,12,
        99,98,97,ESC, STX, 1,2,3,4, ESC,ETX,12,
        ESC, STX, 1,ESC,3,4, ESC,ETX,12,
        ESC, STX, 1,ESC,ESC,4, ESC,ETX,12,
        ESC, STX, 1,ESC,ESC,ESC, ESC,ETX,12,
    ]
}

const gen = testGen()



// tslint:disable: typedef no-let no-expression-statement  no-if-statement
async function* mapFromWave(p: AsyncIterableIterator<WaveElement>) /*:AsyncIterableIterator<AnyRCommand>*/ {

    type MStateString = '1-code' | '2-param' //accumulate code(1) and param(2) symbols
   
    let StateVar: MStateString = '1-code'
    //states
    let code: Wave = []
    let param: Wave = []
    let paramSize: number = 0

    

    const getState = () => StateVar
    const changeState = (_: MStateString): void => {StateVar=_}
    const getNextElement = async () => await p.next()

    const tryMatchCode = () => {
        const pair = objectToPairs(Signatures)
        const pairRenamed = pair.map( ({key,value}) => ({key, signature: value}) )
        const mapped = pairRenamed.map( x => ({...x, matched: isArrayEqual(x.signature.code, code)}) )
        const filtered = mapped.filter( x => x.matched === true )
        const result = filtered.length === 0 ? undefined : filtered[0]
        return result !== undefined ? {kind: result.key, signature: Signatures[result.key]} : undefined
    }

    const isImpossibleToMatch = () => {
        return code.length >= 3
        // inspect available codes
        const codesLength = objectToPairs(Signatures).map( x => x.value.code.length)
        const isImpossible = code.length > max(codesLength)
        return isImpossible
    }

    const getParamSize = (x: keyof Signatures):number => {
        switch(Signatures[x].kind) {
            case 'CommandFixedLenghtParameter':
                return (Signatures[x] as CommandFixedLenghtParameter).parameterLength
            default:
                return 0
        }
    }

    const resetStateVariables = () => {
        code = []
        param = []
        changeState('1-code')
    }

    const createSignal = () => {
        const r = {kind: 'UnknownCommand' as const, code, param}
        resetStateVariables()
        return r
    }

    const createFreeSignal = () => {
        //rotate buffer by one
        //todo: I'm not rotating the parameter but only the code this is ok to Posijet1 but not is generic to other cases
        const codeTail = code.slice(1)
        const codeHead = code.slice(0,1)  
        code = [...codeTail]
        const r = {kind: 'FreeSignal' as const, data: [...codeHead], }
        changeState('1-code')
        return r
    }

    //const Timer = (ms:number) => new Promise(resolve => setTimeout(resolve, ms)) 



    for await (const nextElement of p) {

        const accumulateCode = async () => {
            code = [...code, nextElement] 
        }

        const accumulateParam = async () => {
            param = [...param, nextElement] 
        }

        switch (getState()) {
            case '1-code':  {
                //accumulate
                await accumulateCode()
                // test
                const test1 = isImpossibleToMatch()
                if (test1) 
                    yield createFreeSignal()
                const test2 =  tryMatchCode()
                //await Timer(1000)
                yield [StateVar,code, param]
                if (test2) { // if code matches
                    paramSize = getParamSize(test2.kind)
                    if (paramSize===0) {
                        yield createSignal()
                        break
                    } else {
                        changeState('2-param') // matched code, now accumulate parameter
                        break
                    }
                }
                break; //no match continue trying match code
            }
            case '2-param': {
                // accumulate until param size is reached
                await accumulateParam()
                const test1 = param.length === paramSize
                
                if (test1) {
                    yield createSignal()
                }

            }
                

            
        }
    }


    



  

}


const main = async () => {

    for await (let a of mapFromWave(gen))
        console.log(a)

} 

main()



/*

// tslint:disable-next-line: readonly-array
const a = {
    content: Command.StartMaster(),
    begin: Command.FreeData({data: [1,2,3,26,27,4,5]}),
    end: Command.EndFrameWithCheckSum({checksum: 12})
}

const b = mapObjectIndexed(a, (rcommand, key) => mapToWave(rcommand))

console.table(a)
console.table(b)

*/