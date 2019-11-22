import { ZIO, ZIO_ } from "./zio";
import { Either, Right, Left } from "../either";
import values from "ramda/es/values";



type ZManaged<R,E,A> = {

    readonly uses: <R1,E1,B>(f: (resource: A) => ZIO<R1,E1,B>) =>  ZIO<R1,E1,B>

}

// tslint:disable: no-expression-statement

/** Lazy type-safe resource management
 *  Reads an enviroment R and opens a resource A and call the function callback presented to uses combinator
 *  after run uses, execute the closer effect. If use call back throws, the resource is assured to be closed.
 */
const ZManaged = <R,E,A>(aquire: ZIO<R,E,A>, release: ZIO<A,void,undefined>) => {

    // helper
    const _fmap = <R1 extends R0,E1,B,R0,E0 extends E1,A0>(m: ZIO<R0,E0,A0>, f: (_:A0) => ZIO<R1,E1,B>):ZIO<R1,E1,B> => {
        const m0 = m.contramap( (_:R1) => _)
        const m1 = m0.mapError( (_:E0):E1 => _)
        const m2 = m1.fmap(f)
        return m2
    }

    const uses = <B>(f: (resource: A) => ZIO<R,E,B>):ZIO<R,E,B> => {
         //identity + side-effect to close
        const useAndRelease = (resource: A) => ZIO( (env:R) => {
            return f(resource).unsafeRunEither(env).match<Either<E, B>>({
                Left:   err     => { release.unsafeRun(resource); return Left(err); },
                Right:  val     => { release.unsafeRun(resource); return Right(val); },
            })
        } )
        
        //return aquire.fmap( useAndRelease)
        return aquire.fmap(useAndRelease)
    }
       


    return {
        uses,
    }

}


// Informal Test

const Test = () => {

    console.log(`creating effects...`)

    type PortId = { readonly id: string } 
    const PortId = (id:string):PortId => ({id})

    type Resource = {
        readonly kind: PortId
        readonly write?: undefined
        readonly read?: undefined
    }

    type ResourceOpener = (port:string) => Resource

    const ResourceOpener: ResourceOpener = port => ({
        kind: PortId(port)
    })

    type ResourcesEnviroment = {
        readonly resourceOpener: ResourceOpener
        readonly portIds: readonly PortId[]
    }

    type GlobalEnviroment = ResourcesEnviroment & { readonly global: true}

    const ResourcesEnviroment: ResourcesEnviroment = {
        resourceOpener: ResourceOpener,
        portIds: [PortId(`COM1`), PortId(`COM2`), PortId(`COM3`)]
    }

    const GlobalEnviroment: GlobalEnviroment = ({...ResourcesEnviroment, global: true})

    const aquire = (pid:number) => ZIO_.fromFunction( (g: ResourcesEnviroment) => { console.log();console.log(`openning port ${g.portIds[0].id}`); return g.resourceOpener(g.portIds[0].id) } )
    const release = ZIO_.fromFunction( (r:Resource) => { console.log(`closing resource: #${r.kind.id}`); return undefined } )
    const use = (r:Resource) => ZIO_.fromFunction( (g: ResourcesEnviroment) => {console.log(`using resource: ${r.kind.id}`)})


    const resource0 = ZManaged(aquire(0), release)
    const resource1 = ZManaged(aquire(1), release)
    const resource2 = ZManaged(aquire(2), release)

    const m  = [
        resource0.uses( use ),
        resource0.uses( use ),
        resource1.uses( use ),
        resource1.uses( use ),
        resource2.uses( use ),
        resource2.uses( use ),

    ]


    console.log(`performing unsafe effects...`)

    // tslint:disable: no-expression-statement
    const a = m.map( x => x.unsafeRun(ResourcesEnviroment))




}

// tslint:disable-next-line: no-expression-statement
Test()