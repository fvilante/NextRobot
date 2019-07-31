
export interface Scalar { 
    readonly scalar: number 
}

export const Scalar = (scalar: number) => ({ scalar })