import { CMPP_Memory } from './../cmpp.memory';
import * as R from 'ramda'
import { upsertIntoContigousMemory } from '../memory.contigous';


describe('Template', () => { 


    it('test', () => {        
        const expected = CMPP_Memory
        const result = CMPP_Memory
        //console.log(CMPP_Memory)
        const newMem = upsertIntoContigousMemory(CMPP_Memory, 10, {
            content: 20,
            lastUpdate: 1000
        })
        //console.log(newMem)
        expect(
            result
        ).toEqual(expected)
    })


})
