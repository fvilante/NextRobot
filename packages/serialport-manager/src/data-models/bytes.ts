// primitives

// todo: We know that this is not very efficient. Use JS TypedArray instead for Byte/Bytes type

export type Byte = { readonly byte: number }
export const Byte = (byte: number):Byte => ({ byte }) 

export type Bytes = { readonly bytes: readonly number[] }
export const Bytes = (bytes: readonly number[]):Bytes => ({ bytes }) 
