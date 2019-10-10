
export type PortConfig = {
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