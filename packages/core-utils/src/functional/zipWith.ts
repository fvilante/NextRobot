

//todo: move to core-utils

export type ZipWithFn<A,B,C> = (a: A, b: B) => C

export type zipWith = <A,B,C>(fn: ZipWithFn<A,B,C>, arr1: readonly A[], arr2: readonly B[]) => readonly C[]

/**Creates a new list out of the two supplied by applying the function to each equally-positioned pair in the lists. 
 * The returned list is truncated to the length of the shorter of the two input lists. */
export const zipWith: zipWith = (f, arr1, arr2) => {

    const [, smallest] = arr1.length > arr2.length ? [arr1, arr2] : [arr2, arr1]

    const r = [...smallest].map( (_, index) => f(arr1[index], arr2[index]))

    return r

}