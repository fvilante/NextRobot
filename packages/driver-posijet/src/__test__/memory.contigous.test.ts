import { ContigousMemory, readContigousMemory, upsertIntoContigousMemory } from './../memory.contigous';
import * as R from 'ramda'
import { createContigousMemory } from '../memory.contigous';


describe('Teste do memoria contigua', () => { 


    it('construtor', () => {        
        const expected = createContigousMemory(10,[1,2,3,4,5])
        const result: ContigousMemory<number> = {
            type: "ContigousMemory",
            firstAddress: 10,
            block: [1,2,3,4,5]
        }
        expect(
            result
        ).toEqual(expected)
    })

    it('leitura', () => {        
        const m = createContigousMemory(10,[100,200,300,400,500])
        const expected: number = readContigousMemory(m,12)
        const result = 300
        expect(
            result
        ).toEqual(expected)
    })

    it('gravacao', () => {        
        const m = createContigousMemory(10,[100,200,300,400,500])


        const m2: ContigousMemory<number> = upsertIntoContigousMemory(m,12,700)
        const expected: number = readContigousMemory(m2,12)
        const result = 700
        expect(
            result
        ).toEqual(expected)
    })

    it('gravacao com endereco invalido', () => {        
        const m = createContigousMemory(10,[100,200,300,400,500])


        const m2: ContigousMemory<number> = upsertIntoContigousMemory(m,15,700)
        const expected: number = readContigousMemory(m2,15)
        const result = undefined
        expect(
            result
        ).toEqual(expected)
    })





})
