export type TypeGuard = (_: unknown) => boolean

export class TypeScriptBuiltInTypes {

    static readonly isNumber = (value: unknown): value is number => 
        typeof value === 'number' ? true : false

    static readonly isString = (value: unknown): value is string => 
        typeof value === 'string' ? true : false

    static readonly isArray = (value: unknown): value is ReadonlyArray<unknown> =>
        Object.prototype.toString.call(value) === '[object Array]'

    static readonly isObject = (value: unknown): value is object =>
        Object.prototype.toString.call(value) === '[object Object]'

    // protected against null-false-positive
    static readonly isObjectOrArray = (value: unknown): value is (object | ReadonlyArray<unknown>) => 
        value === null ? false : typeof value === 'object' ? true : false

    static readonly isBoolean = (value: unknown): value is boolean => 
        typeof value === 'boolean' ? true : false

    //static readonly isSymbol = (value: unknown): value is Symbol => 
        //typeof value === 'symbol' ? true : false

    //static readonly isBigInt = (value: unknown): value is BigInteger => 
        //typeof value === 'bigint' ? true : false

    static readonly isUndefined = (value: unknown): value is undefined => 
        value === undefined ? true : false


    // ===============================
    //  Higher-Order typeguard
    // ===============================
    
    static readonly isAnyOf = (typeGuards: ReadonlyArray<TypeGuard>) => (value: unknown) =>
        [...typeGuards]
            .map( guardFn => guardFn(value))
            .some( result => result === true)

    static readonly isPureArrayOf = 
        //IMPORTANT: you SHOULD inform the type parameter T explicitly when you call this function
        <T>(array: unknown, typeGuard: TypeGuard): array is ReadonlyArray<T> => {
            const isArray = TypeScriptBuiltInTypes.isArray
            // tslint:disable-next-line: no-if-statement
            if (isArray(array) === false) return false
            for (const item of (array as Array<unknown>)) {
                // tslint:disable-next-line: no-if-statement
                if (!(typeGuard(item))) {
                return false;
                }
            } 
            return true;
    }


    static readonly isPureArrayOfNumber = (value: unknown): value is ReadonlyArray<number> => {
        const Type = TypeScriptBuiltInTypes
        return Type.isPureArrayOf<number>(value, Type.isNumber)
    }

    static readonly isPureArrayOfString = (value: unknown): value is ReadonlyArray<string> => {
        const Type = TypeScriptBuiltInTypes
        return Type.isPureArrayOf<string>(value, Type.isString)
    }

}