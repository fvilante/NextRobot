import { SortedReadonlyArray } from "typescript";
import * as R from 'ramda'

// generic memory representation


export type Address = number


export interface ContigousMemory<T> {
    readonly type: "ContigousMemory"
    readonly firstAddress: Address //first inclusive
    block: ReadonlyArray<T>
}

export function createContigousMemory<T>(firstAddress_: Address, block: ReadonlyArray<T>): ContigousMemory<T> {
    const firstAddress = firstAddress_ < 0 ? 0 : firstAddress_
    return {
        type: "ContigousMemory",
        firstAddress,
        block,
    }
}


//last inclusive
function lastAddress<T>(m: ContigousMemory<T>): number { 
    const length  = m.block.length
    const delta = length == 0 ? 0 : length-1
    const lastaddress = m.firstAddress + delta
    return lastaddress
}


function isValidAddress<T>(memory: ContigousMemory<T>, address: Address) {
    const firstAddress = memory.firstAddress
    const lastAddress_ = lastAddress(memory)
    return  ( (address >= firstAddress) && (address <= lastAddress_) )
}

function absoluteAddress<T>(memory: ContigousMemory<T>, relativeAddress: Address): Address | undefined {
    if (isValidAddress(memory, relativeAddress)) {
        const absolute = relativeAddress- memory.firstAddress
        return absolute
    } else {
        return undefined
    }
}

// reads just one element
export function readContigousMemory<T>(memory: ContigousMemory<T>, address: Address): T | undefined {
    if (isValidAddress(memory, address)) {
        const lens = R.lensIndex( absoluteAddress(memory,address) )
        const content: T = R.view( lens, memory.block )
        return content
    } else {
        return undefined
    }
}

// note: eventually a monad pattern can improve the efficiency of this code if necessary
export function upsertIntoContigousMemory<T>(memory: ContigousMemory<T>, address: Address, data: T): ContigousMemory<T> {

    //avoid if possible
    if (!isValidAddress(memory, address))
        return memory

    //arrange (all are absolute address in relation to block)
    const block = memory.block
    const firstAddress: Address = 0
    const lastAddress_: Address = absoluteAddress(memory, lastAddress(memory))
    const position_: Address = absoluteAddress(memory, address)
    
    //work
    const begin: T[] = R.slice( firstAddress, position_, block )
    const insertion: T[] = [data]
    const end: T[] =  R.slice( position_+1, lastAddress_, block )

    const concat1 = R.flatten( R.concat(begin, insertion) ) 
    const newBlock = R.flatten( R.concat(concat1, end) ) 

    //finish
    return createContigousMemory(memory.firstAddress, newBlock)


}








