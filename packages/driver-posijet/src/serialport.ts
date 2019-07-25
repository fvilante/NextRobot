import {Size, Bytes} from './common'
import {IO} from 'monet'
import * as R from 'ramda'

export const test = "oi"

export type PortName = string

// todo: change name to serialporteffect or something like that, maybe we can extends from unsafeioeffect.
//       would be good if there exists a ready to use mockup way to instantiate a fake UnsafeIOEffect for this serial   
export interface UnsafeIOEffect {
    read: () => Bytes,
    write: (data: Bytes) => void,
}

type OnReadEvent = (name:PortName, dataRead: Bytes) => void
type OnWriteEvent = (name: PortName, dataToBeWritten: Bytes) => void

interface EventListener {
    onRead: OnReadEvent[],
    onWrite: OnWriteEvent[],
}



export interface SerialPort {
    name: PortName,
    effect: UnsafeIOEffect,
    read: () => Bytes,               // reads the effects and decorate
    write: (data: Bytes) => void,      // writes using the effects and decorate
    eventListeners: EventListener[],
}



function serialPort(name, effect, read, write, eventListeners): SerialPort {
    return {name, effect, read, write, eventListeners}
}


// basic serial implementation
export function defaultSerialPort(name:PortName , effect: UnsafeIOEffect, eventListeners: EventListener[] = []): SerialPort {

    function fread(): Bytes {
        const data = effect.read()
        eventListeners.map( listener => listener.onRead.map( onRead => onRead(name, data) ) )
        return data
    }

    function fwrite(data: Bytes): void {
        eventListeners.map( listener => listener.onWrite.map( onWrite => onWrite(name, data) ) )
        effect.write(data)
    }

    const read = fread
    const write = fwrite


    return serialPort(name, effect, read, write, eventListeners)


}








