import { Bytes } from "./bytes"
import { Future } from "@nextrobot/core-utils"


/** Port info of a local port into a PC (Windows/Linux) */
export type LocalPCPortInfo = {
    readonly kind:          'LocalPCPortInfo' 
    readonly manufacturer:  string | undefined
    readonly serialNumber:  string | undefined
    readonly pnpId:         string | undefined
    readonly locationId:    string | undefined
    readonly productId:     string | undefined
    readonly vendorId:      string | undefined
}


/** A port info that is not local (ie: trough www, or other tunel-linke technique) */
export type RemotePortInfo = {
    readonly kind: 'RemotePortInfo'
    // todo: implement this feature
}

// port name (ie: 'COM1', 'COM2', etc)
// Note: It's not case sensitive
export type PortName = string

/** NOTE: Concrete driver valid baudrates are listed in comment bellow. This type narrows for what we are using at moment (you can wide it if necessary)
 *  //115200|57600|38400|19200|9600|4800|2400|1800|1200|600|300|200|150|134|110|75|50 //|number; 
 */
export type BaudRate = 9600 | 2400 

// expect by its name, this parameters can be defined when you open a port
export type PortConfig = {
    readonly dataBits: 8|7|6|5;
    //readonly highWaterMark: number;
    //readonly lock: boolean;
    readonly stopBits: 1|2;
    readonly parity: 'none'|'even'|'mark'|'odd'|'space';
    readonly rtscts: boolean;
    readonly xon: boolean;
    readonly xoff: boolean;
}

// Information we can get from a port without openning it, just asking to Operational System
export type PortInfo = {
    readonly name: _Port['Name'];
    readonly detail: LocalPCPortInfo | RemotePortInfo
}

// references a port inequivally so we can cause effects through it
export type PortReference = {
    readonly name: _Port['Name']
    readonly baudRate: _Port['BaudRate']
    readonly config: _Port['Config']
}

// Represents am alredy oppened concrete effectful serial port 
export type PortOpened = {
    readonly write: (_: Bytes) => void
    readonly close: () => void
    readonly onClose: (callback: () => void) => void
    readonly onData: (callback: (_: Bytes) => void) => void
    readonly onError: (callback: (error?: Error) => void) => void
    readonly info: () => PortInfo
    readonly reference: () => PortReference
}

// Represents a concrete effectful Driver that knows how to open a port on the system
export type PortOpenner = (port: PortReference) => Future<PortOpened>



/** interface only, do not instantiate directly it */
export type _Port = {

    readonly Name: PortName

    readonly BaudRate:  BaudRate

    readonly Config: PortConfig

    readonly Info: PortInfo

    readonly PortsList: readonly _Port['Info'][]

    // type of data that flow thrugh port
    readonly DataFlow: Bytes  

    readonly Reference: PortReference

    readonly Openned: PortOpened

    readonly Opener: PortOpenner

}


// to be used in case of no data informed
export const defaultPortConfig: _Port['Config'] = {
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    rtscts: false,
    xon: false,
    xoff: false,
}

export const PortReference = (name: _Port['Name'], baudRate: _Port['BaudRate'], config: _Port['Config']): _Port['Reference'] => ({name, baudRate, config})
