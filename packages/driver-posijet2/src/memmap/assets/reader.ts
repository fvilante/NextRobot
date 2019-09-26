import SerialPort = require("serialport")




export type Reader<R,A> = {

    readonly run: (_: R) => A
    
    readonly map: <B>(fn: (_:A) => B) => Reader<R,B> 

    readonly fmap: <B>(fn: (_:A) => Reader<R,B>) => Reader<R,B> 

}


export const Reader = <R,A>(fr: (_:R) => A): Reader<R,A> => {


    return {

        run: r => fr(r),

        map: fn => Reader( (r:R) => fn(fr(r)) ),

        fmap: fn => Reader((r:R) => fn(fr(r)).run(r) ),

    }

}




// --------------------------------------------
// informal test
// --------------------------------------------

// todo: extract this test to other file

const Test = () => {

    type Printer = {
        readonly kind: 'printer'
        readonly sendMsg: (msg: number) => void
        readonly getStatus: () => 'oi' | 'not'
    }
    const Printer = ():Printer => ({ kind: 'printer', sendMsg: msg => {}, getStatus: () => 'oi'})

    type Env = {
        readonly p1: number,
        readonly p2: string, 
    }

    const env1: Env = { p1: 2, p2: 'po'}
    const env2: Env = { p1: 3, p2: 'op'}

    const Env = (x: Env) => x

    const configurePrinter = (name: string): Printer => Printer()


    const getEnviroment = () => Reader(Env)

    const getPrinter = () => getEnviroment().map( env => {

        return configurePrinter(env.p2)

    })

    const printMsg = (n: number ) => 
        getEnviroment().fmap( env => 
                getPrinter().map( printer => 
                        printer.sendMsg(env.p1 + n)) )

    const getStatus = () => 
            getPrinter().map( printer => 
                printer.getStatus() )

           
    
    
    const executeScript = () => getEnviroment().map( env => {

        const a = printMsg(2).run(env)
        const b = getStatus().run(env)
    
    })

                    

    const runProduction = () => executeScript().run(env1)
    // tslint:disable-next-line: no-expression-statement
    const runTest = () => (logMsg: string) => { executeScript().run(env2); console.log() }

    // tslint:disable-next-line: no-expression-statement
    runTest()

    
}


// tslint:disable: no-class
const Test2 = () => {

    type PortConfig = {
        readonly portName: string
        readonly baudRate: '9600' | '2400' 
    }

    const getPortConfig = () => Reader( (x: PortConfig) => x)

    type Work<A> = Reader<PortConfig, A>

    type MachineState = { readonly status: number }

    type Service1 = {


        readonly run: <A>(w: Work<A>) => A | void

        readonly put: (msg: string) => Work<MachineState>

        readonly get: (addr: number) => Work<'oi'> 


    }

    const Service1 = (portConfig: PortConfig):Service1 => {

        const s: Service1 = {

            run: work => {
                try {
                    return work.run(portConfig)
                } catch (e) {
                    return 
                }

            },

            put: msg => getPortConfig().map( config => ({status: Number(config.baudRate)})),

            get: addr => getPortConfig().map( (config):'oi' => 'oi'),

        }

        return s


    }
    // tslint:disable: no-expression-statement

    const port1: PortConfig = {
        portName: 'COM1',
        baudRate: "9600"
    }

    const port2: PortConfig = {
        portName: 'COM2',
        baudRate: '2400'
    }

    const s1 = Service1(port1)

    const macro = () => {
        
        const work1 = s1.get(20)
        const work2 = s1.put('hi').fmap( state => s1.get(state.status))

        const a = s1.run(work1)
        const b = s1.run(work2)

    }

    



}