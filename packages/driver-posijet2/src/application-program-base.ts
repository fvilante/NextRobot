import { CmppParamType } from './application-types'

export type CmppProgram = {
    [K in string]: CmppParamType
}