
export type Bit = 0 | 1

export const bitToBoolean = (bit: Bit): Boolean => (bit===0) ? false : true

export const bolleanToBit = (bool: boolean): Bit => (bool===true) ? 1 : 0

export const getBit = (number: number, bitPosition: number): Bit => {
  return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}

export const setBit = (number: number, bitPosition: number): number => {
  return number | (1 << bitPosition);
}

export const clearBit = (number: number, bitPosition: number): number => {
  const mask = ~(1 << bitPosition);
  return number & mask;
}

export const updateBit = (number: number, bitPosition: number, bitValue: number) => {
  const bitValueNormalized: Bit = bitValue ? 1 : 0;
  const clearMask = ~(1 << bitPosition);
  return (number & clearMask) | (bitValueNormalized << bitPosition);
}

