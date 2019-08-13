
import { generatorToList, range, mapGenerator} from '../Generators/number-generator-sync'
import { Interval, RangeInterval } from './interval'
import { isArrayEqual } from '../isEqual';

/** if size>max_length returns an empty array */
export const FixedSizeSearchFromLeft = function* (max_length:number, size: number): IterableIterator<RangeInterval> {
    yield* mapGenerator(range(0,max_length-size+1), ini => [ini, ini+size])
}


/** an array of all indexes that match */
export const findRangesOnArray = <A>(target: readonly A[], toLocate: readonly A[]): readonly RangeInterval[] => {

        const intervals = FixedSizeSearchFromLeft(target.length, toLocate.length)
        const slices = generatorToList(mapGenerator(intervals, ([ini, end]) => target.slice(ini, end)))
        const indexes = slices.map( (slice, index) => isArrayEqual(slice, toLocate) ? index : undefined)
        const indexes_ = indexes.filter( val => val!==undefined) as number[]
        const ranges = indexes_.map( index => [index, index+toLocate.length]) as readonly RangeInterval[]
        return ranges

    }


// informal test

/*
// tslint:disable-next-line: readonly-array
const arr = ['a','b','h','i','e','f','g','h','i','j']

const a = findRanges(arr, ['h','i'])

console.log(a, arr)
*/
