
export const hasValueInArray = <T>(arr: readonly T[], valueToVerify: T):boolean => {
    /** todo: Early return! Not all elements must be verified. We can return on the first match*/
    const hasValue = arr.map( each => each === valueToVerify).some(value => value === true)
    return hasValue
} 

const Test = () => {

    const arr = [1,2,3,4,0,9,2,3,9]

    const b = hasValueInArray(arr, 11)
    const c = hasValueInArray(arr, 9)

    console.log(`true must be: ${c}, false must be: ${b}`)

}


// tslint:disable-next-line: no-expression-statement
// Test()