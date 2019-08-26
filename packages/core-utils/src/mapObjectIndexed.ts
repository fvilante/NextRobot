// Map object indexed

export type MapObjectIndexCallBack<T extends object, B> = 
    (value: T[keyof T], key: keyof T, obj: T) => B

export type MappedObject<T,B> = {
    [K in keyof T]: B
}


export const mapObjectIndexed = <T extends object, B>(o: T, callback: MapObjectIndexCallBack<T, B>): MappedObject<T,B> => {
    
    // tslint:disable-next-line: no-let
    let result = {} as  Record<keyof T, B>

    for (const key_ in o) {
        const key = key_ as keyof T
        const value = o[key]
        // tslint:disable-next-line: no-object-mutation no-expression-statement
        result[key] = callback(value, key, o)
    }

    return result
}