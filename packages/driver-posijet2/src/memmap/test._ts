import { serialPortOpenner_PC } from "@nextrobot/serialport-manager"
import { CmppAddress } from "../transport-layer/transaction/CmppAddress"
import { LinearAxisClassic } from "../core-models/physical-arm"
import { Device } from '../core-models/device'
import { memmap } from "./driver/CMPP00LG"
import { ReadSingleParameter } from './client'
import { AnyUserProgram, Memmap } from "./core"

// serial port manager
const getPortOpener = () => {
    return serialPortOpenner_PC // driver responsible do manage physical serial port
}


const getCmppAddress = () => {
    const portName = 'COM3'
    const channel = 1
    const baudRate = 9600
    return CmppAddress({channel, portName, baudRate})
}

const getMemmap = () => {
    return memmap
}
    
const getDevice = () => {
    return Device({
        cmppAddress: getCmppAddress(),
        memmap: getMemmap() as unknown as Memmap<AnyUserProgram>, //todo: remove this type coersion
        physicalArm: LinearAxisClassic({beltStepInMilimeters:5.08,pulsesPerMotorRevolution: 400,teethOnTheMotorPulley: 16})
    })
} 


// cmpp address 


// send user program def and promise response


const Test = async () => {

    const device = getDevice()
    const portOpenner = getPortOpener()
    const getParameter = ReadSingleParameter(portOpenner)(device)
    
    console.log('buscando parametro: ')
    try {
        const a = await getParameter('Parametro1')
        console.log('resultado')
        console.log(a)
        console.table(a)
    } catch(err) {
        console.log('deu erro:', err)
    }


}



// tslint:disable-next-line: no-expression-statement
Test()