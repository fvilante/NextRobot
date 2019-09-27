// Map object indexed

export type MapObjectIndexCallBack<T, B> = 
    (value: T[keyof T], key: keyof T, obj: T) => B

//todo: this type was substituted to a a Record type in the mapObjectIndexed. May I delete this type now or there exists other dependency ?
/** DEPRECATED */
export type MappedObject<T,B> = {
    [K in keyof T]: B
}


export const mapObjectIndexed = <T, B>(o: T, callback: MapObjectIndexCallBack<T, B>): Record<keyof T,B> => {
    
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

const Test = () => {

    const o = {
        oi: 'hello',
        2: 'world',
        make: 99,
        juca: 12
    }

    const m = mapObjectIndexed(o, (value, key) => {
        return `key ${key} - value ${value}`
    })

    console.table(o)
    console.table(m)

}

// tslint:disable-next-line: no-expression-statement
//Test()