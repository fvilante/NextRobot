import { cloneDeep } from 'lodash';
import { Frame } from './datalink.common';
import * as R from 'ramda'
import { dup_esc, checksum } from './datalink.out';
import { Byte, Bytes, Func, Word } from './common'



// Commom material
export const ESC: Byte = 27
export const STX: Byte = 2
export const ACK: Byte = 6
export const ETX: Byte = 3
export const NACK: Byte = 21

export type Obj = Bytes  // representa o objeto que é transportado pelo datalink
                    
export interface Frame {
    readonly PRE_NOISE: Bytes,
    readonly INITIAL_ESC: Bytes,
    readonly START_BYTE: Bytes,
    readonly OBJECT: Bytes,      //without duplicated escs
    readonly FINAL_ESC: Bytes,
    readonly END_BYTE: Bytes,
    readonly CHECKSUM: Bytes,    //without duplicated escs
    readonly POST_NOISE: Bytes

}

export function createPerfectFrame(start_byte: Byte, obj: Obj): Frame {    
    return  {
        PRE_NOISE: [],
        INITIAL_ESC: [ESC],
        START_BYTE: [start_byte],
        OBJECT: obj,
        FINAL_ESC: [ESC],
        END_BYTE: [ETX], 
        CHECKSUM: [checksum(obj, start_byte)],
        POST_NOISE: []
    }
}

export type FrameKeys = keyof Frame
type FrameKeyValue = [ FrameKeys , Bytes]

         

export function changeFrame( newKeyValues: FrameKeyValue[], frame: Frame): Frame {
    
    let mutable = 
        {
            PRE_NOISE: frame.PRE_NOISE,
            INITIAL_ESC: frame.INITIAL_ESC,
            START_BYTE: frame.START_BYTE,
            OBJECT: frame.OBJECT,
            FINAL_ESC: frame.FINAL_ESC,
            END_BYTE: frame.END_BYTE, 
            CHECKSUM: frame.CHECKSUM,
            POST_NOISE: frame.POST_NOISE
        }

    //update
    for (let kv of newKeyValues) {
        const [key, value] = kv
        mutable[key] = value
    }

    return mutable

}


const bind = (f:Func<any,Bytes>,a:any)  => f(a)
const conversor = (f:Frame):Bytes => {
    
    //ESC Duplication

    const stream = [ 
        f.PRE_NOISE,
        f.INITIAL_ESC,
        f.START_BYTE,
        dup_esc(f.OBJECT),
        f.FINAL_ESC,
        f.END_BYTE,
        dup_esc(f.CHECKSUM),
        f.POST_NOISE
    ]

    return R.flatten((stream))
}
export const frame2Bytes = R.curry(bind)(conversor)





