//export {}
import { checksum, dup_esc } from './datalink.out'
import { Frame, frame2Bytes, createPerfectFrame, Obj, ESC, STX, ETX, ACK, NACK } from './datalink.common'
import * as R from 'ramda'
import { flattenDeep } from 'lodash';
import { Byte, Bytes } from './common'


const INI_PACOTE_STX = [ESC, STX]
const INI_PACOTE_ACK = [ESC, ACK]
const INI_PACOTE_NACK = [ESC, NACK]
const FIM_PACOTE = [ESC, ETX]


// ========================================
// Funcoes de Apoio
// ========================================


// as funcoes desta seccao eu reaproveitei de um codigo legado
// que fiz para experimentar o NodRed.



// procura um pattern no pacote retorna (booL_found, index_position)
// array = array com inteiros representando o pacote
// pattern = um array com os inteiros representando o padrao a ser procurado em array
// position = index a partir do qual comecar a pesquisar
// retorno = o valor do index que contem o primeiro match ou -1 caso nao encontre nada 
function search(array_, pattern_, position=0) {
    //stringfica parametros e normaliza
    const _pattern = flattenDeep([pattern_]).map( val => String.fromCharCode(val) ).join('')
    let _pacote = flattenDeep([array_]).map( val => String.fromCharCode(val) ).join('')
    // calcula
    return  _pacote.indexOf(_pattern, position)
}

// retorna o index que aponta para o primeiro byte do objeto
function localizaInicioDoObjeto(pacote_) {
	const a = search(pacote_, INI_PACOTE_STX)
  	const b = search(pacote_, INI_PACOTE_ACK)
  	const c = search(pacote_, INI_PACOTE_NACK)
  	if (a >= 0) { 
      return a + flattenDeep(INI_PACOTE_STX).length
    } else if ( b >= 0 ) {
      return b + flattenDeep(INI_PACOTE_ACK).length
    } else if ( c >= 0 ) {
      return c + flattenDeep(INI_PACOTE_NACK).length
    } else {
      return -1
    }
}

// retorna index seguinte ao ultimo byte do objeto
function localizaFinalDoObjeto(pacote_) {
	return search(pacote_, FIM_PACOTE)
}

function desduplica_esc(objeto_) {
	const obj = flattenDeep(objeto_)
  	let new_obj = []
  	for (let k=0; k<obj.length; k++) {
    	let byte_ = obj[k]
      	if (byte_ == ESC) {
        	k = k + 1   //pula um ESC
        }
      	new_obj.push(byte_)
    }
  	return new_obj
}

//retorna o objeto encapsulado no pacote, ou null caso não seja localizado o objeto
function obtemObjeto_escDuplicado(pacote_) {	
    const ini = localizaInicioDoObjeto(pacote_)
    const fim = localizaFinalDoObjeto(pacote_)
    if ( ( ini>=0 && fim>=0 ) && ( fim > ini ) ) {
        return pacote_.slice(ini,fim)
  } else {
      return null
  }
}

function obtemObjeto(pacote_) {
	return desduplica_esc( obtemObjeto_escDuplicado(pacote_) )
}

//retorna o checksum, caso haja (caso contrario retorna indefinido indefinido)
function obtemCheckSum(pacote_) {
	const pacote__ = flattenDeep(pacote_)
  	const fim = localizaFinalDoObjeto(pacote__)
  	let checksum = flattenDeep(pacote__)[fim+2] 
  	//desduplica checksum
  	if (checksum == ESC) {
    	checksum = flattenDeep(pacote__)[fim+3] 
    }
  	return checksum
}

function ruido_pre_pacote(pacote_) {
    let ruido = []
    for (let k=0; k < localizaInicioDoObjeto(pacote_)-2; k++) {
        let byte_ = pacote_[k]
        ruido.push(byte_)
    } 
    return ruido
    
}


// <fim do codigo legado> 

// ========================================
// Interpreta - Funcoes de Analise de Frame
// ========================================


//remove bytes invalidos da lista sao aceitos apenas numeros
//inteiros entre 0 e 255
const filtra = (bytes: Bytes) => bytes.filter((byte) => (byte >= 0) && (byte <= 255))

const obtemStartByte = (pacote_: Bytes) => {
    const pacote = pacote_
    const ini_obj = localizaInicioDoObjeto(pacote_)
    return pacote[ini_obj-1]
}


export function isValidFrame(frame: Bytes): boolean {
    const obj = filtra(obtemObjeto(frame))
    const start_byte = obtemStartByte(frame)
    const probe = frame2Bytes( createPerfectFrame(start_byte, obj) )
    const validation = R.equals(frame, probe) 
    return validation 
}


// NOTA: esta funcao deve apenas ser usada com frame validos. 
//       utilize a funcao isValidFrame para realizar esta checagem
export function bytesToFrameReal(frame: Bytes): Frame {
    
    // caso o frame seja invalido será será considerado pre-ruido
    if (!isValidFrame(frame))
        return {
            PRE_NOISE: frame,
            INITIAL_ESC: [],
            START_BYTE: [],
            OBJECT: [],
            FINAL_ESC: [],
            END_BYTE: [], 
            CHECKSUM: [],
            POST_NOISE: []
        }

    const start_byte = obtemStartByte(frame)
    const obj = filtra(obtemObjeto(frame))
    return createPerfectFrame(start_byte, obj)

}







