import { Message, AnyMessage } from './message'
import { exhaustiveSwitch } from '../type-utils/exhaustiveSwitch';
import { Observed } from '../Generators/core-types';


export type MessageMorphism<A extends AnyMessage, B extends AnyMessage> = (_: A) => B 



// todo: Update this example 



/**
 * Make a API type to create Messages using functions. T is an interface where 'properties names' represents 
 * function names and 'properties types' represents function parameters. Name of function is transfered to 
 * 'message kind property' and function parameter is transfered to message payload.
 */
//Note: I think this type is out-to-date, see: Message -> PatternMatchd
export type MessagesFactory<T> = {
    [Kind in Extract<keyof T, string>]: T[Kind] extends undefined
        ? (payload?: undefined) => Message<Kind, undefined>
        : (payload: T[Kind]) => Message<Kind,T[Kind]>
}



//msg morphism
const Test1 = () => {

    type MA1 = Message<'BeginMaster'>
    type MA2 = Message<'Juca', number>
    
    type MB1 = Message<'Symbol', number>
    
    type MA = MA1 | MA2
    
    type MB = MB1

    const f: MessageMorphism<MA,MB> = msg => {
        const kind = msg.kind
        switch(kind) {
            case 'BeginMaster': return Message('Symbol', 2)
            case 'Juca': return Message('Symbol', 3)
            default:
                return exhaustiveSwitch(kind)
        }
    }

    const a = f(Message('BeginMaster', undefined)) 

    console.log(a)

}

// datalink
const Test2 = () => {

    type MA1 = Message<'BeginMaster'>
    type MA2 = Message<'EndBlockWithCeckSum', number>
    type MA3 = Message<'Data', number>

    type CodecMessages = MA1 | MA2

    type Stream = Observed<CodecMessages>

    type Encoded =  Message<'Encoded', readonly number[]>

    type Encode = (_: Observed<CodecMessages>) => Observed<Encoded>
    type Decode =  (_: Observed<Encoded>) => Observed<CodecMessages>

    const Codec = {
        data: {

        }
    }


}

// tslint:disable: no-expression-statement
Test1()
Test2()
// tslint:enable: no-expression-statement



