// tslint:disable: no-if-statement

import { AnyDriver, UserProgram } from '../driver/driver-core'
import { Device } from '../models/device'
import { mapObjectIndexed } from '@nextrobot/core-utils'

type SendCmppResult = {
    readonly hasError: boolean
    readonly errorDetail: undefined
    readonly transacionDetail: undefined
}



export const SendCmppProgram = <T extends AnyDriver>(program: UserProgram<T>, device: Device<T>): void => {

    console.table(program)
    console.log(device)

} 

export const ReadCmppProgram = <T extends AnyDriver>(program: UserProgram<T>, device: Device<T>): void => {

}


