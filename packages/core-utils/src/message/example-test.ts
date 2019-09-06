import { Message } from './message'


import { MessageMorphism } from './morphism'
import { exhaustiveSwitch } from '../type-utils/exhaustiveSwitch';
import { Observed } from '../Generators/core-types';



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



