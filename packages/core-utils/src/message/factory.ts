
import { Message } from './message'

/**
 * Make a API type to create Messages using functions. T is an interface where 'properties names' represents 
 * function names and 'properties types' represents function parameters. Name of function is transfered to 
 * 'message kind property' and function parameter is transfered to message payload.
 */
export type MessagesFactory<T> = {
    [Kind in keyof T]: T[Kind] extends undefined
        ? (payload?: undefined) => Message<Kind, undefined>
        : (payload: T[Kind]) => Message<Kind,T[Kind]>
}
