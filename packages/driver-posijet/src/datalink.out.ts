
import * as R from 'ramda'
import { Byte, Bytes } from './common'
import { Obj, ESC, STX, ETX, ACK, NACK, createPerfectFrame, frame2Bytes } from './datalink.common'


export function checksum(obj: Bytes, startbyte: Byte): Byte  {
    const objsum = R.sum(obj)
    const extra = R.sum([startbyte, ETX])
    const totalsum = R.sum([objsum, extra])
    const contained = R.modulo(totalsum, 256) // maps: int -> byte
    const complimented = 256 - contained
    const adjusted = (complimented == 256) ? 0 : complimented
    return adjusted
}

export function dup_esc(obj: Bytes): Bytes {
    let res: Bytes = []
    for (let byte of obj) {
        if (byte == ESC) {
            res.push(ESC)
            res.push(ESC) 
        } else
            res.push(byte)
    }
    return res
}




