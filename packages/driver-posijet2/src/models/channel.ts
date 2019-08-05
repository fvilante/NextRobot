


export interface Channel {
    readonly kind: 'Channel',
    readonly payload: number
}

type __ValidChannelNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 //todo: continue until 63

export const Channel = (_: __ValidChannelNumber): Channel => ({kind: 'Channel', payload: _ })

