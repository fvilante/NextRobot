import { _Port, defaultPortConfig, PortOpened, PortReference } from '../data-models/port'
import { Future, Right, join, all, Left } from '@nextrobot/core-utils'
import { detectSerialPorts } from '../effects/detectSerialPorts'
import { serialPortOpenner_PC } from '..'


// service in pure-way all serial-port's effects


export type Service = {

    readonly detect: () => Future<_Port['PortsList']>
    readonly opener: (portName: _Port['Name'], baudRate: _Port['BaudRate'], config: _Port['Config']) => Future<_Port['Openned']> 

}


export const GetService = (): Future<Service> => {
    
    const detect: Service['detect'] = () => 
        Future( resolver => {
            const r = detectSerialPorts()
                .then( list => resolver( Right(list)) )
            return r
    })

    const opener: Service['opener'] = (portName, baudRate, config = defaultPortConfig) => 
        serialPortOpenner_PC({name: portName, baudRate, config})
      

    const r = {
        detect,
        opener,
    }

    return Future( resolver => resolver(Right(r)) )

}

// informal test


const Test1 = () => {

    const portNames = GetService()
        .fmap( service => service.detect() )
        .map( ports => ports.map( port => port.name ))
        
        
    // tslint:disable-next-line: no-expression-statement
    portNames.runP()
        .then( ma => ma.map( ports => console.log(ports) ))

}

const Test2 = () => {

    const openPort = (p: PortReference) => (s:Service):Future<PortOpened> => s.opener(p.name,p.baudRate,p.config)

    const a = GetService()
        .fmap( openPort({name: 'COM6', baudRate: 2400, config: defaultPortConfig} ) )
        .fmap( port => Future<undefined>( resolver => {

            console.log(`porta aberta:`)
            console.log(port.info)
            console.log(port.reference)
            // tslint:disable-next-line: no-expression-statement
            resolver(Right(undefined))

        }))

    // tslint:disable-next-line: no-expression-statement
    const b = a.runP()

}

// tslint:disable-next-line: no-expression-statement
// Test2()
