import { Dado } from './transport';
import { Word } from './common';
import { createContigousMemory } from './memory.contigous';
import * as R from 'ramda'

type TimePoint = number
type TimeDuration = number

interface MemoryCell {
    content: Word
    lastUpdate: TimePoint
}

const memoryCell = (content:Word, lastUpdate: TimePoint): MemoryCell =>
    ({content, lastUpdate})


const initialization: MemoryCell[] = R.repeat(memoryCell(0,0), 255)

export const CMPP_Memory = createContigousMemory(0, initialization)

