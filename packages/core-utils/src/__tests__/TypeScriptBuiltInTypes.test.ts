import { 
    TypeScriptBuiltInTypes,
    TypeGuard
} from '../TypeScriptBuiltInTypes'


// ==============================================
//  Test Case Mechanism (each-test runner)
// ==============================================

    //execute the run-time type-checking over predefined test data
    
    interface TestProbe {
        readonly mustBeTrue: readonly unknown[],
        readonly mustBeFalse: readonly unknown[]
    } 

    interface EachTestExecution {
        readonly probeValue: unknown
        readonly function_name: unknown 
        readonly function_body: unknown
        readonly expected: boolean
        readonly result: boolean
        readonly isValid: boolean
    }

    type Result = ReadonlyArray<EachTestExecution>

    type TestRunner =  (_: TestProbe, fn: TypeGuard) => Result
    const run: TestRunner = (probe, fn) => {
        
        type RunEachTest = (_: {readonly expected: boolean}) => (probeValue: unknown) => EachTestExecution
        const runEachTest: RunEachTest = options => probeValue => {
            const expected = options.expected
            const function_name = fn.name
            const function_body = fn.toString()
            const result = fn(probeValue)
            const isValid = expected === result
            return { probeValue, function_body, 
                        function_name, expected, result, isValid }
        }

        const allResults = [
            // probes which must be truth
            ...probe.mustBeTrue.map( runEachTest({expected: true })),
            // probes which must be falsy
            ...probe.mustBeFalse.map( runEachTest({expected: false }))]

        const onlyErrors = allResults.filter( each => !each.isValid )
        
        // if no error result is empty array
        return onlyErrors
    }

const noErrors: Result  = [] 


// ==============================================
//  Test Case Specification (contract)
// ==============================================

    // helper
    type TupleToUnion<T extends readonly unknown[]> = T[number]


    interface TestCase  {
        readonly typeGuard: TypeGuard
        readonly probe: TestProbe
    }

    type AllTestCases<T_TypeGuardName extends string> = {
        readonly [index in T_TypeGuardName]: TestCase
    }


// typeguard names

const BuiltInTypes = [
    'isNumber', 
    'isString',
    'isArray',
    'isObject',
    'isObjectOrArray',
    'isBoolean',
    'isUndefined',
    'isPureArrayOfNumber',
    'isAnyOf'
] as const

type BuiltInType = TupleToUnion<typeof BuiltInTypes>

interface Report {
    readonly TestCaseName: string,
    readonly TestCaseResult: Result    
}

type TestCaseReportCreator = (caseName: string, result: Result) => Report
const ReportCreator: TestCaseReportCreator = (caseName, result) =>
    ({
        TestCaseName: caseName,
        TestCaseResult: result
    })

describe('TypeScriptBuiltInTypes', () => { 


    // Alias
    const Type = TypeScriptBuiltInTypes

    // an arbitrary interface as probe-case
    interface User { readonly name: string, readonly age: number }
    const user: User = {name:'test', age:12 }

    // Some arbitrary primitive probes

    const someBoolens = [true, false]

    const someNumbers = [0,-1,1,-10000,+10000]

    const nullUndefined = [null, undefined]

    const someStrings = [
        "1", "a", `${1}`, 'Hello World',
        ...someNumbers.map(String),
    ]
    const aVeryLongString = ["LongString".repeat(30)]

    const somePlainObjects = [ 
        {a: someStrings, b: someNumbers}, 
        {a: aVeryLongString}, 
        {a: nullUndefined},
        {a: someBoolens},
        user,
    ]

    const someArraysOf = 
        <T extends unknown[]>(arr:T) => [...arr].map( _ => [_])

    const someArrays = [
        [...someNumbers],  // [1,2,3]
        [...nullUndefined],
        [...someStrings],
        [...aVeryLongString],
        [...somePlainObjects],
        [...someBoolens],
        [user, user],

        ...someArraysOf(someNumbers), // [1], [2], [3]
        ...someArraysOf(nullUndefined),
        ...someArraysOf(someStrings),
        ...someArraysOf(aVeryLongString),
        ...someArraysOf(somePlainObjects),
        ...someArraysOf(someBoolens),
        ...someArraysOf([user, user]),
    ]


    // All tests

    const allTestCases: AllTestCases<BuiltInType> = {
        'isNumber': { 
            typeGuard: Type.isNumber,
            probe: {
                mustBeTrue: [
                    ...someNumbers,
                ],
                mustBeFalse: [
                    ...nullUndefined,
                    ...someStrings,
                    ...aVeryLongString,
                    ...somePlainObjects,
                    ...somePlainObjects,
                    ...someBoolens,
                ]           
            }
        },

        'isString': { 
            typeGuard: Type.isString,
            probe: {
                mustBeTrue: [
                    ...someStrings,
                ],
                mustBeFalse: [
                    ...nullUndefined,
                    ...someNumbers,
                    ...somePlainObjects,
                    ...someArrays,
                    ...someBoolens,
                ]         
            }
        },

        'isArray': { 
            typeGuard: Type.isArray,
            probe: {
                mustBeTrue: [
                    ...someArrays,
                ],
                mustBeFalse: [
                    ...someNumbers,
                    ...someStrings,
                    ...somePlainObjects,
                    ...nullUndefined,
                    ...someBoolens,
                ]         
            }
        },

        'isObject': { 
            typeGuard: Type.isObject,
            probe: {
                mustBeTrue: [
                    ...somePlainObjects,
                ],
                mustBeFalse: [
                    ...someNumbers,
                    ...someStrings,
                    ...someArrays,
                    ...someBoolens,
                    ...nullUndefined,
                    
                ]         
            }
        },
        
        'isObjectOrArray': { 
            typeGuard: Type.isObjectOrArray,
            probe: {
                mustBeTrue: [
                    ...somePlainObjects,
                    ...someArrays,
                ],
                mustBeFalse: [
                    ...someNumbers,
                    ...someStrings,
                    ...someBoolens,
                    ...nullUndefined,
                ]         
            }
        }, 

        'isBoolean': { 
            typeGuard: Type.isBoolean,
            probe: {
                mustBeTrue: [
                    ...someBoolens,
                ],
                mustBeFalse: [
                    ...someNumbers,
                    ...someStrings,
                    ...somePlainObjects,
                    ...someArrays,
                    ...nullUndefined,
                ]         
            }
        },
        
        'isUndefined': { 
            typeGuard: Type.isUndefined,
            probe: {
                mustBeTrue: [
                    undefined,
                ],
                mustBeFalse: [
                    ...someNumbers,
                    ...someStrings,
                    ...somePlainObjects,
                    ...someArrays,
                    ...someBoolens,
                    null,
                ]         
            }
        },

        'isPureArrayOfNumber': { 
            typeGuard: Type.isPureArrayOfNumber,
            probe: {
                mustBeTrue: [
                    ...someArraysOf(someNumbers),
                ],
                mustBeFalse: [
                    //[...someNumbers],  // [1,2,3]
                    [...nullUndefined],
                    [...someStrings],
                    [...aVeryLongString],
                    [...somePlainObjects],
                    [...someBoolens],
                    [user, user],
                    ...nullUndefined,
                    //..someArraysOf(someNumbers), // [1], [2], [3]
                    ...someArraysOf(nullUndefined),
                    ...someArraysOf(someStrings),
                    ...someArraysOf(aVeryLongString),
                    ...someArraysOf(somePlainObjects),
                    ...someArraysOf(someBoolens),
                    ...someArraysOf([user, user]),
  
                ]         
            }
        },

        'isAnyOf': { 
            typeGuard: Type.isAnyOf([
                Type.isPureArrayOfNumber,
                Type.isPureArrayOfString,
                Type.isString, 
                Type.isNumber,
                Type.isUndefined,
            ]),
            probe: {
                mustBeTrue: [
                    ...someArraysOf(someNumbers),
                    ...someArraysOf(someStrings),
                    ...someStrings,
                    ...someNumbers,
                    undefined,
                ],
                mustBeFalse: [
                    ...somePlainObjects,
                    ...someBoolens,
                    ...someArraysOf(nullUndefined),
                    ...someArraysOf(somePlainObjects),
                    ...someArraysOf(someBoolens),
                    ...someArraysOf([user, user]),
                    null,
                ]         
            }
        },




    } as const


    it('Should run all tests cases and pass', () => {        
        //arrange       
        
        const runEachTestCase = (guardName: BuiltInType) => {
            const testCase = allTestCases[guardName]
            return run(testCase.probe, testCase.typeGuard)
        }
        
        //act
        const expected = 
            [...BuiltInTypes]
                .map( guardName => 
                    ReportCreator(guardName, noErrors)) 
        
        const result = 
            [...BuiltInTypes]
                .map(  guardName => 
                    ReportCreator(guardName, runEachTestCase(guardName)) )
        //assert
        expect(result).toEqual(expected)
    })



})
