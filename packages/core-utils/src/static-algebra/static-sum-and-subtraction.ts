

// THIS CODE WAS AUTOMATIC GENERATED
// HIS INTENTION IS TO BE AN STATIC INTEGER ALGEBRA
// AUTHOR: @fvilante

//
//  the important output of this generated code are
//  the functions named: 
//
//      1) _add(a,b) 
//      2) _sub(a,b)
//

/*

Bellow is the parametrization and min-to-max range you can 
use in algebraic operations:

RANGE: 
min: [-10,-10]
max: [10,10]


EXAMPLE OF USE:

const c = '-2'
const a = _add('-1', '2') // 1
const b = _sub(a,c) // 3


*/



export type Table = {
    readonly '-10': {
       readonly '-10': '-20'
       readonly '-9': '-19'
       readonly '-8': '-18'
       readonly '-7': '-17'
       readonly '-6': '-16'
       readonly '-5': '-15'
       readonly '-4': '-14'
       readonly '-3': '-13'
       readonly '-2': '-12'
       readonly '-1': '-11'
       readonly '0': '-10'
       readonly '1': '-9'
       readonly '2': '-8'
       readonly '3': '-7'
       readonly '4': '-6'
       readonly '5': '-5'
       readonly '6': '-4'
       readonly '7': '-3'
       readonly '8': '-2'
       readonly '9': '-1'
       readonly '10': '0'
   }

        
    readonly '-9': {
       readonly '-10': '-19'
       readonly '-9': '-18'
       readonly '-8': '-17'
       readonly '-7': '-16'
       readonly '-6': '-15'
       readonly '-5': '-14'
       readonly '-4': '-13'
       readonly '-3': '-12'
       readonly '-2': '-11'
       readonly '-1': '-10'
       readonly '0': '-9'
       readonly '1': '-8'
       readonly '2': '-7'
       readonly '3': '-6'
       readonly '4': '-5'
       readonly '5': '-4'
       readonly '6': '-3'
       readonly '7': '-2'
       readonly '8': '-1'
       readonly '9': '0'
       readonly '10': '1'
   }

        
    readonly '-8': {
       readonly '-10': '-18'
       readonly '-9': '-17'
       readonly '-8': '-16'
       readonly '-7': '-15'
       readonly '-6': '-14'
       readonly '-5': '-13'
       readonly '-4': '-12'
       readonly '-3': '-11'
       readonly '-2': '-10'
       readonly '-1': '-9'
       readonly '0': '-8'
       readonly '1': '-7'
       readonly '2': '-6'
       readonly '3': '-5'
       readonly '4': '-4'
       readonly '5': '-3'
       readonly '6': '-2'
       readonly '7': '-1'
       readonly '8': '0'
       readonly '9': '1'
       readonly '10': '2'
   }

        
    readonly '-7': {
       readonly '-10': '-17'
       readonly '-9': '-16'
       readonly '-8': '-15'
       readonly '-7': '-14'
       readonly '-6': '-13'
       readonly '-5': '-12'
       readonly '-4': '-11'
       readonly '-3': '-10'
       readonly '-2': '-9'
       readonly '-1': '-8'
       readonly '0': '-7'
       readonly '1': '-6'
       readonly '2': '-5'
       readonly '3': '-4'
       readonly '4': '-3'
       readonly '5': '-2'
       readonly '6': '-1'
       readonly '7': '0'
       readonly '8': '1'
       readonly '9': '2'
       readonly '10': '3'
   }

        
    readonly '-6': {
       readonly '-10': '-16'
       readonly '-9': '-15'
       readonly '-8': '-14'
       readonly '-7': '-13'
       readonly '-6': '-12'
       readonly '-5': '-11'
       readonly '-4': '-10'
       readonly '-3': '-9'
       readonly '-2': '-8'
       readonly '-1': '-7'
       readonly '0': '-6'
       readonly '1': '-5'
       readonly '2': '-4'
       readonly '3': '-3'
       readonly '4': '-2'
       readonly '5': '-1'
       readonly '6': '0'
       readonly '7': '1'
       readonly '8': '2'
       readonly '9': '3'
       readonly '10': '4'
   }

        
    readonly '-5': {
       readonly '-10': '-15'
       readonly '-9': '-14'
       readonly '-8': '-13'
       readonly '-7': '-12'
       readonly '-6': '-11'
       readonly '-5': '-10'
       readonly '-4': '-9'
       readonly '-3': '-8'
       readonly '-2': '-7'
       readonly '-1': '-6'
       readonly '0': '-5'
       readonly '1': '-4'
       readonly '2': '-3'
       readonly '3': '-2'
       readonly '4': '-1'
       readonly '5': '0'
       readonly '6': '1'
       readonly '7': '2'
       readonly '8': '3'
       readonly '9': '4'
       readonly '10': '5'
   }

        
    readonly '-4': {
       readonly '-10': '-14'
       readonly '-9': '-13'
       readonly '-8': '-12'
       readonly '-7': '-11'
       readonly '-6': '-10'
       readonly '-5': '-9'
       readonly '-4': '-8'
       readonly '-3': '-7'
       readonly '-2': '-6'
       readonly '-1': '-5'
       readonly '0': '-4'
       readonly '1': '-3'
       readonly '2': '-2'
       readonly '3': '-1'
       readonly '4': '0'
       readonly '5': '1'
       readonly '6': '2'
       readonly '7': '3'
       readonly '8': '4'
       readonly '9': '5'
       readonly '10': '6'
   }

        
    readonly '-3': {
       readonly '-10': '-13'
       readonly '-9': '-12'
       readonly '-8': '-11'
       readonly '-7': '-10'
       readonly '-6': '-9'
       readonly '-5': '-8'
       readonly '-4': '-7'
       readonly '-3': '-6'
       readonly '-2': '-5'
       readonly '-1': '-4'
       readonly '0': '-3'
       readonly '1': '-2'
       readonly '2': '-1'
       readonly '3': '0'
       readonly '4': '1'
       readonly '5': '2'
       readonly '6': '3'
       readonly '7': '4'
       readonly '8': '5'
       readonly '9': '6'
       readonly '10': '7'
   }

        
    readonly '-2': {
       readonly '-10': '-12'
       readonly '-9': '-11'
       readonly '-8': '-10'
       readonly '-7': '-9'
       readonly '-6': '-8'
       readonly '-5': '-7'
       readonly '-4': '-6'
       readonly '-3': '-5'
       readonly '-2': '-4'
       readonly '-1': '-3'
       readonly '0': '-2'
       readonly '1': '-1'
       readonly '2': '0'
       readonly '3': '1'
       readonly '4': '2'
       readonly '5': '3'
       readonly '6': '4'
       readonly '7': '5'
       readonly '8': '6'
       readonly '9': '7'
       readonly '10': '8'
   }

        
    readonly '-1': {
       readonly '-10': '-11'
       readonly '-9': '-10'
       readonly '-8': '-9'
       readonly '-7': '-8'
       readonly '-6': '-7'
       readonly '-5': '-6'
       readonly '-4': '-5'
       readonly '-3': '-4'
       readonly '-2': '-3'
       readonly '-1': '-2'
       readonly '0': '-1'
       readonly '1': '0'
       readonly '2': '1'
       readonly '3': '2'
       readonly '4': '3'
       readonly '5': '4'
       readonly '6': '5'
       readonly '7': '6'
       readonly '8': '7'
       readonly '9': '8'
       readonly '10': '9'
   }

        
    readonly '0': {
       readonly '-10': '-10'
       readonly '-9': '-9'
       readonly '-8': '-8'
       readonly '-7': '-7'
       readonly '-6': '-6'
       readonly '-5': '-5'
       readonly '-4': '-4'
       readonly '-3': '-3'
       readonly '-2': '-2'
       readonly '-1': '-1'
       readonly '0': '0'
       readonly '1': '1'
       readonly '2': '2'
       readonly '3': '3'
       readonly '4': '4'
       readonly '5': '5'
       readonly '6': '6'
       readonly '7': '7'
       readonly '8': '8'
       readonly '9': '9'
       readonly '10': '10'
   }

        
    readonly '1': {
       readonly '-10': '-9'
       readonly '-9': '-8'
       readonly '-8': '-7'
       readonly '-7': '-6'
       readonly '-6': '-5'
       readonly '-5': '-4'
       readonly '-4': '-3'
       readonly '-3': '-2'
       readonly '-2': '-1'
       readonly '-1': '0'
       readonly '0': '1'
       readonly '1': '2'
       readonly '2': '3'
       readonly '3': '4'
       readonly '4': '5'
       readonly '5': '6'
       readonly '6': '7'
       readonly '7': '8'
       readonly '8': '9'
       readonly '9': '10'
       readonly '10': '11'
   }

        
    readonly '2': {
       readonly '-10': '-8'
       readonly '-9': '-7'
       readonly '-8': '-6'
       readonly '-7': '-5'
       readonly '-6': '-4'
       readonly '-5': '-3'
       readonly '-4': '-2'
       readonly '-3': '-1'
       readonly '-2': '0'
       readonly '-1': '1'
       readonly '0': '2'
       readonly '1': '3'
       readonly '2': '4'
       readonly '3': '5'
       readonly '4': '6'
       readonly '5': '7'
       readonly '6': '8'
       readonly '7': '9'
       readonly '8': '10'
       readonly '9': '11'
       readonly '10': '12'
   }

        
    readonly '3': {
       readonly '-10': '-7'
       readonly '-9': '-6'
       readonly '-8': '-5'
       readonly '-7': '-4'
       readonly '-6': '-3'
       readonly '-5': '-2'
       readonly '-4': '-1'
       readonly '-3': '0'
       readonly '-2': '1'
       readonly '-1': '2'
       readonly '0': '3'
       readonly '1': '4'
       readonly '2': '5'
       readonly '3': '6'
       readonly '4': '7'
       readonly '5': '8'
       readonly '6': '9'
       readonly '7': '10'
       readonly '8': '11'
       readonly '9': '12'
       readonly '10': '13'
   }

        
    readonly '4': {
       readonly '-10': '-6'
       readonly '-9': '-5'
       readonly '-8': '-4'
       readonly '-7': '-3'
       readonly '-6': '-2'
       readonly '-5': '-1'
       readonly '-4': '0'
       readonly '-3': '1'
       readonly '-2': '2'
       readonly '-1': '3'
       readonly '0': '4'
       readonly '1': '5'
       readonly '2': '6'
       readonly '3': '7'
       readonly '4': '8'
       readonly '5': '9'
       readonly '6': '10'
       readonly '7': '11'
       readonly '8': '12'
       readonly '9': '13'
       readonly '10': '14'
   }

        
    readonly '5': {
       readonly '-10': '-5'
       readonly '-9': '-4'
       readonly '-8': '-3'
       readonly '-7': '-2'
       readonly '-6': '-1'
       readonly '-5': '0'
       readonly '-4': '1'
       readonly '-3': '2'
       readonly '-2': '3'
       readonly '-1': '4'
       readonly '0': '5'
       readonly '1': '6'
       readonly '2': '7'
       readonly '3': '8'
       readonly '4': '9'
       readonly '5': '10'
       readonly '6': '11'
       readonly '7': '12'
       readonly '8': '13'
       readonly '9': '14'
       readonly '10': '15'
   }

        
    readonly '6': {
       readonly '-10': '-4'
       readonly '-9': '-3'
       readonly '-8': '-2'
       readonly '-7': '-1'
       readonly '-6': '0'
       readonly '-5': '1'
       readonly '-4': '2'
       readonly '-3': '3'
       readonly '-2': '4'
       readonly '-1': '5'
       readonly '0': '6'
       readonly '1': '7'
       readonly '2': '8'
       readonly '3': '9'
       readonly '4': '10'
       readonly '5': '11'
       readonly '6': '12'
       readonly '7': '13'
       readonly '8': '14'
       readonly '9': '15'
       readonly '10': '16'
   }

        
    readonly '7': {
       readonly '-10': '-3'
       readonly '-9': '-2'
       readonly '-8': '-1'
       readonly '-7': '0'
       readonly '-6': '1'
       readonly '-5': '2'
       readonly '-4': '3'
       readonly '-3': '4'
       readonly '-2': '5'
       readonly '-1': '6'
       readonly '0': '7'
       readonly '1': '8'
       readonly '2': '9'
       readonly '3': '10'
       readonly '4': '11'
       readonly '5': '12'
       readonly '6': '13'
       readonly '7': '14'
       readonly '8': '15'
       readonly '9': '16'
       readonly '10': '17'
   }

        
    readonly '8': {
       readonly '-10': '-2'
       readonly '-9': '-1'
       readonly '-8': '0'
       readonly '-7': '1'
       readonly '-6': '2'
       readonly '-5': '3'
       readonly '-4': '4'
       readonly '-3': '5'
       readonly '-2': '6'
       readonly '-1': '7'
       readonly '0': '8'
       readonly '1': '9'
       readonly '2': '10'
       readonly '3': '11'
       readonly '4': '12'
       readonly '5': '13'
       readonly '6': '14'
       readonly '7': '15'
       readonly '8': '16'
       readonly '9': '17'
       readonly '10': '18'
   }

        
    readonly '9': {
       readonly '-10': '-1'
       readonly '-9': '0'
       readonly '-8': '1'
       readonly '-7': '2'
       readonly '-6': '3'
       readonly '-5': '4'
       readonly '-4': '5'
       readonly '-3': '6'
       readonly '-2': '7'
       readonly '-1': '8'
       readonly '0': '9'
       readonly '1': '10'
       readonly '2': '11'
       readonly '3': '12'
       readonly '4': '13'
       readonly '5': '14'
       readonly '6': '15'
       readonly '7': '16'
       readonly '8': '17'
       readonly '9': '18'
       readonly '10': '19'
   }

        
    readonly '10': {
       readonly '-10': '0'
       readonly '-9': '1'
       readonly '-8': '2'
       readonly '-7': '3'
       readonly '-6': '4'
       readonly '-5': '5'
       readonly '-4': '6'
       readonly '-3': '7'
       readonly '-2': '8'
       readonly '-1': '9'
       readonly '0': '10'
       readonly '1': '11'
       readonly '2': '12'
       readonly '3': '13'
       readonly '4': '14'
       readonly '5': '15'
       readonly '6': '16'
       readonly '7': '17'
       readonly '8': '18'
       readonly '9': '19'
       readonly '10': '20'
   }

        
}
export const Table: Table = {
    '-10': {
       '-10': '-20',
       '-9': '-19',
       '-8': '-18',
       '-7': '-17',
       '-6': '-16',
       '-5': '-15',
       '-4': '-14',
       '-3': '-13',
       '-2': '-12',
       '-1': '-11',
       '0': '-10',
       '1': '-9',
       '2': '-8',
       '3': '-7',
       '4': '-6',
       '5': '-5',
       '6': '-4',
       '7': '-3',
       '8': '-2',
       '9': '-1',
       '10': '0',
   },

        
    '-9': {
       '-10': '-19',
       '-9': '-18',
       '-8': '-17',
       '-7': '-16',
       '-6': '-15',
       '-5': '-14',
       '-4': '-13',
       '-3': '-12',
       '-2': '-11',
       '-1': '-10',
       '0': '-9',
       '1': '-8',
       '2': '-7',
       '3': '-6',
       '4': '-5',
       '5': '-4',
       '6': '-3',
       '7': '-2',
       '8': '-1',
       '9': '0',
       '10': '1',
   },

        
    '-8': {
       '-10': '-18',
       '-9': '-17',
       '-8': '-16',
       '-7': '-15',
       '-6': '-14',
       '-5': '-13',
       '-4': '-12',
       '-3': '-11',
       '-2': '-10',
       '-1': '-9',
       '0': '-8',
       '1': '-7',
       '2': '-6',
       '3': '-5',
       '4': '-4',
       '5': '-3',
       '6': '-2',
       '7': '-1',
       '8': '0',
       '9': '1',
       '10': '2',
   },

        
    '-7': {
       '-10': '-17',
       '-9': '-16',
       '-8': '-15',
       '-7': '-14',
       '-6': '-13',
       '-5': '-12',
       '-4': '-11',
       '-3': '-10',
       '-2': '-9',
       '-1': '-8',
       '0': '-7',
       '1': '-6',
       '2': '-5',
       '3': '-4',
       '4': '-3',
       '5': '-2',
       '6': '-1',
       '7': '0',
       '8': '1',
       '9': '2',
       '10': '3',
   },

        
    '-6': {
       '-10': '-16',
       '-9': '-15',
       '-8': '-14',
       '-7': '-13',
       '-6': '-12',
       '-5': '-11',
       '-4': '-10',
       '-3': '-9',
       '-2': '-8',
       '-1': '-7',
       '0': '-6',
       '1': '-5',
       '2': '-4',
       '3': '-3',
       '4': '-2',
       '5': '-1',
       '6': '0',
       '7': '1',
       '8': '2',
       '9': '3',
       '10': '4',
   },

        
    '-5': {
       '-10': '-15',
       '-9': '-14',
       '-8': '-13',
       '-7': '-12',
       '-6': '-11',
       '-5': '-10',
       '-4': '-9',
       '-3': '-8',
       '-2': '-7',
       '-1': '-6',
       '0': '-5',
       '1': '-4',
       '2': '-3',
       '3': '-2',
       '4': '-1',
       '5': '0',
       '6': '1',
       '7': '2',
       '8': '3',
       '9': '4',
       '10': '5',
   },

        
    '-4': {
       '-10': '-14',
       '-9': '-13',
       '-8': '-12',
       '-7': '-11',
       '-6': '-10',
       '-5': '-9',
       '-4': '-8',
       '-3': '-7',
       '-2': '-6',
       '-1': '-5',
       '0': '-4',
       '1': '-3',
       '2': '-2',
       '3': '-1',
       '4': '0',
       '5': '1',
       '6': '2',
       '7': '3',
       '8': '4',
       '9': '5',
       '10': '6',
   },

        
    '-3': {
       '-10': '-13',
       '-9': '-12',
       '-8': '-11',
       '-7': '-10',
       '-6': '-9',
       '-5': '-8',
       '-4': '-7',
       '-3': '-6',
       '-2': '-5',
       '-1': '-4',
       '0': '-3',
       '1': '-2',
       '2': '-1',
       '3': '0',
       '4': '1',
       '5': '2',
       '6': '3',
       '7': '4',
       '8': '5',
       '9': '6',
       '10': '7',
   },

        
    '-2': {
       '-10': '-12',
       '-9': '-11',
       '-8': '-10',
       '-7': '-9',
       '-6': '-8',
       '-5': '-7',
       '-4': '-6',
       '-3': '-5',
       '-2': '-4',
       '-1': '-3',
       '0': '-2',
       '1': '-1',
       '2': '0',
       '3': '1',
       '4': '2',
       '5': '3',
       '6': '4',
       '7': '5',
       '8': '6',
       '9': '7',
       '10': '8',
   },

        
    '-1': {
       '-10': '-11',
       '-9': '-10',
       '-8': '-9',
       '-7': '-8',
       '-6': '-7',
       '-5': '-6',
       '-4': '-5',
       '-3': '-4',
       '-2': '-3',
       '-1': '-2',
       '0': '-1',
       '1': '0',
       '2': '1',
       '3': '2',
       '4': '3',
       '5': '4',
       '6': '5',
       '7': '6',
       '8': '7',
       '9': '8',
       '10': '9',
   },

        
    '0': {
       '-10': '-10',
       '-9': '-9',
       '-8': '-8',
       '-7': '-7',
       '-6': '-6',
       '-5': '-5',
       '-4': '-4',
       '-3': '-3',
       '-2': '-2',
       '-1': '-1',
       '0': '0',
       '1': '1',
       '2': '2',
       '3': '3',
       '4': '4',
       '5': '5',
       '6': '6',
       '7': '7',
       '8': '8',
       '9': '9',
       '10': '10',
   },

        
    '1': {
       '-10': '-9',
       '-9': '-8',
       '-8': '-7',
       '-7': '-6',
       '-6': '-5',
       '-5': '-4',
       '-4': '-3',
       '-3': '-2',
       '-2': '-1',
       '-1': '0',
       '0': '1',
       '1': '2',
       '2': '3',
       '3': '4',
       '4': '5',
       '5': '6',
       '6': '7',
       '7': '8',
       '8': '9',
       '9': '10',
       '10': '11',
   },

        
    '2': {
       '-10': '-8',
       '-9': '-7',
       '-8': '-6',
       '-7': '-5',
       '-6': '-4',
       '-5': '-3',
       '-4': '-2',
       '-3': '-1',
       '-2': '0',
       '-1': '1',
       '0': '2',
       '1': '3',
       '2': '4',
       '3': '5',
       '4': '6',
       '5': '7',
       '6': '8',
       '7': '9',
       '8': '10',
       '9': '11',
       '10': '12',
   },

        
    '3': {
       '-10': '-7',
       '-9': '-6',
       '-8': '-5',
       '-7': '-4',
       '-6': '-3',
       '-5': '-2',
       '-4': '-1',
       '-3': '0',
       '-2': '1',
       '-1': '2',
       '0': '3',
       '1': '4',
       '2': '5',
       '3': '6',
       '4': '7',
       '5': '8',
       '6': '9',
       '7': '10',
       '8': '11',
       '9': '12',
       '10': '13',
   },

        
    '4': {
       '-10': '-6',
       '-9': '-5',
       '-8': '-4',
       '-7': '-3',
       '-6': '-2',
       '-5': '-1',
       '-4': '0',
       '-3': '1',
       '-2': '2',
       '-1': '3',
       '0': '4',
       '1': '5',
       '2': '6',
       '3': '7',
       '4': '8',
       '5': '9',
       '6': '10',
       '7': '11',
       '8': '12',
       '9': '13',
       '10': '14',
   },

        
    '5': {
       '-10': '-5',
       '-9': '-4',
       '-8': '-3',
       '-7': '-2',
       '-6': '-1',
       '-5': '0',
       '-4': '1',
       '-3': '2',
       '-2': '3',
       '-1': '4',
       '0': '5',
       '1': '6',
       '2': '7',
       '3': '8',
       '4': '9',
       '5': '10',
       '6': '11',
       '7': '12',
       '8': '13',
       '9': '14',
       '10': '15',
   },

        
    '6': {
       '-10': '-4',
       '-9': '-3',
       '-8': '-2',
       '-7': '-1',
       '-6': '0',
       '-5': '1',
       '-4': '2',
       '-3': '3',
       '-2': '4',
       '-1': '5',
       '0': '6',
       '1': '7',
       '2': '8',
       '3': '9',
       '4': '10',
       '5': '11',
       '6': '12',
       '7': '13',
       '8': '14',
       '9': '15',
       '10': '16',
   },

        
    '7': {
       '-10': '-3',
       '-9': '-2',
       '-8': '-1',
       '-7': '0',
       '-6': '1',
       '-5': '2',
       '-4': '3',
       '-3': '4',
       '-2': '5',
       '-1': '6',
       '0': '7',
       '1': '8',
       '2': '9',
       '3': '10',
       '4': '11',
       '5': '12',
       '6': '13',
       '7': '14',
       '8': '15',
       '9': '16',
       '10': '17',
   },

        
    '8': {
       '-10': '-2',
       '-9': '-1',
       '-8': '0',
       '-7': '1',
       '-6': '2',
       '-5': '3',
       '-4': '4',
       '-3': '5',
       '-2': '6',
       '-1': '7',
       '0': '8',
       '1': '9',
       '2': '10',
       '3': '11',
       '4': '12',
       '5': '13',
       '6': '14',
       '7': '15',
       '8': '16',
       '9': '17',
       '10': '18',
   },

        
    '9': {
       '-10': '-1',
       '-9': '0',
       '-8': '1',
       '-7': '2',
       '-6': '3',
       '-5': '4',
       '-4': '5',
       '-3': '6',
       '-2': '7',
       '-1': '8',
       '0': '9',
       '1': '10',
       '2': '11',
       '3': '12',
       '4': '13',
       '5': '14',
       '6': '15',
       '7': '16',
       '8': '17',
       '9': '18',
       '10': '19',
   },

        
    '10': {
       '-10': '0',
       '-9': '1',
       '-8': '2',
       '-7': '3',
       '-6': '4',
       '-5': '5',
       '-4': '6',
       '-3': '7',
       '-2': '8',
       '-1': '9',
       '0': '10',
       '1': '11',
       '2': '12',
       '3': '13',
       '4': '14',
       '5': '15',
       '6': '16',
       '7': '17',
       '8': '18',
       '9': '19',
       '10': '20',
   },

        
}


/** first parameter aplication */
export type _A = keyof Table

/** second parameter aplication */
export type _B<A extends _A> = keyof Table[A]

/** Get Result of all aplications */
export type _R<A extends _A, B extends _B<A>> = Table[A][B]


export const _add = <A extends _A, B extends _B<A>>(a: A, b: B): _R<A,B> => Table[a][b]



export type TableSub = {
    readonly '-10': {
       readonly '-10': '0'
       readonly '-9': '-1'
       readonly '-8': '-2'
       readonly '-7': '-3'
       readonly '-6': '-4'
       readonly '-5': '-5'
       readonly '-4': '-6'
       readonly '-3': '-7'
       readonly '-2': '-8'
       readonly '-1': '-9'
       readonly '0': '-10'
       readonly '1': '-11'
       readonly '2': '-12'
       readonly '3': '-13'
       readonly '4': '-14'
       readonly '5': '-15'
       readonly '6': '-16'
       readonly '7': '-17'
       readonly '8': '-18'
       readonly '9': '-19'
       readonly '10': '-20'
   }

        
    readonly '-9': {
       readonly '-10': '1'
       readonly '-9': '0'
       readonly '-8': '-1'
       readonly '-7': '-2'
       readonly '-6': '-3'
       readonly '-5': '-4'
       readonly '-4': '-5'
       readonly '-3': '-6'
       readonly '-2': '-7'
       readonly '-1': '-8'
       readonly '0': '-9'
       readonly '1': '-10'
       readonly '2': '-11'
       readonly '3': '-12'
       readonly '4': '-13'
       readonly '5': '-14'
       readonly '6': '-15'
       readonly '7': '-16'
       readonly '8': '-17'
       readonly '9': '-18'
       readonly '10': '-19'
   }

        
    readonly '-8': {
       readonly '-10': '2'
       readonly '-9': '1'
       readonly '-8': '0'
       readonly '-7': '-1'
       readonly '-6': '-2'
       readonly '-5': '-3'
       readonly '-4': '-4'
       readonly '-3': '-5'
       readonly '-2': '-6'
       readonly '-1': '-7'
       readonly '0': '-8'
       readonly '1': '-9'
       readonly '2': '-10'
       readonly '3': '-11'
       readonly '4': '-12'
       readonly '5': '-13'
       readonly '6': '-14'
       readonly '7': '-15'
       readonly '8': '-16'
       readonly '9': '-17'
       readonly '10': '-18'
   }

        
    readonly '-7': {
       readonly '-10': '3'
       readonly '-9': '2'
       readonly '-8': '1'
       readonly '-7': '0'
       readonly '-6': '-1'
       readonly '-5': '-2'
       readonly '-4': '-3'
       readonly '-3': '-4'
       readonly '-2': '-5'
       readonly '-1': '-6'
       readonly '0': '-7'
       readonly '1': '-8'
       readonly '2': '-9'
       readonly '3': '-10'
       readonly '4': '-11'
       readonly '5': '-12'
       readonly '6': '-13'
       readonly '7': '-14'
       readonly '8': '-15'
       readonly '9': '-16'
       readonly '10': '-17'
   }

        
    readonly '-6': {
       readonly '-10': '4'
       readonly '-9': '3'
       readonly '-8': '2'
       readonly '-7': '1'
       readonly '-6': '0'
       readonly '-5': '-1'
       readonly '-4': '-2'
       readonly '-3': '-3'
       readonly '-2': '-4'
       readonly '-1': '-5'
       readonly '0': '-6'
       readonly '1': '-7'
       readonly '2': '-8'
       readonly '3': '-9'
       readonly '4': '-10'
       readonly '5': '-11'
       readonly '6': '-12'
       readonly '7': '-13'
       readonly '8': '-14'
       readonly '9': '-15'
       readonly '10': '-16'
   }

        
    readonly '-5': {
       readonly '-10': '5'
       readonly '-9': '4'
       readonly '-8': '3'
       readonly '-7': '2'
       readonly '-6': '1'
       readonly '-5': '0'
       readonly '-4': '-1'
       readonly '-3': '-2'
       readonly '-2': '-3'
       readonly '-1': '-4'
       readonly '0': '-5'
       readonly '1': '-6'
       readonly '2': '-7'
       readonly '3': '-8'
       readonly '4': '-9'
       readonly '5': '-10'
       readonly '6': '-11'
       readonly '7': '-12'
       readonly '8': '-13'
       readonly '9': '-14'
       readonly '10': '-15'
   }

        
    readonly '-4': {
       readonly '-10': '6'
       readonly '-9': '5'
       readonly '-8': '4'
       readonly '-7': '3'
       readonly '-6': '2'
       readonly '-5': '1'
       readonly '-4': '0'
       readonly '-3': '-1'
       readonly '-2': '-2'
       readonly '-1': '-3'
       readonly '0': '-4'
       readonly '1': '-5'
       readonly '2': '-6'
       readonly '3': '-7'
       readonly '4': '-8'
       readonly '5': '-9'
       readonly '6': '-10'
       readonly '7': '-11'
       readonly '8': '-12'
       readonly '9': '-13'
       readonly '10': '-14'
   }

        
    readonly '-3': {
       readonly '-10': '7'
       readonly '-9': '6'
       readonly '-8': '5'
       readonly '-7': '4'
       readonly '-6': '3'
       readonly '-5': '2'
       readonly '-4': '1'
       readonly '-3': '0'
       readonly '-2': '-1'
       readonly '-1': '-2'
       readonly '0': '-3'
       readonly '1': '-4'
       readonly '2': '-5'
       readonly '3': '-6'
       readonly '4': '-7'
       readonly '5': '-8'
       readonly '6': '-9'
       readonly '7': '-10'
       readonly '8': '-11'
       readonly '9': '-12'
       readonly '10': '-13'
   }

        
    readonly '-2': {
       readonly '-10': '8'
       readonly '-9': '7'
       readonly '-8': '6'
       readonly '-7': '5'
       readonly '-6': '4'
       readonly '-5': '3'
       readonly '-4': '2'
       readonly '-3': '1'
       readonly '-2': '0'
       readonly '-1': '-1'
       readonly '0': '-2'
       readonly '1': '-3'
       readonly '2': '-4'
       readonly '3': '-5'
       readonly '4': '-6'
       readonly '5': '-7'
       readonly '6': '-8'
       readonly '7': '-9'
       readonly '8': '-10'
       readonly '9': '-11'
       readonly '10': '-12'
   }

        
    readonly '-1': {
       readonly '-10': '9'
       readonly '-9': '8'
       readonly '-8': '7'
       readonly '-7': '6'
       readonly '-6': '5'
       readonly '-5': '4'
       readonly '-4': '3'
       readonly '-3': '2'
       readonly '-2': '1'
       readonly '-1': '0'
       readonly '0': '-1'
       readonly '1': '-2'
       readonly '2': '-3'
       readonly '3': '-4'
       readonly '4': '-5'
       readonly '5': '-6'
       readonly '6': '-7'
       readonly '7': '-8'
       readonly '8': '-9'
       readonly '9': '-10'
       readonly '10': '-11'
   }

        
    readonly '0': {
       readonly '-10': '10'
       readonly '-9': '9'
       readonly '-8': '8'
       readonly '-7': '7'
       readonly '-6': '6'
       readonly '-5': '5'
       readonly '-4': '4'
       readonly '-3': '3'
       readonly '-2': '2'
       readonly '-1': '1'
       readonly '0': '0'
       readonly '1': '-1'
       readonly '2': '-2'
       readonly '3': '-3'
       readonly '4': '-4'
       readonly '5': '-5'
       readonly '6': '-6'
       readonly '7': '-7'
       readonly '8': '-8'
       readonly '9': '-9'
       readonly '10': '-10'
   }

        
    readonly '1': {
       readonly '-10': '11'
       readonly '-9': '10'
       readonly '-8': '9'
       readonly '-7': '8'
       readonly '-6': '7'
       readonly '-5': '6'
       readonly '-4': '5'
       readonly '-3': '4'
       readonly '-2': '3'
       readonly '-1': '2'
       readonly '0': '1'
       readonly '1': '0'
       readonly '2': '-1'
       readonly '3': '-2'
       readonly '4': '-3'
       readonly '5': '-4'
       readonly '6': '-5'
       readonly '7': '-6'
       readonly '8': '-7'
       readonly '9': '-8'
       readonly '10': '-9'
   }

        
    readonly '2': {
       readonly '-10': '12'
       readonly '-9': '11'
       readonly '-8': '10'
       readonly '-7': '9'
       readonly '-6': '8'
       readonly '-5': '7'
       readonly '-4': '6'
       readonly '-3': '5'
       readonly '-2': '4'
       readonly '-1': '3'
       readonly '0': '2'
       readonly '1': '1'
       readonly '2': '0'
       readonly '3': '-1'
       readonly '4': '-2'
       readonly '5': '-3'
       readonly '6': '-4'
       readonly '7': '-5'
       readonly '8': '-6'
       readonly '9': '-7'
       readonly '10': '-8'
   }

        
    readonly '3': {
       readonly '-10': '13'
       readonly '-9': '12'
       readonly '-8': '11'
       readonly '-7': '10'
       readonly '-6': '9'
       readonly '-5': '8'
       readonly '-4': '7'
       readonly '-3': '6'
       readonly '-2': '5'
       readonly '-1': '4'
       readonly '0': '3'
       readonly '1': '2'
       readonly '2': '1'
       readonly '3': '0'
       readonly '4': '-1'
       readonly '5': '-2'
       readonly '6': '-3'
       readonly '7': '-4'
       readonly '8': '-5'
       readonly '9': '-6'
       readonly '10': '-7'
   }

        
    readonly '4': {
       readonly '-10': '14'
       readonly '-9': '13'
       readonly '-8': '12'
       readonly '-7': '11'
       readonly '-6': '10'
       readonly '-5': '9'
       readonly '-4': '8'
       readonly '-3': '7'
       readonly '-2': '6'
       readonly '-1': '5'
       readonly '0': '4'
       readonly '1': '3'
       readonly '2': '2'
       readonly '3': '1'
       readonly '4': '0'
       readonly '5': '-1'
       readonly '6': '-2'
       readonly '7': '-3'
       readonly '8': '-4'
       readonly '9': '-5'
       readonly '10': '-6'
   }

        
    readonly '5': {
       readonly '-10': '15'
       readonly '-9': '14'
       readonly '-8': '13'
       readonly '-7': '12'
       readonly '-6': '11'
       readonly '-5': '10'
       readonly '-4': '9'
       readonly '-3': '8'
       readonly '-2': '7'
       readonly '-1': '6'
       readonly '0': '5'
       readonly '1': '4'
       readonly '2': '3'
       readonly '3': '2'
       readonly '4': '1'
       readonly '5': '0'
       readonly '6': '-1'
       readonly '7': '-2'
       readonly '8': '-3'
       readonly '9': '-4'
       readonly '10': '-5'
   }

        
    readonly '6': {
       readonly '-10': '16'
       readonly '-9': '15'
       readonly '-8': '14'
       readonly '-7': '13'
       readonly '-6': '12'
       readonly '-5': '11'
       readonly '-4': '10'
       readonly '-3': '9'
       readonly '-2': '8'
       readonly '-1': '7'
       readonly '0': '6'
       readonly '1': '5'
       readonly '2': '4'
       readonly '3': '3'
       readonly '4': '2'
       readonly '5': '1'
       readonly '6': '0'
       readonly '7': '-1'
       readonly '8': '-2'
       readonly '9': '-3'
       readonly '10': '-4'
   }

        
    readonly '7': {
       readonly '-10': '17'
       readonly '-9': '16'
       readonly '-8': '15'
       readonly '-7': '14'
       readonly '-6': '13'
       readonly '-5': '12'
       readonly '-4': '11'
       readonly '-3': '10'
       readonly '-2': '9'
       readonly '-1': '8'
       readonly '0': '7'
       readonly '1': '6'
       readonly '2': '5'
       readonly '3': '4'
       readonly '4': '3'
       readonly '5': '2'
       readonly '6': '1'
       readonly '7': '0'
       readonly '8': '-1'
       readonly '9': '-2'
       readonly '10': '-3'
   }

        
    readonly '8': {
       readonly '-10': '18'
       readonly '-9': '17'
       readonly '-8': '16'
       readonly '-7': '15'
       readonly '-6': '14'
       readonly '-5': '13'
       readonly '-4': '12'
       readonly '-3': '11'
       readonly '-2': '10'
       readonly '-1': '9'
       readonly '0': '8'
       readonly '1': '7'
       readonly '2': '6'
       readonly '3': '5'
       readonly '4': '4'
       readonly '5': '3'
       readonly '6': '2'
       readonly '7': '1'
       readonly '8': '0'
       readonly '9': '-1'
       readonly '10': '-2'
   }

        
    readonly '9': {
       readonly '-10': '19'
       readonly '-9': '18'
       readonly '-8': '17'
       readonly '-7': '16'
       readonly '-6': '15'
       readonly '-5': '14'
       readonly '-4': '13'
       readonly '-3': '12'
       readonly '-2': '11'
       readonly '-1': '10'
       readonly '0': '9'
       readonly '1': '8'
       readonly '2': '7'
       readonly '3': '6'
       readonly '4': '5'
       readonly '5': '4'
       readonly '6': '3'
       readonly '7': '2'
       readonly '8': '1'
       readonly '9': '0'
       readonly '10': '-1'
   }

        
    readonly '10': {
       readonly '-10': '20'
       readonly '-9': '19'
       readonly '-8': '18'
       readonly '-7': '17'
       readonly '-6': '16'
       readonly '-5': '15'
       readonly '-4': '14'
       readonly '-3': '13'
       readonly '-2': '12'
       readonly '-1': '11'
       readonly '0': '10'
       readonly '1': '9'
       readonly '2': '8'
       readonly '3': '7'
       readonly '4': '6'
       readonly '5': '5'
       readonly '6': '4'
       readonly '7': '3'
       readonly '8': '2'
       readonly '9': '1'
       readonly '10': '0'
   }

        
}
export const TableSub: TableSub = {
    '-10': {
       '-10': '0',
       '-9': '-1',
       '-8': '-2',
       '-7': '-3',
       '-6': '-4',
       '-5': '-5',
       '-4': '-6',
       '-3': '-7',
       '-2': '-8',
       '-1': '-9',
       '0': '-10',
       '1': '-11',
       '2': '-12',
       '3': '-13',
       '4': '-14',
       '5': '-15',
       '6': '-16',
       '7': '-17',
       '8': '-18',
       '9': '-19',
       '10': '-20',
   },

        
    '-9': {
       '-10': '1',
       '-9': '0',
       '-8': '-1',
       '-7': '-2',
       '-6': '-3',
       '-5': '-4',
       '-4': '-5',
       '-3': '-6',
       '-2': '-7',
       '-1': '-8',
       '0': '-9',
       '1': '-10',
       '2': '-11',
       '3': '-12',
       '4': '-13',
       '5': '-14',
       '6': '-15',
       '7': '-16',
       '8': '-17',
       '9': '-18',
       '10': '-19',
   },

        
    '-8': {
       '-10': '2',
       '-9': '1',
       '-8': '0',
       '-7': '-1',
       '-6': '-2',
       '-5': '-3',
       '-4': '-4',
       '-3': '-5',
       '-2': '-6',
       '-1': '-7',
       '0': '-8',
       '1': '-9',
       '2': '-10',
       '3': '-11',
       '4': '-12',
       '5': '-13',
       '6': '-14',
       '7': '-15',
       '8': '-16',
       '9': '-17',
       '10': '-18',
   },

        
    '-7': {
       '-10': '3',
       '-9': '2',
       '-8': '1',
       '-7': '0',
       '-6': '-1',
       '-5': '-2',
       '-4': '-3',
       '-3': '-4',
       '-2': '-5',
       '-1': '-6',
       '0': '-7',
       '1': '-8',
       '2': '-9',
       '3': '-10',
       '4': '-11',
       '5': '-12',
       '6': '-13',
       '7': '-14',
       '8': '-15',
       '9': '-16',
       '10': '-17',
   },

        
    '-6': {
       '-10': '4',
       '-9': '3',
       '-8': '2',
       '-7': '1',
       '-6': '0',
       '-5': '-1',
       '-4': '-2',
       '-3': '-3',
       '-2': '-4',
       '-1': '-5',
       '0': '-6',
       '1': '-7',
       '2': '-8',
       '3': '-9',
       '4': '-10',
       '5': '-11',
       '6': '-12',
       '7': '-13',
       '8': '-14',
       '9': '-15',
       '10': '-16',
   },

        
    '-5': {
       '-10': '5',
       '-9': '4',
       '-8': '3',
       '-7': '2',
       '-6': '1',
       '-5': '0',
       '-4': '-1',
       '-3': '-2',
       '-2': '-3',
       '-1': '-4',
       '0': '-5',
       '1': '-6',
       '2': '-7',
       '3': '-8',
       '4': '-9',
       '5': '-10',
       '6': '-11',
       '7': '-12',
       '8': '-13',
       '9': '-14',
       '10': '-15',
   },

        
    '-4': {
       '-10': '6',
       '-9': '5',
       '-8': '4',
       '-7': '3',
       '-6': '2',
       '-5': '1',
       '-4': '0',
       '-3': '-1',
       '-2': '-2',
       '-1': '-3',
       '0': '-4',
       '1': '-5',
       '2': '-6',
       '3': '-7',
       '4': '-8',
       '5': '-9',
       '6': '-10',
       '7': '-11',
       '8': '-12',
       '9': '-13',
       '10': '-14',
   },

        
    '-3': {
       '-10': '7',
       '-9': '6',
       '-8': '5',
       '-7': '4',
       '-6': '3',
       '-5': '2',
       '-4': '1',
       '-3': '0',
       '-2': '-1',
       '-1': '-2',
       '0': '-3',
       '1': '-4',
       '2': '-5',
       '3': '-6',
       '4': '-7',
       '5': '-8',
       '6': '-9',
       '7': '-10',
       '8': '-11',
       '9': '-12',
       '10': '-13',
   },

        
    '-2': {
       '-10': '8',
       '-9': '7',
       '-8': '6',
       '-7': '5',
       '-6': '4',
       '-5': '3',
       '-4': '2',
       '-3': '1',
       '-2': '0',
       '-1': '-1',
       '0': '-2',
       '1': '-3',
       '2': '-4',
       '3': '-5',
       '4': '-6',
       '5': '-7',
       '6': '-8',
       '7': '-9',
       '8': '-10',
       '9': '-11',
       '10': '-12',
   },

        
    '-1': {
       '-10': '9',
       '-9': '8',
       '-8': '7',
       '-7': '6',
       '-6': '5',
       '-5': '4',
       '-4': '3',
       '-3': '2',
       '-2': '1',
       '-1': '0',
       '0': '-1',
       '1': '-2',
       '2': '-3',
       '3': '-4',
       '4': '-5',
       '5': '-6',
       '6': '-7',
       '7': '-8',
       '8': '-9',
       '9': '-10',
       '10': '-11',
   },

        
    '0': {
       '-10': '10',
       '-9': '9',
       '-8': '8',
       '-7': '7',
       '-6': '6',
       '-5': '5',
       '-4': '4',
       '-3': '3',
       '-2': '2',
       '-1': '1',
       '0': '0',
       '1': '-1',
       '2': '-2',
       '3': '-3',
       '4': '-4',
       '5': '-5',
       '6': '-6',
       '7': '-7',
       '8': '-8',
       '9': '-9',
       '10': '-10',
   },

        
    '1': {
       '-10': '11',
       '-9': '10',
       '-8': '9',
       '-7': '8',
       '-6': '7',
       '-5': '6',
       '-4': '5',
       '-3': '4',
       '-2': '3',
       '-1': '2',
       '0': '1',
       '1': '0',
       '2': '-1',
       '3': '-2',
       '4': '-3',
       '5': '-4',
       '6': '-5',
       '7': '-6',
       '8': '-7',
       '9': '-8',
       '10': '-9',
   },

        
    '2': {
       '-10': '12',
       '-9': '11',
       '-8': '10',
       '-7': '9',
       '-6': '8',
       '-5': '7',
       '-4': '6',
       '-3': '5',
       '-2': '4',
       '-1': '3',
       '0': '2',
       '1': '1',
       '2': '0',
       '3': '-1',
       '4': '-2',
       '5': '-3',
       '6': '-4',
       '7': '-5',
       '8': '-6',
       '9': '-7',
       '10': '-8',
   },

        
    '3': {
       '-10': '13',
       '-9': '12',
       '-8': '11',
       '-7': '10',
       '-6': '9',
       '-5': '8',
       '-4': '7',
       '-3': '6',
       '-2': '5',
       '-1': '4',
       '0': '3',
       '1': '2',
       '2': '1',
       '3': '0',
       '4': '-1',
       '5': '-2',
       '6': '-3',
       '7': '-4',
       '8': '-5',
       '9': '-6',
       '10': '-7',
   },

        
    '4': {
       '-10': '14',
       '-9': '13',
       '-8': '12',
       '-7': '11',
       '-6': '10',
       '-5': '9',
       '-4': '8',
       '-3': '7',
       '-2': '6',
       '-1': '5',
       '0': '4',
       '1': '3',
       '2': '2',
       '3': '1',
       '4': '0',
       '5': '-1',
       '6': '-2',
       '7': '-3',
       '8': '-4',
       '9': '-5',
       '10': '-6',
   },

        
    '5': {
       '-10': '15',
       '-9': '14',
       '-8': '13',
       '-7': '12',
       '-6': '11',
       '-5': '10',
       '-4': '9',
       '-3': '8',
       '-2': '7',
       '-1': '6',
       '0': '5',
       '1': '4',
       '2': '3',
       '3': '2',
       '4': '1',
       '5': '0',
       '6': '-1',
       '7': '-2',
       '8': '-3',
       '9': '-4',
       '10': '-5',
   },

        
    '6': {
       '-10': '16',
       '-9': '15',
       '-8': '14',
       '-7': '13',
       '-6': '12',
       '-5': '11',
       '-4': '10',
       '-3': '9',
       '-2': '8',
       '-1': '7',
       '0': '6',
       '1': '5',
       '2': '4',
       '3': '3',
       '4': '2',
       '5': '1',
       '6': '0',
       '7': '-1',
       '8': '-2',
       '9': '-3',
       '10': '-4',
   },

        
    '7': {
       '-10': '17',
       '-9': '16',
       '-8': '15',
       '-7': '14',
       '-6': '13',
       '-5': '12',
       '-4': '11',
       '-3': '10',
       '-2': '9',
       '-1': '8',
       '0': '7',
       '1': '6',
       '2': '5',
       '3': '4',
       '4': '3',
       '5': '2',
       '6': '1',
       '7': '0',
       '8': '-1',
       '9': '-2',
       '10': '-3',
   },

        
    '8': {
       '-10': '18',
       '-9': '17',
       '-8': '16',
       '-7': '15',
       '-6': '14',
       '-5': '13',
       '-4': '12',
       '-3': '11',
       '-2': '10',
       '-1': '9',
       '0': '8',
       '1': '7',
       '2': '6',
       '3': '5',
       '4': '4',
       '5': '3',
       '6': '2',
       '7': '1',
       '8': '0',
       '9': '-1',
       '10': '-2',
   },

        
    '9': {
       '-10': '19',
       '-9': '18',
       '-8': '17',
       '-7': '16',
       '-6': '15',
       '-5': '14',
       '-4': '13',
       '-3': '12',
       '-2': '11',
       '-1': '10',
       '0': '9',
       '1': '8',
       '2': '7',
       '3': '6',
       '4': '5',
       '5': '4',
       '6': '3',
       '7': '2',
       '8': '1',
       '9': '0',
       '10': '-1',
   },

        
    '10': {
       '-10': '20',
       '-9': '19',
       '-8': '18',
       '-7': '17',
       '-6': '16',
       '-5': '15',
       '-4': '14',
       '-3': '13',
       '-2': '12',
       '-1': '11',
       '0': '10',
       '1': '9',
       '2': '8',
       '3': '7',
       '4': '6',
       '5': '5',
       '6': '4',
       '7': '3',
       '8': '2',
       '9': '1',
       '10': '0',
   },

        
}


/** first parameter aplication */
export type __A = keyof Table

/** second parameter aplication */
export type __B<A extends __A> = keyof TableSub[A]

/** Get Result of all aplications */
export type __R<A extends __A, B extends __B<A>> = TableSub[A][B]

export const _sub = <A extends __A, B extends __B<A>>(a: A, b: B): __R<A,B> => TableSub[a][b]



