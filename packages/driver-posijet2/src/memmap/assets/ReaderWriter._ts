

import { Reader } from './reader'
import { Writer } from './writter'
import { flattenDeep } from '@nextrobot/core-utils'




export type ReaderWriter<R,A> = {

    readonly run: (_: R) => A
    
    readonly map: <B>(fn: (_:A) => B) => ReaderWriter<R,B> 

    readonly fmap: <B>(fn: (_:A) => ReaderWriter<R,B>) => ReaderWriter<R,B> 

}


export const ReaderWriter = <R,A>(fr: (_:R) => A,  msg: readonly string[] | string ): ReaderWriter<R,A> => {

    const a = flattenDeep([msg]) as readonly string[]

    return {

        run: r => fr(r),

        map: fn => ReaderWriter( (r:R) => fn(fr(r)), `unknown function runned!`),

        fmap: fn => ReaderWriter((r:R) => fn(fr(r)).run(r), [...a,...fn(val).msgs]),

    }

}


const Test = () => {

    type Env = {
        readonly par1: number
        readonly par2: string
    }

    const Env = (_:Env) => _

    const getEnv = () => ReaderWriter( Env, `oi`)

    const a = getEnv().map( env => Writer(env.par1, `selecionado parametro 'par' do ambiente`) )


}