import { Bit8Value, bit8Value, bit16Value, Bit16Value } from './../common';
import * as R from 'ramda'


describe('Testa o modulo "Common"', () => { 


    describe('Seguranca de tipos basicos"', () => { 

        it('Tipo Byte só recebe valor entre 0 e 255', () => {        
            
            // *********************
            // NAO IMPLEMENTADO !
            // *********************
            
            const expected = false
            const result = false
            expect(
                result
            ).toEqual(expected)
        })


        it('Tipo word só recebe valor entre 0 e 0xFFFF', () => {        
            
            // *********************
            // NAO IMPLEMENTADO !
            // *********************
            
            const expected = false
            const result = false
            expect(
                result
            ).toEqual(expected)
        })



        it('Tipo bit8 só recebe valor entre 0 e 7', () => {        
            
            // *********************
            // NAO IMPLEMENTADO !
            // *********************
            
            const expected = false
            const result = false
            expect(
                result
            ).toEqual(expected)
        })

    })


    describe('Funcoes basicas de uso comum estao funcinando"', () => { 

        it('bit8Value - converte um byte numerico para um mapa de 8 bits ', () => {        
            
            const expected: Bit8Value = bit8Value(0b0001111) 
            const result: Bit8Value = {
                0: true,
                1: true,
                2: true,
                3: true,
                4: false,
                5: false,
                6: false,
                7: false,
            }
            expect(
                result
            ).toEqual(expected)
        })


        it('bit16Value - converte uma word para um mapa de 16 bits ', () => {        
            
            const expected: Bit16Value = bit16Value(0b000111100001111) 
            const result: Bit16Value = {
                0: true,
                1: true,
                2: true,
                3: true,
                4: false,
                5: false,
                6: false,
                7: false,

                8: true,
                9: true,
                10: true,
                11: true,
                12: false,
                13: false,
                14: false,
                15: false,
            }
            expect(
                result
            ).toEqual(expected)
        })



    })

})
