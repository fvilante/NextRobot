import { 
    runPortTransaction,
    PortConfig, 
    PortAddress,
    SerialMessenger,
} from './serial-interface'

import { 
    serialDriver 
} from './serial-driver'

import {
    makeSerialMessenger
} from './serial-messenger'

const portConfig: PortConfig = {
    baudRate: 2400,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    rtscts: false,
    xon: false,
    xoff: false,
}

const portAddress: PortAddress = PortAddress('COM3', portConfig)



const Test1 = async () => {
    const messanger1: SerialMessenger<'A' | 'B'> = {
        toWrite: () => [0x1B, 0x02, 0xC2, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x86],
        receptionHandler: byte => (byte === 0x03) ? {kind: 'Sucessful', data: 'A'} : { kind: 'Processing' }
    }
    const a = await runPortTransaction(serialDriver, portAddress, messanger1)
    console.log(a)
}


const Test2 = async () => {
    const msg = makeSerialMessenger([0xC2, 0x50, 0x61, 0x02])
    console.log(`Enviando pacote: ${msg.toWrite()}`)
    const x = [0x1B, 0x02, 0xC2, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x86]
    console.log(`Que deveria ser igual a: ${x}`)
    const a = await runPortTransaction(serialDriver, portAddress, msg)
    console.log(`Resposta do pacote: ${a.data}`)
}

// tslint:disable-next-line: no-expression-statement
//Test1()


const runTest = async () => {
    // tslint:disable-next-line: no-expression-statement
    await Test2() ; await Test2() ; await Test2() ; await Test2() ; await Test2() ; await Test2() ; await Test2() ; await Test2() ; await Test2() ; await Test2() ; await Test2()
}

console.log(`Iniciando Teste...`)
// tslint:disable-next-line: no-expression-statement
runTest()

