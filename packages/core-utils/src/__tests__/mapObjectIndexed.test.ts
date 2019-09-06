import { mapObjectIndexed, MapObjectIndexCallBack } from '../object/mapObjectIndexed'

// just a example how to write a test: arrange / act / assert (TDD)
describe('mapObjectIndexed function test', () => { 

    it('can map a simple function', () => {        
        //arrange
        const probe = { a:0, b:1, c:2 }
        const addOneFn = (_: number):number => _+1

        //act
        const result = mapObjectIndexed(probe, addOneFn)
        
        //assert
        const expected = { a:1, b:2, c:3 }
        expect(result).toEqual(expected)
    })


})