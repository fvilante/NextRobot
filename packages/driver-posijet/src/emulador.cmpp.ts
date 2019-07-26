import { DadoH, DadoL, frame2Segment, Segment, Direcao } from './transport';
import * as R from 'ramda'
import { Bytes, Byte, BytesC } from './byte'
import { UnsafeIOEffect, defaultSerialPort } from './serialport'
import { isValidFrame, bytesToFrameReal } from './datalink.in'
import { } from './datalink.out'
import { Frame, createPerfectFrame, frame2Bytes, ACK } from './datalink.common'

export const test = "oi"

type Word = number
type DataH = Byte

interface MemoryBlock {
    address: Word
    dadoH: DadoH
    dadoL: DadoL
}

const memoryBlock = (address, dadoH, dadoL) => <MemoryBlock>({address, dadoH, dadoL})

interface State {
    memory: MemoryBlock[]
}


const initialState: State = {
    memory: [

        { 
            address: 0x60,
            dadoH: 0,
            dadoL: 1,
        },

        { 
            address: 0x61,
            dadoH: 5,
            dadoL: 10,
        },
        
        { 
            address: 0x62,
            dadoH: 6,
            dadoL: 20,
        },

    ]
}

const state: ( (m: MemoryBlock[]) => (State) ) = memory => ({memory})


const writeOnEmulatedMemory: ( (oldState: State, segment: Segment) => [MemoryBlock[], State] ) = (oldState, segment) => {

    //arrange
    const direcao = <Direcao>(segment.direcao)
    const address = segment.comando
    const dadoH = segment.dadoH
    const dadoL = segment.dadoL
    const memory: MemoryBlock[] = oldState.memory

    var res: [MemoryBlock[], State]
    
    switch (direcao) {

        case Direcao.ENVIO:
            //change memory
            const li: MemoryBlock[] = R.reject( block => (block.address == address), memory )
            const newBlock: MemoryBlock = memoryBlock(address, dadoH, dadoL)
            const newMemory: MemoryBlock[] = R.insert(0, newBlock, li)
            res = [ [], state(newMemory) ]
            break

        case Direcao.MASCARA_PARA_RESETAR_BITS:
        case Direcao.MASCARA_PARA_SETAR_BITS:
        case Direcao.SOLICITACAO:
        default:
            const block: MemoryBlock[] = R.filter( block => (block.address == address), memory)
            res = [ block, oldState ]
            break

    }

    return res

}


const rx: ( (data: Bytes, oldState:State) =>  [MemoryBlock[], State] ) =  (data, oldState)  => 
    R.pipe ( bytesToFrameReal, frame2Segment, R.curry(writeOnEmulatedMemory)(oldState) ) (data)

function tx( d: [MemoryBlock[], State] ): Bytes {
    
    const [ memoryBlock, state ] = d
    var res
    
    if (R.isEmpty(memoryBlock)) {
        //pacote de retorno de solicitacao
        res = frame2Bytes( createPerfectFrame(ACK,[0,11,22,33]) )
    } else {
        //pacote de retorno de envio
        res = frame2Bytes( createPerfectFrame(ACK,[0,2,11,22]) )
    }

    return res
}



let theState: State = initialState


//todo: refactor to immutable ?
export function criaPortaSerialEmulada() {

    let buffer: Bytes = BytesC([])

    const read = () => { 
        const buf = buffer; 
        buffer = []; 
        return tx( rx( R.flatten(buf), theState ) )
    }

    const write = (data: Bytes) => 
        buffer = R.concat(buffer, data)

    const effects: UnsafeIOEffect = { read , write}

    return defaultSerialPort("comport-CMPP-Emulada", effects)

}








