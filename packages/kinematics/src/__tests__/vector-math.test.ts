import { add, subtract, multByScalar } from '../vector-math'
import { Vector, Scalar } from '../vector'

// // just a example how to write a test: arrange / act / assert (TDD)
describe('vector math module doing math', () => { 

    it('can sum two vectors', () => {        
        
        const v1 = Vector(1,1,1)
        const v2 = Vector(-1,-1,-1)
        
        const result = add(v1,v2)
		const expected = Vector(0,0,0)
        expect(result).toEqual(expected)
    })

    it('can subtract two vectors', () => {        
        
        const v1 = Vector(1,1,1)
        const v2 = Vector(2,2,2)
        
        const result = subtract(v1,v2)
		const expected = Vector(-1,-1,-1)
        expect(result).toEqual(expected)
    })

    it('can multiply vector by scalar', () => {        
        
        const v1 = Vector(1,1,1)
        const s = Scalar(-1)
        
        const result = multByScalar(v1,s)
		const expected = Vector(-1,-1,-1)
        expect(result).toEqual(expected)
    })

    it('subtract two vectors is equal to add vec1 to inverse of vec2', () => {        
        
        const v1 = Vector(1,1,1)
        const v2 = Vector(2,2,2)
        const v2inv = multByScalar(v2,Scalar(-1))
        
        const result = subtract(v1,v2)
		const expected = add(v1, v2inv)
        expect(result).toEqual(expected)
    })



})