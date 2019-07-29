// tslint:disable: no-if-statement

import { AnyDrive, UserProgram } from './driver-core'
import { Device } from './device-core'
import { mapObjectIndexed } from '@nextrobot/core-utils'

type SendCmppResult = {
    readonly hasError: boolean
    readonly errorDetail: undefined
    readonly transacionDetail: undefined
}



const SendCmppProgram = <T extends AnyDrive>(program: UserProgram<T>, device: Device<T>): void => {


} 


