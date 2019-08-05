import { addVector, subtract, multByScalar, Vector } from '../euclidean-vector-space-R3'

// // just a example how to write a test: arrange / act / assert (TDD)
describe('vector math module doing math', () => { 

    it('can sum two vectors', () => {        
        
        const v1 = Vector(1,1,1)
        const v2 = Vector(-1,-1,-1)
        
        const result = addVector(v1,v2)
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
        const scalar = -1
        
        const result = multByScalar(scalar, v1,)
		const expected = Vector(-1,-1,-1)
        expect(result).toEqual(expected)
    })

    it('subtract two vectors is equal to add vec1 to inverse of vec2', () => {        
        
        const v1 = Vector(1,1,1)
        const v2 = Vector(2,2,2)
        const v2inv = multByScalar(-1, v2)
        
        const result = subtract(v1,v2)
		const expected = addVector(v1, v2inv)
        expect(result).toEqual(expected)
    })



})