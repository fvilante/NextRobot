import { serialDriver } from './serial-driver'

import { PortConfig} from './serial-interface'

// tslint:disable: no-expression-statement

const portConfig: PortConfig = {
    baudRate: 2400,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    rtscts: false,
    xon: false,
    xoff: false,
}

const delay = (ms:number):Promise<void> =>
    new Promise( (resolve) => { setTimeout( () => resolve(), ms) })

const Test = async () => {
    console.log(`abrindo porta`)
    try {
        const port = await serialDriver('COM3', portConfig)
        console.log(`porta aberta`)
        port.onData( bytes => console.log(`Receiving: ${bytes}`))
        port.onClose( () => console.log(`closing port`))
        port.onError( error => console.log(`error: ${error}`))
        console.log(`enviando`)
        port.write([0x1B, 0x02, 0xC2, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x86])
    
        await delay(1000)
        port.close()
    } catch (err) {
        console.log(`erro ao abrir porta: ${err}`)
    }

}

// tslint:disable-next-line: no-expression-statement
const runTest = async () => {
    await Test()
    await delay(100)
    await Test()
}

runTest()
