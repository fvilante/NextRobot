
//an alias to number conversion
export type HomophorficMap<T> = (_: T) => T

// use this function when you want to assure that a switch-statement is exhaustive at compile-time 
export function exhaustiveSwitch(p: never): never;
export function exhaustiveSwitch(p: any): void {
    throw new Error(`Failed to be exhaustive on variable ${p}`);
}

