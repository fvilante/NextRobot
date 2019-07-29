// tslint:disable: no-if-statement

import { AnySetup, UserProgram } from './driver-core'
import { LinearCmppDevice } from './application-device-cmpp'
import { mapObjectIndexed } from '@nextrobot/core-utils'

type SendCmppResult = {
    readonly hasError: boolean
    readonly errorDetail: undefined
    readonly transacionDetail: undefined
}



const SendCmppProgram = <T extends AnySetup>(program: UserProgram<T>, device: LinearCmppDevice<T>): void => {


} 


