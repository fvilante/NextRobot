import { Driver as CMPP00LG  } from './driver/driver-def-CMPP00LG'
import { UserProgram } from './driver/driver-core';

import { LinearAxisClassic } from './core-models/physical-arm';

import { Device } from './core-models/device'
import { Channel } from './core-models/channel'

import { SendCmppProgram } from './transaction/application-transaction'

import { 
    Milimeter, 
    Space, 
    Speed, 
    Acceleration, 
    MilimeterPerSecond, 
    MilimeterPerSquareSecond, 
    Pulse 
} from './application-types'
import { CmppAddress } from '../transport-layer/transaction/CmppAddress';

const Test = async () => {

    const programa: UserProgram<CMPP00LG> = {
        'Posicao Inicial': Milimeter(10),
        'Posicao Final': Milimeter(30),
        'Velocidade de Avanço': MilimeterPerSecond(100),
        'Velocidade de Retorno':  MilimeterPerSecond(100),
        'Aceleração de Avanço': MilimeterPerSquareSecond(5000),
        'Aceleração de Retorno': MilimeterPerSquareSecond(5000),
    }
    
    const bracoMecanico = LinearAxisClassic(200, 20, 5.08)
    const cmppAddress = CmppAddress({channel: 1, baudRate: 9600, portName: 'COM3'})
    
    const eixoX = Device(bracoMecanico, cmppAddress , CMPP00LG)
    
    console.log(`Enviando...`)
    const a = await SendCmppProgram(programa, eixoX)
    console.log(` Ok!`)

}

// tslint:disable-next-line: no-expression-statement
Test()








