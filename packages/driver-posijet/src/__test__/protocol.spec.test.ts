import { Direcao, Segment, segment, word2int } from './../transport';
import { STX, frame2Bytes, NACK, Frame, ACK } from './../datalink.common';
import { PacoteDeTransmissao, pacoteDeRetorno_ComErro, PacoteDeRetorno_ComErro, 
    PacoteDeRetorno_DeEnvioSemErro, pacoteDeRetorno_DeEnvioSemErro, 
    pacoteDeRetorno_DeSolicitacaoSemErro, PacoteDeRetorno_DeSolicitacaoSemErro, 
    pacoteDeTransmissaoToBytes, PacoteDeRetorno, 
    interpretacaoFrameDeRetorno, 
    pacoteDeTransmissaoToSegment} from './../protocol.spec';
import { bit16Value, bit8Value } from './../common';
import { Bytes } from '../byte'
import * as R from 'ramda'
import { Reservado, statusL, StatusL, statusH, StatusH, mascaraDeErro, MascaraDeErro, 
    controleSerial, ControleSerial, ByteDeErro, byteDeErro, ByteDeErroDescricao, 
    pacoteDeTransmissao } from '../protocol.spec';
import { Obj, createPerfectFrame } from '../datalink.common';
import { int2word } from '../transport';


describe('Testa especificacao em relacao ao protocolo Posijet V1', () => { 


    describe('construtor de objetos basicos dos pacotes', () => { 


        it('constante "Reservado" esta definida', () => {        

            const result = Reservado
            const expected = "Reservado para aplicacoes especiais"
            expect(
                result
            ).toEqual(expected)

        })


        

        it('construtor do statusL funciona', () => {    

            const result: StatusL = statusL(0b11111101)
            const expected = {
                type: "StatusL",
                value: {
                    0: true,
                    1: false,
                    2: true,
                    3: true,
                    4: true,
                    5: true,
                    6: true,
                    7: true,
                },
                description: {            
                    0: "Referenciado",
                    1: "Ultima posição a ser executada foi alcançada.",
                    2: "Referenciando",
                    3: "Direção do movimento é positiva",
                    4: "Movimento acelerado",
                    5: "Movimento desaceleração",
                    6: Reservado,
                    7: "Evento de erro, e deve ser consultado na mascara de erro. CMD=69 =45h",       
                }
            }

            expect(
                result
            ).toEqual(expected)
        })



        it('construtor do statusH funciona', () => {    

            const result: StatusH = statusH(0xFF)
            const expected = {
                type: "StatusH",
                value: bit8Value(0xFF),
                description: {            
                    0: Reservado,
                    1: Reservado,
                    2: Reservado,
                    3: Reservado,
                    4: Reservado,
                    5: Reservado,
                    6: Reservado,
                    7: Reservado,
                }
            }

            expect(
                result
            ).toEqual(expected)
        })



        it('construtor da MascaraDeErro funciona', () => {  

            const result: MascaraDeErro = mascaraDeErro(0xFFFF)
            const expected = {
                type: "MascaraDeErro",
                value: bit16Value(0xFFFF),
                description: {            
                    0: "Sinal de start externo",
                    1: "Sinal de start diversos",
                    2: "Sensor de giro por falta",
                    3: "Sensor de giro por excesso",
                    4: "Sinal de impressão",
                    5: "Erro de comunicação ocorrido na serial 1",
                    6: "Implementação futura",
                    7: "Implementação futura",
                    8: "Cheqsum da eprom2 incorreto",
                    9: "O equipamento foi resetado (reiniciado)",
                    10: Reservado,
                    11: Reservado,
                    12: Reservado,
                    13: Reservado,
                    14: Reservado,
                    15: Reservado,
                }
            }

            expect(
                result
            ).toEqual(expected)

        })


        it('construtor do ControleSerial funciona', () => {  

            const result: ControleSerial = controleSerial(0xFFFF)
            const expected = {
                type: "ControleSerial",
                value: bit16Value(0xFFFF),
                description: {            
                    0: "Start",
                    1: "Stop",
                    2: "Pausa",
                    3: "Modo manual",
                    4: "Teste de impressão",
                    5: Reservado,
                    6: "Salva os parâmetros na EEprom",
                    7: Reservado,
                    8: Reservado,
                    9: Reservado,
                    10: Reservado,
                    11: Reservado,
                    12: Reservado,
                    13: Reservado,
                    14: Reservado,
                    15: Reservado,
                }
            }

            expect(
                result
            ).toEqual(expected)

        })


        it('construtor do ByteDeErro funciona', () => {  

            const result: ByteDeErro = byteDeErro(12) //12-TimerIn da serial
            const expected = {
                type: "ByteDeErro",
                codigo: 12,
                descricao: "Timer in"
            }

            expect(
                result
            ).toEqual(expected)

        })

    })




    describe('construtor de objetos de pacote de recebimento e transmissao', () => { 
    

        it('construtor do pacote de transmissao', () => {        

            const result: PacoteDeTransmissao = pacoteDeTransmissao(192, 5, 60, 1026)
            const expected = {
                type: "PacoteDeTransmissao",
                direcao: 192,
                canal: 5,
                comando: 60,
                dado: 1026
            }

            expect(
                result
            ).toEqual(expected)

        })


        describe('construtor de pacotes de recebimento', () => { 

            const direcao = Direcao.ENVIO
            const canal = 2
            const comando = 60
            const dadoH = 2
            const dadoL = 97
            const dado = word2int(dadoH, dadoL)
            const s: Segment = segment(direcao, canal, comando, dadoL, dadoH)

            it('construtor do PacoteDeRetorno_ComErro', () => {        

                const result: PacoteDeRetorno_ComErro = pacoteDeRetorno_ComErro(s)
                const expected = {
                    type: "PacoteDeRetorno_ComErro",
                    byteDeErro: byteDeErro(dadoL),
                    statusL: statusL(dadoH),
                }
                
                expect(
                    result
                ).toEqual(expected)

            })


            it('construtor do PacoteDeRetorno_DeEnvioSemErro', () => {        

                const result: PacoteDeRetorno_DeEnvioSemErro = 
                    pacoteDeRetorno_DeEnvioSemErro(s)
                    
                const expected = {
                    type: "PacoteDeRetorno_DeEnvioSemErro",
                    statusL: statusL(dadoL),
                    statusH: statusH(dadoH),
                }
                
                expect(
                    result
                ).toEqual(expected)

            })



            it('construtor do PacoteDeRetorno_DeSolicitacaoSemErro', () => {        

                const result: PacoteDeRetorno_DeSolicitacaoSemErro = 
                    pacoteDeRetorno_DeSolicitacaoSemErro(s)
                    
                const expected = {
                    type: "PacoteDeRetorno_DeSolicitacaoSemErro",
                    direcao,
                    canal,
                    dado,
                }
                
                expect(
                    result
                ).toEqual(expected)

            })


            describe('interpretacao de Pacote de retorno', () => { 

                // arrange
                // TODOS OS TIPOS DE PACOTE DE TRANSMISSAO E RECEPCAO

                // PACOTES DE TRANMISSAO
                const T_Envio_1: PacoteDeTransmissao = 
                    pacoteDeTransmissao(Direcao.ENVIO, canal, comando, dado)
                const T_Envio_2: PacoteDeTransmissao =
                    pacoteDeTransmissao(Direcao.MASCARA_PARA_SETAR_BITS, canal, comando, dado)
                const T_Envio_3: PacoteDeTransmissao =
                    pacoteDeTransmissao(Direcao.MASCARA_PARA_RESETAR_BITS, canal, comando, dado) 
                const T_Solic_1: PacoteDeTransmissao =
                    pacoteDeTransmissao(Direcao.SOLICITACAO, canal, comando, dado) 
                //PACOTE DE RETORNO COM ERRO
                const R_NACK: Frame = 
                    createPerfectFrame(NACK,[direcao+canal, comando, dadoL, dadoH]) // would ignore direcao
                //PACOTE DE RETORNO SEM ERRO
                const R_ACK: Frame = 
                    createPerfectFrame(ACK,[direcao+canal, comando, dadoL, dadoH]) // would ignore direcao
        
        
        
                it('pacote de retorno com erro', () => {        
        
        
                    //act
                    const R_Erro1: PacoteDeRetorno = interpretacaoFrameDeRetorno( T_Envio_1, R_NACK )
                    const R_Erro2: PacoteDeRetorno = interpretacaoFrameDeRetorno( T_Envio_2, R_NACK )
                    const R_Erro3: PacoteDeRetorno = interpretacaoFrameDeRetorno( T_Envio_3, R_NACK )
                    const R_Erro4: PacoteDeRetorno = interpretacaoFrameDeRetorno( T_Solic_1, R_NACK )
        
                    //assert
                    const result__ = {0:R_Erro1, 1:R_Erro2, 2:R_Erro3, 3:R_Erro4}
                    const e:PacoteDeRetorno  = pacoteDeRetorno_ComErro(s)
                    const expected__ = {0:e, 1:e, 2:e, 3:e}
                    expect(
                        R.equals(expected__,result__)
                    ).toEqual(true)
        
                })
        
        
                it('pacote de retorno de envio sem erro', () => {        
        
                    //act
                    const R_1: PacoteDeRetorno = interpretacaoFrameDeRetorno( T_Envio_1, R_ACK )
                    const R_2: PacoteDeRetorno = interpretacaoFrameDeRetorno( T_Envio_2, R_ACK )
                    const R_3: PacoteDeRetorno = interpretacaoFrameDeRetorno( T_Envio_3, R_ACK )
        
                    //assert
                    const result__ = {0:R_1, 1:R_2, 2:R_3}
                    const e:PacoteDeRetorno  = pacoteDeRetorno_DeEnvioSemErro(s)
                    
        
                    const expected__ = {0:e, 1:e, 2:e}
                    expect(
                        R.equals(expected__,result__)
                    ).toEqual(true)
        
                })
        
        
                it('pacote de retorno de solicitacao sem erro', () => {        
        
                    //act
                    const R_1: PacoteDeRetorno = interpretacaoFrameDeRetorno( T_Solic_1, R_ACK )
        
                    //assert
                    const result__ = R_1
                    const e:PacoteDeRetorno  = pacoteDeRetorno_DeSolicitacaoSemErro(s)
                    const expected__ = e
                
                    expect(
                        //R.equals(expected__,result__)
                        result__
                    ).toEqual(expected__)
        
                })
        
            })





        })


    })



    it('Convert PacoteDeTransmissao para Segment', () => {        

        const direcao = 192
        const canal = 5
        const comando = 60
        const dado = 1026
        const p: PacoteDeTransmissao = pacoteDeTransmissao(direcao, canal, comando, dado)
        
        const result: Segment = pacoteDeTransmissaoToSegment(p)

        const [dadoH, dadoL] = int2word(dado)
        
        const expected:Segment = segment(direcao, canal, comando, dadoL, dadoH)

        expect(
            result
        ).toEqual(expected)

    })


    it('Serializacao do pacote de transmissao (inclui incorporacao do Frame)', () => {        

        // arrange
        const direcao = 192
        const canal = 5
        const comando = 60
        const dado = 1026
        const [dadoH, dadoL] = int2word(dado)
        const p: PacoteDeTransmissao = pacoteDeTransmissao(direcao, canal, comando, dado)
        
        // act
        const result: Bytes = pacoteDeTransmissaoToBytes(p)

        // assert
        const expected: Bytes = frame2Bytes( createPerfectFrame(STX,[direcao+canal, comando, dadoL, dadoH]) )
        expect(
            result
        ).toEqual(expected)

    })

    


})
