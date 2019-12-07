import { ZIO, ZIO_ } from "./zio";
import { Either, Right, Left } from "../either";
import values from "ramda/es/values";
import { Result } from "../result";
import { delay } from "../../delay";



type ZManaged<R,E,A> = {

    readonly uses: <B>(f: (resource: A) => ZIO<R,E,B>) =>  ZIO<R,E,B>

}

// tslint:disable: no-expression-statement

/** Lazy type-safe resource management
 *  Reads an enviroment R and opens a resource A and call the function callback presented to uses combinator
 *  after run uses, execute the closer effect. If use call back throws, the resource is assured to be closed.
 */
const ZManaged = <R,E,A>(aquire: ZIO<R,E,A>, release: (_:A) => void): ZManaged<R,E,A> => {

    // helper
    const _fmap = <R1 extends R0,E1,B,R0,E0 extends E1,A0>(m: ZIO<R0,E0,A0>, f: (_:A0) => ZIO<R1,E1,B>): ZIO<R1,E1,B> => {
        const m0 = m.contramap( (_:R1) => _)
        const m1 = m0.mapError( (_:E0):E1 => _)
        const m2 = m1.fmap(f)
        return m2
    }

    const uses: ZManaged<R,E,A>['uses'] = f => {
        return aquire.fmap( a => {
            return f(a).map( b => { 
                release(a)
                return b
            })

        })
    }
       
    return {
        uses,
    }

}


// Informal Test

const Test = async () => {

    /** Plataform-Specific */

    type Resource = {
        readonly kind: string
        readonly write?: undefined
        readonly read?: undefined
        readonly close: () => void
    }

    type ResourceOpener = (port:string) => Resource
    const ResourceOpener: ResourceOpener = port =>  { 
        console.log(`Openning resorce: ${port}`)
        return { kind: port, close: () => { console.log(`Closing resource: ${port}`)} }
    }

    /** Global Enviroment: Impure to Pure frontier */

    type ResourcesEnviroment = {
        readonly resourceOpener: ResourceOpener
        readonly portIds: readonly string[]
    }

    const ResourcesEnviroment: ResourcesEnviroment = {
        resourceOpener: ResourceOpener,
        portIds: [`COM1`,`COM2`,`COM3`]
    }

    
    type GlobalEnviroment = ResourcesEnviroment & { readonly isGlobalEnviroment: true}
    const GlobalEnviroment: GlobalEnviroment = ({...ResourcesEnviroment, isGlobalEnviroment: true})

     /** ZIO Abstraction */

    const aquire = (port:string) => ZIO_.fromFunction( (enviroment: GlobalEnviroment) => enviroment.resourceOpener(port))
    const release = (r: Resource) => r.close() 

    const openPort = (portName:string) => ZManaged(aquire(portName), release)


    const ff = (portName: string) => 
        openPort(portName).uses( port => {
            console.log(`using resources! ${port.kind}`)
            return ZIO_.succeed(`port sucessful used: ${port.kind   }`)
        }).fmap( env => ZIO_.fromFuture(delay(2000) ) )
    
    const rr1 = ff('COM1')
    const rr2 = ff('COM2')

    const rrr = 
        rr1.fmap( s1 => 
        rr2.map(  s2 => 
            [s1, s2] as const    
        ))

    console.log(`performing unsafe effects...`)

    // tslint:disable: no-expression-statement
    const a = await rrr.unsafeRun(GlobalEnviroment) 
    console.log(`Finished. output: ${a}`)



}

// tslint:disable-next-line: no-expression-statement
Test()


