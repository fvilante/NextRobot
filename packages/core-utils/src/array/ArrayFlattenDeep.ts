import { 
    TypeScriptBuiltInTypes as Type,
    TypeGuard
} from '../TypeScriptBuiltInTypes'



const isArray = Type.isArray

export function flattenDeep<T,U>(array: ReadonlyArray<T>): ReadonlyArray<U> {

    const ret: Array<U> = [] 
    
    const traverse = <A,B>(arr: any , output: any): ReadonlyArray<B> =>
        [...arr].map( elem => 
            isArray(elem)
                ? traverse(elem, output)
                : output.push(elem)
            )

    // tslint:disable-next-line: no-expression-statement
    traverse(array, ret)

    return ret;
  }     

// informal test

const Test = () => {
    // Some samples
    console.log(flattenDeep([[1,2,[3]],4]));  // -> [ 1, 2, 3, 4]
    console.log(flattenDeep([1,2,3,4]));  // -> [ 1, 2, 3, 4]
    console.log(flattenDeep([[1,2,[3]],4, [[[[5]],6],[[7],8,9],10],[[11,12]]]));  // -> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    console.log(flattenDeep([])); // -> []
}

