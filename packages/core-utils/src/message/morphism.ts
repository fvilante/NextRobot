import { AnyMessage } from './message'




export type MessageMorphism<A extends AnyMessage, B extends AnyMessage> = (_: A) => B 

