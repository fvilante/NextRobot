

/** NOTE: 'E' stands for Enviroment */
export type Reader<E,A> = {

    readonly run: (enviroment: E) => A
    
    readonly map: <B>(fn: (_:A) => B) => Reader<E,B> 

    readonly fmap: <B>(fn: (_:A) => Reader<E,B>) => Reader<E,B> 

}


export const Reader = <E,A>(fn: (enviroment: E) => A): Reader<E,A> => {

    const run: Reader<E,A>['run'] = env => {

        return fn(env)

    }

    const map: Reader<E,A>['map'] = f => {

        return Reader( env => {
            const a = run(env)
            const b = f(a)
            return b
        })

    }

    const fmap: Reader<E,A>['fmap'] = f => {
        
        return Reader( (env:E) => {
            const a = run(env)
            const mb = f(a)
            const b = mb.run(env)
            return b
        })
   
    }

    return {
        run,
        map,
        fmap,
    }

}




// --------------------------------------------
// informal test
// --------------------------------------------

// todo: extract this test to other file

// todo: Refactor this tests (they were the first I did and probably are over complicated)

const Test = () => {

    type Printer = {
        readonly kind: 'printer'
        readonly sendMsg: (msg: number) => void
        readonly getStatus: () => 'oi' | 'not'
    }
    const Printer = ():Printer => ({ kind: 'printer', sendMsg: msg => {}, getStatus: () => 'oi'})

    /** enviroment variable */
    type Env = {
        readonly p1: number,
        readonly p2: string, 
    }

    const env1: Env = { p1: 2, p2: 'po'}
    const env2: Env = { p1: 3, p2: 'op'}

    const Env = (x: Env) => x

    const configurePrinter = (name: string): Printer => Printer()


    const getEnv = () => Reader(Env)

    const getPrinter = () => getEnv().map( env => {

        return configurePrinter(env.p2)

    })

    const printMsg = (n: number ) => 
        getEnv().fmap( env => 
                getPrinter().map( printer => 
                        printer.sendMsg(env.p1 + n)) )

    const getStatus = () => 
            getPrinter().map( printer => 
                printer.getStatus() )

           
    
    
    const executeScript = () => getEnv().map( env => {

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