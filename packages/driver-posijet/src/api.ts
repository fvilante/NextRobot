
// outgoing part
import { ByteC, Byte } from './byte'
import { segment, Segment,  Direcao, segment2Frame, int2word } from './transport'
import { ACK, frame2Bytes } from './datalink.common'

// incomming part
import { frame2Segment, word2int } from './transport'
import { isValidFrame, bytesToFrameReal } from './datalink.in'


// -----------------------------
// Outgoing
// -----------------------------

export type Direction = 
    | 'ENVIO'
    | 'SOLICITACAO'
    | 'MASCARA_PARA_SETAR_BITS'
    | 'MASCARA_PARA_RESETAR_BITS'


const __mapDirection = (d: Direction): Direcao => {
    switch(d) {
        case 'ENVIO': return Direcao.ENVIO
        case 'MASCARA_PARA_RESETAR_BITS': return Direcao.MASCARA_PARA_RESETAR_BITS
        case 'MASCARA_PARA_SETAR_BITS': return Direcao.MASCARA_PARA_SETAR_BITS
        case 'SOLICITACAO': return Direcao.SOLICITACAO
    }
}

export type CmppPacket = {
    direction: Direction
    channel: number
    command: number
    data: number // Put the 'Word' here: DadoLow and DadaHigh are derived from 'Word' further on code
} 
export const CmppPacket = (direction: Direction, channel: number, command: number, data: number): CmppPacket => 
    ({direction, channel, command, data})

type Bytes = number[]

const MakeCmppStream = (p: CmppPacket): Bytes  => {
    const direcao: Direcao = __mapDirection(p.direction)
    const [dadoH, dadoL] = int2word(p.data) 
    const s:Segment = segment(direcao, p.channel, p.command, dadoL, dadoH)
    const frame = segment2Frame(ACK, s)
    const outputBytes = frame2Bytes(frame)
    return outputBytes
}



// -----------------------------
//  Ingoing
// -----------------------------

const __mapDirecao = (d: Direcao): Direction => {
    switch(d) {
        case Direcao.ENVIO: return 'ENVIO'
        case Direcao.MASCARA_PARA_RESETAR_BITS: return 'MASCARA_PARA_RESETAR_BITS'
        case Direcao.MASCARA_PARA_SETAR_BITS: return 'MASCARA_PARA_SETAR_BITS'
        case Direcao.SOLICITACAO: return 'SOLICITACAO'
    } 
}

export type InvalidFrame = {
    kind: 'InvalidFrame'
    error: 'Invalid Frame Received'
    originalByteStream: number[] 
}


const __mapSegment = (s: Segment): CmppPacket => ({
    direction: __mapDirecao(s.direcao),
    channel: s.canal,
    command: s.comando,
    data: word2int(s.dadoH, s.dadoL)
})

const ReadCmppStream = (data: Bytes): CmppPacket | InvalidFrame => {
    const isValid = isValidFrame(data)
    if (isValid) {
        const frame = bytesToFrameReal(data)
        const segment = frame2Segment(frame)
        const result = __mapSegment(segment)
        return result
    } else {
        return ({
            kind: 'InvalidFrame',
            error: 'Invalid Frame Received',
            originalByteStream: data,
        })
    }

}


// ---------
// API
// ---------


export const DataLinkUtility = {
    MakeCmppStream,
    ReadCmppStream
}
