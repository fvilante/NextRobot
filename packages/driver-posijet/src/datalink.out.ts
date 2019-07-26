
import * as R from 'ramda'
import { Byte, Bytes, ByteC, BytesC } from './byte'
import { ESC, ETX } from './datalink.common'


export function checksum(obj: Bytes, startbyte: Byte): Byte  {
    //todo: this int to byte wrap should be done automatically by Byte class
    const objsum = ByteC(R.sum(obj))
    const extra = ByteC(R.sum([startbyte, ETX]))
    const totalsum = ByteC(R.sum([objsum, extra]))
    const contained = ByteC(R.modulo(totalsum, 256)) // maps: int -> byte
    const complimented = ByteC(256 - contained)
    const adjusted = ByteC((complimented == 256) ? 0 : complimented)
    return adjusted
}

//todo: immutable style?
export function dup_esc(obj: Bytes): Bytes {
    let res: Bytes = BytesC([])
    for (let byte of obj) {
        if (byte == ESC) {
            res.push(ESC)
            res.push(ESC) 
        } else
            res.push(byte)
    }
    return res
}




