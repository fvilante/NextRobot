import { AnyUserProgram, Memmap, GetParameterMemmap, US0 } from "../memmap/core";

import { UserProgram, memmapFactory} from '../memmap/driver/CMPP09AF-3'
import { LinearAxisClassic } from "../core-models/physical-arm";
import { transact } from "../transport-layer/transaction/transact";
import { CmppAddress } from "../transport-layer/transaction/CmppAddress";
import { PacoteDeTransmissao } from "../transport-layer/transaction/pacote-models/PacoteDeTransmissao";
import { Device } from "../core-models/device";
import { serialPortOpenner_PC } from "@nextrobot/serialport-manager";
import { PacoteDeRetorno_ComErro } from "../transport-layer/transaction/pacote-models/PacoteDeRetorno_ComErro";
import { PacoteDeRetorno_DeSolicitacaoSemErro } from "../transport-layer/transaction/pacote-models/PacoteDeRetorno_DeSolicitacaoSemErro";
import { ByteToWord } from "../transport-layer/transaction/pacote-models/base-model/byteAndWordConversors";
import { PacoteDeRetorno_DeEnvioSemErro } from "../transport-layer/transaction/pacote-models/PacoteDeRetorno_DeEnvioSemErro";
import { LINEARVELOCITY, UnitSystem } from "../memmap/kinetics/measure";
import { UnitConversor } from "../memmap/kinetics/units-core";


 // tslint:disable: no-if-statement 

type Connection<U extends AnyUserProgram> = {
    readonly GetParameter: <K extends keyof U>(parameterName: K) => Promise<U[K]>
    readonly SetParameter: <K extends keyof U>(parameterName: K, value: U[K]) => Promise<void>
}

const Connect = <U extends AnyUserProgram>(memmap: Memmap<U>, device: Device<U>):Connection<U> => {

    const cmppAddress = device.cmppAddress
    const env = { portOpener: serialPortOpenner_PC, cmppAddress }

    return {
        GetParameter: parameterName => new Promise( async (resolve, reject) => {

            try {
                const paramMemmap = GetParameterMemmap(memmap, parameterName)
            
                const comando = paramMemmap.startWord
                const word16 = 0

                const pacote = PacoteDeTransmissao('Solicitacao', comando, word16)
    
                const r = await transact( pacote ).run(env)
    
                const pacoteDeRetorno = r.pacoteRetornado
                const kind = pacoteDeRetorno.kind
                        
               
                if (kind==='PacoteDeRetorno_ComErro') {
                    reject([ r.diagnostics, pacoteDeRetorno as PacoteDeRetorno_ComErro])
                } else if (kind==='PacoteDeRetorno_DeSolicitacaoSemErro') {
                    const p =  (pacoteDeRetorno as PacoteDeRetorno_DeSolicitacaoSemErro)
                    const dadoL = p.payload.dadoL
                    const dadoH = p.payload.dadoH
                    const uncastedValue = ByteToWord(dadoL, dadoH)
                    //todo: pick specific bits
                    const castedValue = paramMemmap.caster.cast(uncastedValue)
                    resolve(castedValue)
                }
            } catch (err) {
                reject(`Nao foi possivel realizar transmissao do pacote. Erro: ${err}`)
            }

        } ),

        SetParameter: (parameterName, parameterValue) => new Promise( async (resolve, reject) => { 

            try {
                const paramMemmap = GetParameterMemmap(memmap, parameterName)
                const unCaster = paramMemmap.caster.unCast
                const bitSize = paramMemmap.bitSize

                const comando = paramMemmap.startWord
                const word16 = unCaster(parameterValue)
                //todo: crop the number contained in word16 to 16 bits

                //todo: Use strategy to send for different bitSizes of data 
    
                const r = 
                    await transact(
                        PacoteDeTransmissao('Envio', comando, word16))
                        .run(env)

    
                const pacoteDeRetorno = r.pacoteRetornado
                const kind = pacoteDeRetorno.kind
                        
                
                if (kind==='PacoteDeRetorno_ComErro') {
                    reject([ r.diagnostics, pacoteDeRetorno as PacoteDeRetorno_ComErro])
                } else if (kind==='PacoteDeRetornoDeEnvioSemErro') {
                    const p =  (pacoteDeRetorno as PacoteDeRetorno_DeEnvioSemErro)
                    const statusL = p.payload.statusL
                    const statusH = p.payload.statusH
                    resolve(undefined) //if everything ok returns void 
                }
            } catch (err) {
                reject(`Nao foi possivel realizar transmissao do pacote. Erro: ${err}`)
            }

        }), 
    }
}

// informal test


const Test1 = async () => {

    console.log(`============================================================`)

    const cmppAddress = CmppAddress({channel: 0, portName: 'COM6', baudRate: 9600})
    const physicalArm = LinearAxisClassic({beltStepInMilimeters: 5.08, teethOnTheMotorPulley: 16, pulsesPerMotorRevolution: 400})
    const memmap = memmapFactory(physicalArm)

    const device = Device({cmppAddress, physicalArm})

    console.log(`sending`)

    const cmpp = Connect(memmap, device)

    const a = await cmpp.GetParameter('Velocidade de avanco programada')

    const b = await cmpp.SetParameter('Velocidade de avanco programada', LINEARVELOCITY(10, US0))


    console.log(`result`, a, b)

    console.log(`============================================================`)

}

// tslint:disable-next-line: no-expression-statement
Test1()