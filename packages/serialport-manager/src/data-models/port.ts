import { Bytes } from "./bytes"


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



/** interface only, do not instantiate directly it */
export type _Port = {

    // por name (ie: 'COM1', 'COM2', etc)
    // Note: It's not case sensitive
    readonly Name: string

    // expect by its name, this parameters can be defined when you open a port
    readonly Config: {
        readonly baudRate: 115200|57600|38400|19200|9600|4800|2400|1800|1200|600|300|200|150|134|110|75|50 //|number;
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
    readonly Info:  {
        readonly name: _Port['Name'];
        readonly detail: LocalPCPortInfo | RemotePortInfo
    }

    // type of data that flow thrugh port
    readonly DataFlow: Bytes  

    // references a port inequivally so we can cause effects through it
    readonly Reference: {
        readonly name: _Port['Name']
        readonly config: _Port['Config']
    }

    // Represents am alredy oppened concrete effectful serial port 
    readonly Openned: {
        readonly write: (_: Bytes) => void
        readonly close: () => void
        readonly onClose: (callback: () => void) => void
        readonly onData: (callback: (_: Bytes) => void) => void
        readonly onError: (callback: (error?: Error) => void) => void
    }


    // Represents a concrete effectful Driver that knows how to open a port on the system
    readonly Opener: (port: _Port['Reference']) => Promise<_Port['Openned']>


}



// to be used in case of no data informed
export const defaultPortConfig: _Port['Config'] = {
    baudRate: 2400,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    rtscts: false,
    xon: false,
    xoff: false,
}

export const PortReference = (name: _Port['Name'], config: _Port['Config']):_Port['Reference'] => ({name, config})
