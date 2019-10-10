
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

/** Generic PortInfo */
export type PortInfo = {
    readonly comName: string;
    readonly detail: LocalPCPortInfo | RemotePortInfo
}
