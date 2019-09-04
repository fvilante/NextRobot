import { Driver } from './driver/driver-def-CMPP00LG'
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


const programa: UserProgram<Driver> = {
    'Posicao Inicial': Milimeter(10),
    'Posicao Final': Milimeter(30),
    'Velocidade de Avanço': MilimeterPerSecond(100),
    'Velocidade de Retorno':  MilimeterPerSecond(100),
    'Aceleração de Avanço': MilimeterPerSquareSecond(5000),
    'Aceleração de Retorno': MilimeterPerSquareSecond(5000),
}

const bracoMecanico = LinearAxisClassic(200, 20, 5.08)

const eixoX = Device(bracoMecanico, 'Com1', Channel(1), Driver )

const a = SendCmppProgram(programa, eixoX)






