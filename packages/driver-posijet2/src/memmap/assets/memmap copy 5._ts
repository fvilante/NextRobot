import { ANY_LENGTH, ANY_LINEARACCELERATION, ANY_LINEARVELOCITY, ANY_TIME, LENGTH } from "../kinetics/measure"
import { US0 } from "../core"
import { objectToPairs, Pairs } from "@nextrobot/core-utils"
import { transact } from "../../transport-layer/transaction/transact"
import { zipWith } from './zipWith'


type Resolver<TResolve, TReject> = {
    readonly resolve: (value: TResolve) => void;
    readonly reject: (reason: TReject) => void;
}


// -------------------------------------------------------------
//		POINTER MAP
// -------------------------------------------------------------

type AnyPointerMap = {
	[ParamName in string]: { 
		readonly addr: number,
		readonly startBit: number,
		readonly bitSize: number,
	}
}

// -------------------------------------------------------------
//		WAVE
// -------------------------------------------------------------


type Pointer<P extends AnyPointerMap> = keyof P
type PointerValue = number

type WavedData<P extends AnyPointerMap> = readonly { readonly pointer: Pointer<P>, readonly value: PointerValue }[]


type MakeParamMap<T extends AnyTypeCast, P extends AnyPointerMap> = {
	[ParamName in keyof T]: {
		readonly waveAddr: readonly Pointer<P>[]
		readonly waver: {
			readonly toWave: (_: T[ParamName]) => WavedData<P>
			readonly fromWave: (_: WavedData<P>) => T[ParamName] 
		}
	}
}

//

type SendWave = <P extends AnyPointerMap>(pt: P) => (r: Resolver<void,string>, pair: WavedData<P>) => void
type GetWave = <P extends AnyPointerMap>(pt: P) => (r: Resolver<WavedData<P>,string>, addr: readonly Pointer<P>[]) => void



const SendWave: SendWave = (pt) => (resolver, wavedData) => {

	console.log(`SendingWave: ${wavedData} ... Done!`)
	// todo: implement
	resolver.resolve()
}


const GetWave: GetWave = (pt) =>(resolver, addr) => {

	console.log(`Reading Wave from address: ${addr} ... Done!`)
	const r = zipWith( (pointer, value) => ({pointer, value}), addr, [1,2,3,4,5])
	// todo: implement
	resolver.resolve(r)
}



// -------------------------------------------------------------
//		TypeCast & ParameterMap
// -------------------------------------------------------------

type AnyTypeCast = {
	[ParamName in string]: unknown
}

type Transacter<T extends AnyTypeCast> = {

	readonly SetParameter: <K extends keyof T>(name: K, value: T[K]) => Promise<void>
	readonly GetParameter: <K extends keyof T>(name: K) => Promise<T[K]>

}





const makeTransacter = <T extends AnyTypeCast, P extends AnyPointerMap>(pm: MakeParamMap<T,P>, pt: P): Transacter<T> => {

	return {

		SetParameter: (name, value) => 	new Promise((resolve, reject) => {

			// get WavedData
			const paramMap = pm[name]
			const toWave = paramMap.waver.toWave
			const wavedData = toWave(value)

			const resolver = {resolve, reject} 

			// send

			// tslint:disable-next-line: no-expression-statement
			SendWave(pt)(resolver, wavedData)

			
		}),

		GetParameter: (name) =>			new Promise( (resolve, reject) => {

			const paramMap = pm[name]
			const waveAddr = paramMap.waveAddr
			const fromWave = paramMap.waver.fromWave

			const resolver = { 
				resolve: (wavedData: WavedData<P>) => resolve(fromWave(wavedData)), 
				reject
			} 

			// tslint:disable-next-line: no-expression-statement
			GetWave(pt)(resolver, waveAddr)



		})
	}

}






// -------------- DRIVER ---------------------------

type TypeCast = {
	readonly 'Parameter1': number
	readonly 'Parameter2': number //string
	readonly 'Parameter3': string //'More' | 'Global' | 'Less'
	readonly 'Parameter4': number //ANY_LENGTH
}



type ParamMap =  MakeParamMap<TypeCast, PointerMap>

const ParamMap: ParamMap = {

	'Posicao inicial': 													{wave: ['posiniL', 'posiniH']},
	'Posicao final': 													{wave: ['posfimL', 'PindeL']},
	'Aceleracao de avanco': 											{wave: ['PindeL']},
	

}



// -------------------------------------------------------------
//		POINTER MAP
// -------------------------------------------------------------


type PointerMap = typeof PointerMap


const PointerMap = {

	'PatuaL':						{ addr: 0x00, startBit: 0, bitSize: 8 },		//Posicao atual
	'PatuaH':						{ addr: 0x01, startBit: 0, bitSize: 8 },
	
	'FLGpis':						{ addr: 0x13, startBit: 0, bitSize: 8 },		//Flag do pistao

		'FLGpis.AntecipOk':			{ addr: 0x13, startBit: 7, bitSize: 1 },		//Indica que ja passou pela posição de antecipação
		'FLGpis.ImpressOk':			{ addr: 0x13, startBit: 6, bitSize: 1 },		//Indica que a posição atual é uma Posição de impressão



} as const



// -------------------------------------------------------------
//		Transacter
// -------------------------------------------------------------

const Transacter = makeTransacter(ParamMap, PointerMap)



