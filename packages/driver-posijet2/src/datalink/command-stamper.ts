

//tslint:disable: no-mixed-interface

type ToTuple<T extends readonly any[]> = T[number]

/** run-time command call description */
type RCommand<Name,Param = undefined> = {readonly kind: Name, readonly parameters: Param}

/** introspect an object */
type GetR<T, Name extends keyof T> = RCommand<Name, T[Name]>


// - Low level Command Api --------------------------------


//category: RuntimeFunction(or alias: Command) -> DescriptionOfARunTimeFunction(or alias: RCommand)


/** set of constructible commands with respective parameters*/
export interface Command {
    readonly StartMaster: undefined
    readonly StartSlave: undefined
    readonly StartSlaveWithError: undefined
    readonly EndFrameWithCheckSum:  {readonly checksum: number}
    readonly FreeData: {readonly data: readonly number[]}
}



type MakeApi<T> = {
    [Name in keyof T]:  T[Name] extends undefined
        ? (parameters?: undefined) => RCommand<Name, undefined>
        : (parameters: T[Name]) => RCommand<Name,T[Name]>
}


const MakeRCommand = <Kind,Param>(kind: Kind, parameters: Param):RCommand<Kind,Param> => ({kind, parameters})

export const Command: MakeApi<Command> = {
    StartMaster: _ => MakeRCommand('StartMaster',_),
    StartSlave:  _ => MakeRCommand('StartSlave',_),
    StartSlaveWithError:  _ => MakeRCommand('StartSlaveWithError',_),
    EndFrameWithCheckSum:  _ => MakeRCommand('EndFrameWithCheckSum',_),
    FreeData: _ => MakeRCommand('FreeData',_),
}

export type AnyRCommand = ReturnType<typeof Command[keyof typeof Command]>



