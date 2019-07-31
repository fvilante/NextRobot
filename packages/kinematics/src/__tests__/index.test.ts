import { addOne } from '../index'

// // just a example how to write a test: arrange / act / assert (TDD)
describe('addOne function test', () => { 

    it('can add one', () => {        
        const result = addOne(1)
		const expected = 2
        expect(result).toEqual(expected)
    })


})