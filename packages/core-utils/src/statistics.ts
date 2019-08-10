/** get max number from an array of numbers */
export const max = (_: readonly number[]): number => _.reduce((acc,cur) => cur>acc ? cur : acc)

/** get min number from an array of numbers */
export const min = (_: readonly number[]): number => _.reduce((acc,cur) => cur<acc ? cur : acc)

/** get average number from an array of numbers */
export const average =  (_: readonly number[]): number => _.reduce((acc,cur) => acc+cur)/_.length


// informal test

console.log(max([1,2,3,4]))

console.log(min([2,2,3,4]))

console.log(average([0,5,0,5]))