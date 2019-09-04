// tslint:disable: no-if-statement

import { AnyDriver, UserProgram } from '../driver/driver-core'
import { Device } from '../core-models/device'
import { mapObjectIndexed } from '@nextrobot/core-utils'



export const SendCmppProgram = <T extends AnyDriver>(program: UserProgram<T>, device: Device<T>): /*Promise<void>*/ void => {

    // cria os pacotes de transacao sincrona, coloca-os na fila de processamento de transacoes sincronas
    // o resultado é processado e devolvido ou caso erro a promessa falha

} 

export const ReadCmppProgram = <T extends AnyDriver>(program: UserProgram<T>, device: Device<T>): /*Promise<UserProgram<T>>*/ void => {

    // cria a transacao sincrona

}


