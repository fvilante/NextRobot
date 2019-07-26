import { addOne } from '../index'

// just a example how to write a test: arrange / assert / act (TDD)
describe('addOne function test', () => { 

    it('can add one', () => {        
        const expected = 2
        const result = addOne(1)
        expect(result).toEqual(expected)
    })


})