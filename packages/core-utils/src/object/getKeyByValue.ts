

/** helpers -- todo: Move to core-utils package 
 * 
 * note: eventualy in an uncasted run-time scenario where value is not present in object, the function returns undefined
 * */  
export const getKeyByValue = <T>(object:T , value: T[keyof T]): keyof T  => {
    return Object.keys(object).find(key => object[key as keyof T] === value) as keyof T 
  }

