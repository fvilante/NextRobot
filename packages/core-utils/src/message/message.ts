

export type Message<K, T = undefined> = {
    readonly kind: K
    readonly payload: T
}

export const Message = <K, T>(kind: K, payload: T): Message<K,T> => ({kind, payload})

export type AnyMessage = Message<any, any>
 




