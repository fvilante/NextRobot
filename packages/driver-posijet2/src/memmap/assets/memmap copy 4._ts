import { ANY_LENGTH, ANY_LINEARACCELERATION, ANY_LINEARVELOCITY, ANY_TIME, LENGTH } from "../kinetics/measure"
import { US0 } from "../core"

// core


type AnyTypeCast = {
	[ParamName in string]: unknown
}



//

type TypeCast = {
	readonly 'Posicao inicial': ANY_LENGTH
	readonly 'Posicao final': ANY_LENGTH
	readonly 'Aceleracao de avanco': ANY_LINEARACCELERATION
	readonly 'Aceleracao de retorno': ANY_LINEARACCELERATION
	readonly 'Velocidade de avanco': ANY_LINEARVELOCITY
	readonly 'Velocidade de retorno': ANY_LINEARVELOCITY

	readonly 'Numero de mensagem no avanco': number
	readonly 'Numero de mensagem no retorno': number
	readonly 'Posicao da primeira impressao no avanco': ANY_LENGTH
	readonly 'Posicao da primeira impressao no retorno': ANY_LENGTH
	readonly 'Posicao da ultima impressao no avanco': ANY_LENGTH
	readonly 'Posicao da ultima impressao no retorno': ANY_LENGTH

	readonly 'Largura do sinal de impressao': ANY_TIME
	readonly 'Tempo para o start automatico': ANY_TIME
	readonly 'Tempo para o start externo': ANY_TIME
	readonly 'Cota de antecipacao do start entre eixos': ANY_LENGTH
	readonly 'Retardo para o start automatico passo-a-passo': ANY_TIME

	//configuracao do programa

	readonly 'Start automatico no avanco': boolean
	readonly 'Start automatico no retorno': boolean
	readonly 'Saida de start no avanco': boolean
	readonly 'Saida de start no retorno': boolean
	readonly 'Start externo habilitado': boolean
	readonly 'Logica do start externo': 'aberto' | 'fechado'
	readonly 'Entrada de start entre eixo': boolean
	readonly 'Start externo para referenciar': boolean

	readonly 'Logica do sinal de impressao': 'aberto' | 'fechado'
	readonly 'Logica do sinal de reversao': 'aberto' | 'fechado'
	readonly 'Selecao de impressao via serial': boolean
	readonly 'Reversao de impressao via serial': boolean
	readonly 'Janela de protecao por giro para protecao': boolean
	readonly 'Janela de protecao por giro para correcao': boolean
	readonly 'Reducao do nivel de corrente em repouso': boolean
	readonly 'Modo continuo passo-a-passo': 'continuo' | 'passo-a-passo'


	readonly 'Retardo para sinal de impressao': ANY_TIME
	readonly 'Divisor programado do taco': number

	readonly 'Tolerancia de erro do giro': ANY_LENGTH
	readonly 'Numero de pulsos por volta do motor': 400 | 200
	readonly 'Valor programado da referencia': ANY_LENGTH
	readonly 'Aceleracao de referencia': ANY_LINEARACCELERATION
	readonly 'Velocidade de referencia': ANY_LINEARVELOCITY

	readonly 'Saida de start passo-a-passo': boolean
	readonly 'Start automatico passo-a-passo': boolean
	//readonly 'Selecao de mensagem por multipla': boolean
	//readonly 'Selecao de mensagem por impressao': boolean
	//readonly 'Selecao de mensagem pela paralela': boolean
	//readonly 'Selecao de mensagem decrementado no retorno': boolean

	//readonly 'Divisor programado do motor': number

	// Controle via serial

	readonly 'Start serial': boolean
	readonly 'Stop serial': boolean
	readonly 'Pausa serial': boolean
	readonly 'Modo manual serial': boolean
	readonly 'Teste de impressao serial': boolean
	readonly 'Usado na bahia sul, descrito na rotina LEITOK': boolean
	readonly 'Grava eprom2': boolean
	readonly 'Ignora a protecao da porta': boolean

	readonly 'Diferenca entre FC- e primeiro Giro': ANY_LENGTH


	// Flag de uso geral

	readonly 'Finalizacao da referencia': boolean
	readonly 'Bit de valor do giro invalido': boolean
	readonly 'Start automatico pendente': boolean
	readonly 'Start entre eixo pendente': boolean
	readonly 'Acesso a eprom via serial': boolean
	readonly 'Gravacao de bloco na eprom2 em andamento': boolean
	readonly 'Gravacao da eprom2 em andamento': boolean

	// Nivel dos sinais de fc-/fc+/ref/zindex

	readonly 'Half or full step': boolean
	readonly 'Nivel do motor': boolean
	readonly 'Giro do motor': boolean
	readonly 'Direcao do motor': boolean
	readonly 'Clock do motor': boolean
	readonly 'Inicio do curso': boolean
	readonly 'Referencia': boolean
	readonly 'Energizacao do motor': boolean


	//

	//duplicado -> readonly 'Numero de mensagem no avanco': number
	readonly 'Contador do retardo para sinal de impressao': number
	readonly 'Carrega contador do botao de emergencia': number
	readonly 'Contador do tempo de pulso de bahia sul': number


}

const SetParameter = <K extends keyof TypeCast>(name: K, value: TypeCast[K]): Promise<void> => {
	return Promise.resolve()
}

const GetParameter = <K extends keyof TypeCast>(name: K): Promise<TypeCast[K]> => {
	
}




type Wave<P extends AnyPointerMap> = readonly (keyof P)[]

type MakeParamMap<T extends AnyTypeCast, P extends AnyPointerMap> = {
	[ParamName in keyof T]: {
		readonly wave: Wave<P>
	}
}

type ParamMap =  MakeParamMap<TypeCast, PointerMap>

const ParamMap: ParamMap = {

	'Posicao inicial': 													{wave: ['posiniL', 'posiniH']},
	'Posicao final': 													{wave: ['posfimL', 'PindeL']},
	'Aceleracao de avanco': 											{wave: ['PindeL']},
	'Aceleracao de retorno': 											{wave: []},
	'Velocidade de avanco': 											{wave: []},
	'Velocidade de retorno': 											{wave: []},
	'Numero de mensagem no avanco': 									{wave: []},
	'Numero de mensagem no retorno': 									{wave: []},
	'Posicao da primeira impressao no avanco': 							{wave: []},
	'Posicao da primeira impressao no retorno': 						{wave: []},
	'Posicao da ultima impressao no avanco': 							{wave: []},
	'Posicao da ultima impressao no retorno': 							{wave: []},
	'Largura do sinal de impressao': 									{wave: []},
	'Tempo para o start automatico': 									{wave: []},
	'Tempo para o start externo': 										{wave: []},
	'Cota de antecipacao do start entre eixos': 						{wave: []},
	'Retardo para o start automatico passo-a-passo': 					{wave: []},

	//configuracao do programa

	'Start automatico no avanco': 										{wave: []},
	'Start automatico no retorno': 										{wave: []},
	'Saida de start no avanco': 										{wave: []},
	'Saida de start no retorno': 										{wave: []},
	'Start externo habilitado': 										{wave: []},
	'Logica do start externo': 											{wave: []},
	'Entrada de start entre eixo': 										{wave: []},
	'Start externo para referenciar': 									{wave: []},

	'Logica do sinal de impressao': 									{wave: []},
	'Logica do sinal de reversao': 										{wave: []},
	'Selecao de impressao via serial': 									{wave: []},
	'Reversao de impressao via serial': 								{wave: []},
	'Janela de protecao por giro para protecao': 						{wave: []},
	'Janela de protecao por giro para correcao': 						{wave: []},
	'Reducao do nivel de corrente em repouso': 							{wave: []},
	'Modo continuo passo-a-passo': 										{wave: []},


	'Retardo para sinal de impressao': 									{wave: []},
	'Divisor programado do taco': 										{wave: []},

	'Tolerancia de erro do giro': 										{wave: []},
	'Numero de pulsos por volta do motor': 								{wave: []},
	'Valor programado da referencia': 									{wave: []},
	'Aceleracao de referencia': 										{wave: []},
	'Velocidade de referencia': 										{wave: []},

	'Saida de start passo-a-passo':										{wave: []},
	'Start automatico passo-a-passo': 									{wave: []},
	//'Selecao de mensagem por multipla': 								{wave: []},
	//'Selecao de mensagem por impressao':								{wave: []},
	//'Selecao de mensagem pela paralela': 								{wave: []},
	//'Selecao de mensagem decrementado no retorno': 					{wave: []},

	//'Divisor programado do motor': 									{wave: []},

	// Controle via serial

	'Start serial': 													{wave: []},
	'Stop serial': 														{wave: []},
	'Pausa serial': 													{wave: []},
	'Modo manual serial': 												{wave: []},
	'Teste de impressao serial': 										{wave: []},
	'Usado na bahia sul, descrito na rotina LEITOK': 					{wave: []},
	'Grava eprom2': 													{wave: []},
	'Ignora a protecao da porta': 										{wave: []},

	'Diferenca entre FC- e primeiro Giro': 								{wave: []},


	// Flag de uso geral

	'Finalizacao da referencia': 										{wave: []},
	'Bit de valor do giro invalido': 									{wave: []},
	'Start automatico pendente': 										{wave: []},
	'Start entre eixo pendente': 										{wave: []},
	'Acesso a eprom via serial': 										{wave: []},
	'Gravacao de bloco na eprom2 em andamento': 						{wave: []},
	'Gravacao da eprom2 em andamento': 									{wave: []},

	// Nivel dos sinais de fc-/fc+/ref/zindex

	'Half or full step': 												{wave: []},
	'Nivel do motor': 													{wave: []},
	'Giro do motor': 													{wave: []},
	'Direcao do motor': 												{wave: []},
	'Clock do motor': 													{wave: []},
	'Inicio do curso': 													{wave: []},
	'Referencia': 														{wave: []},
	'Energizacao do motor': 											{wave: []},



	//duplicado -> readonly 'Numero de mensagem no avanco': number
	'Contador do retardo para sinal de impressao': 						{wave: []},
	'Carrega contador do botao de emergencia': 							{wave: []},
	'Contador do tempo de pulso de bahia sul': 							{wave: []},

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

type PointerMap = typeof PointerMap


const PointerMap = {

	'PatuaL':						{ addr: 0x00, startBit: 0, bitSize: 8 },		//Posicao atual
	'PatuaH':						{ addr: 0x01, startBit: 0, bitSize: 8 },
	'PexecL':						{ addr: 0x02, startBit: 0, bitSize: 8 },		//Posicao de execucao
	'PexecH':						{ addr: 0x03, startBit: 0, bitSize: 8 },
	'PrampL':						{ addr: 0x04, startBit: 0, bitSize: 8 },		//Posicao do inicio da rampa
	'PrampH':						{ addr: 0x05, startBit: 0, bitSize: 8 },
	'VmaxL':						{ addr: 0x06, startBit: 0, bitSize: 8 },		//Velocidade maxima
	'VmaxH':						{ addr: 0x07, startBit: 0, bitSize: 8 },
	'VminL':						{ addr: 0x08, startBit: 0, bitSize: 8 },		//Velocidade minima
	'VminH':						{ addr: 0x09, startBit: 0, bitSize: 8 },
	'VincL':						{ addr: 0x0A, startBit: 0, bitSize: 8 },		//Incremento de Velocidade
	'VincH':						{ addr: 0x0B, startBit: 0, bitSize: 8 },
	'velatuF':						{ addr: 0x0C, startBit: 0, bitSize: 8 },		//Velocidade atual (3 byte)
	'velatuL':						{ addr: 0x0D, startBit: 0, bitSize: 8 },
	'velatuH':						{ addr: 0x0E, startBit: 0, bitSize: 8 },
	'iMensag':						{ addr: 0x0F, startBit: 0, bitSize: 8 },		//Numero da proxima mensagem a ser impressa
	
	'FLGpis':						{ addr: 0x13, startBit: 0, bitSize: 8 },		//Flag do pistao

		'FLGpis.AntecipOk':			{ addr: 0x13, startBit: 7, bitSize: 1 },		//Indica que ja passou pela posição de antecipação
		'FLGpis.ImpressOk':			{ addr: 0x13, startBit: 6, bitSize: 1 },		//Indica que a posição atual é uma Posição de impressão


	'FmaxL':						{ addr: 0x14, startBit: 0, bitSize: 8 },		//Velocidade limite superior, constante do sistema
	'FmaxH':						{ addr: 0x15, startBit: 0, bitSize: 8 },
	'FminL':						{ addr: 0x16, startBit: 0, bitSize: 8 },		//Velocidade limite inferior, constante do sistema
	'FminH':						{ addr: 0x17, startBit: 0, bitSize: 8 },
	'tmpsysL':						{ addr: 0x18, startBit: 0, bitSize: 8 },		//Contador do tempo do sistema
	'tmpsysH':						{ addr: 0x19, startBit: 0, bitSize: 8 },
	'ndivL':						{ addr: 0x1A, startBit: 0, bitSize: 8 },		//Novo divisor do contador para o comparador A
	'ndivH':						{ addr: 0x1B, startBit: 0, bitSize: 8 },
	'cntprtL':						{ addr: 0x1C, startBit: 0, bitSize: 8 },		//Contador da Largura do sinal de impressao
	'cntprtH':						{ addr: 0x1D, startBit: 0, bitSize: 8 },
	'PindeL':						{ addr: 0x1E, startBit: 0, bitSize: 8 },		//Posicao do zero index
	'PindeH':						{ addr: 0x1F, startBit: 0, bitSize: 8 },
	'prtL':							{ addr: 0x20, startBit: 0, bitSize: 8 },
	'prtH':							{ addr: 0x21, startBit: 0, bitSize: 8 },
	'SobraIntTmpL':					{ addr: 0x22, startBit: 0, bitSize: 8 },		//Menor tempo de sobra da rotina intTmp
	'SobraIntTmpH':					{ addr: 0x23, startBit: 0, bitSize: 8 },		//Menor tempo de sobra da rotina intTmp
	'FlgSdoor':						{ addr: 0x26, startBit: 0, bitSize: 8 },		//Filtro do sensor de porta
	'NUMmenA':						{ addr: 0x27, startBit: 0, bitSize: 8 },		//Ultimo valor do numero de mensagem a ser impressa
	'nummen':						{ addr: 0x28, startBit: 0, bitSize: 8 },		//Numero de mensagem a ser impressa
	'Vmotor':						{ addr: 0x29, startBit: 0, bitSize: 8 },		//Valor do divisor do motor
	
	'masceL':						{ addr: 0x2A, startBit: 0, bitSize: 8 },		//Mascara de erro byte low
	
		'masceL.eSinStaV':			{ addr: 0x2A, startBit: 0, bitSize: 1 },		//Sinal de start, velocidade
		'masceL.eSinStaO':			{ addr: 0x2A, startBit: 1, bitSize: 1 },		//Sinal de start/outro
		'masceL.eSinIndx2':			{ addr: 0x2A, startBit: 2, bitSize: 1 },		//Sinal do zero index
		'masceL.eSinIndx3':			{ addr: 0x2A, startBit: 3, bitSize: 1 },		//Sinal do zero index
		'masceL.eSinImpr':			{ addr: 0x2A, startBit: 4, bitSize: 1 },		//Sinal de impressao
		'masceL.eSerCom1':			{ addr: 0x2A, startBit: 5, bitSize: 1 },		//Erro na com1  (Valido somente com o include "..\BIBN\CODEBOX8.bib")
		'masceL.eMudPar':			{ addr: 0x2A, startBit: 6, bitSize: 1 },		//Mudanca de parametros no instante errado

	'masceH':						{ addr: 0x2B, startBit: 0, bitSize: 8 },		//byte high

		'masceH.eRunTime':			{ addr: 0x2B, startBit: 0, bitSize: 1 },		//Erro de RunTimer da rotina inttmp
		'masceH.ePortaBerta':		{ addr: 0x2B, startBit: 2, bitSize: 1 },		//Erro de porta aberta



	'cntstaL':						{ addr: 0x2C, startBit: 0, bitSize: 8 },		//Contador da do sinal do start externo
	'cntstaH':						{ addr: 0x2D, startBit: 0, bitSize: 8 },
	'cntautL':						{ addr: 0x2E, startBit: 0, bitSize: 8 },		//Contador do sinal do start automatico
	'cntautH':						{ addr: 0x2F, startBit: 0, bitSize: 8 },
	'PORTCX':						{ addr: 0x30, startBit: 0, bitSize: 8 },
	'PORTCY':						{ addr: 0x31, startBit: 0, bitSize: 8 },
	 
	'StatusL':						{ addr: 0x32, startBit: 0, bitSize: 8 },		//Flag de status

		'StatusL.ReferenciaOk':		{ addr: 0x32, startBit: 0, bitSize: 1 },		//Referenciado
		'StatusL.PosExecutada':		{ addr: 0x32, startBit: 1, bitSize: 1 },		//Posicao Executada (Só esta como variavel no .include "..\BIBN\serial38.bib")
		'StatusL.Referenciando':	{ addr: 0x32, startBit: 2, bitSize: 1 },		//Referenciando
		'StatusL.sttDirPos':		{ addr: 0x32, startBit: 3, bitSize: 1 },		//Direcao do movimento
		'StatusL.sttAceler':		{ addr: 0x32, startBit: 4, bitSize: 1 },		//Aceleracao ligada
		'StatusL.sttDesacel':		{ addr: 0x32, startBit: 5, bitSize: 1 },		//Desaceleracao ligada//
		'StatusL.sttErro':			{ addr: 0x32, startBit: 7, bitSize: 1 },		//Indicacao de erro


	'StatusH':						{ addr: 0x33, startBit: 0, bitSize: 8 },		//Flag de status
	'ErroSys': 						{ addr: 0x34, startBit: 0, bitSize: 8 },		//Byte com o cod. de erro
	'tstindL':						{ addr: 0x36, startBit: 0, bitSize: 8 },		//So'para teste do zero index ???###???
	'tstindH':						{ addr: 0x37, startBit: 0, bitSize: 8 },		//So'para teste do zero index ???###???
	 
	'flagZ':						{ addr: 0x39, startBit: 0, bitSize: 8 },		//Flags do sinal do zero index
	'tmpintL':						{ addr: 0x3A, startBit: 0, bitSize: 8 },		//So'para teste de overrun da interrupcao ???###???
	'tmpintH':						{ addr: 0x3B, startBit: 0, bitSize: 8 },		//So'para teste de overrun da interrupcao ???###???
	
	'FlgStaX':						{ addr: 0x3C, startBit: 0, bitSize: 8 },		//Flags do sinal do start externo

		'FlgStaX.D7': 				{ addr: 0x3C, startBit: 7, bitSize: 1 },		//Valor do sinal de start anterior
		'FlgStaX.D4': 				{ addr: 0x3C, startBit: 4, bitSize: 1 },		//Indica que o start foi entre eixos
		'FlgStaX.D0-3': 			{ addr: 0x3C, startBit: 0, bitSize: 4 },		//Contador de leitura do start


	'FlgStaY':						{ addr: 0x3D, startBit: 0, bitSize: 8 },		//Flags do sinal do start do eixo Y

			'FlgStaY.D0-3': 		{ addr: 0x3D, startBit: 0, bitSize: 4 }, 	//igual a flags
			'FlgStaY.D4':			{ addr: 0x3D, startBit: 4, bitSize: 1 },		//Sinal de start entre eixo
			'FlgStaY.D5':			{ addr: 0x3D, startBit: 5, bitSize: 1 },		//Indica saida de start entre eixo em andamento
			'FlgStaY.D6':			{ addr: 0x3D, startBit: 6, bitSize: 1 },		//Indica que a saida do start entre eixo e' esterno
			'FlgStaY.D7': 			{ addr: 0x3D, startBit: 7, bitSize: 1 }, 	//igual a flags
	
	'posiniL':						{ addr: 0x00, startBit: 0, bitSize: 8 },		//Posicao inicial programada
	'posiniH':						{ addr: 0x01, startBit: 0, bitSize: 8 },			
	'posfimL':						{ addr: 0x02, startBit: 0, bitSize: 8 },		//Posicao final programada
	'posfimH': 						{ addr: 0x03, startBit: 0, bitSize: 8 },							
	'AavanL':						{ addr: 0x04, startBit: 0, bitSize: 8 },		//Aceleracao de avanco programada
	'AavanH':						{ addr: 0x05, startBit: 0, bitSize: 8 },			
	'AretoL':						{ addr: 0x06, startBit: 0, bitSize: 8 },		//Aceleracao de retorno programada
	'AretoH':						{ addr: 0x07, startBit: 0, bitSize: 8 },			
	'VavanL':						{ addr: 0x08, startBit: 0, bitSize: 8 },		//Velocidade de avanco programada
	'VavanH':						{ addr: 0x09, startBit: 0, bitSize: 8 },			
	'VretoL':						{ addr: 0x0A, startBit: 0, bitSize: 8 },		//Velocidade de retorno programada
	'VretoH':						{ addr: 0x0B, startBit: 0, bitSize: 8 },			
	'nMenAv':						{ addr: 0x0C, startBit: 0, bitSize: 8 },		//Numero de mensagem no avanco
	'nMenRt':						{ addr: 0x0D, startBit: 0, bitSize: 8 },		//Numero de mensagem no retorno
	'pPrtAvL':						{ addr: 0x0E, startBit: 0, bitSize: 8 },		//posicao da primeira impressao no avanco
	'pPrtAvH':						{ addr: 0x0F, startBit: 0, bitSize: 8 },			
	'pPrtRtL':						{ addr: 0x10, startBit: 0, bitSize: 8 },		//posicao da primeira impressao no retorno
	'pPrtRtH':						{ addr: 0x11, startBit: 0, bitSize: 8 },			
	'UprtAVL':						{ addr: 0x12, startBit: 0, bitSize: 8 },		//Posicao da ultima mensagem no avanco
	'UprtAVH':						{ addr: 0x13, startBit: 0, bitSize: 8 },			
	'UprtRTL':						{ addr: 0x14, startBit: 0, bitSize: 8 },		//Posicao da ultima mensagem no retorno
	'UprtRTH':						{ addr: 0x15, startBit: 0, bitSize: 8 },			
	'tmpprtL':						{ addr: 0x16, startBit: 0, bitSize: 8 },		//Largura do sinal de impressao
	'tmpprtH':						{ addr: 0x17, startBit: 0, bitSize: 8 },			
	'tmpautL':						{ addr: 0x18, startBit: 0, bitSize: 8 },		//Tempo para o start automatico
	'tmpautH':						{ addr: 0x19, startBit: 0, bitSize: 8 },			
	'tmpextL':						{ addr: 0x1A, startBit: 0, bitSize: 8 },		//Tempo para o start externo
	'tmpextH':						{ addr: 0x1B, startBit: 0, bitSize: 8 },			
	'AntcinL':						{ addr: 0x1C, startBit: 0, bitSize: 8 },		//Cota de antecipacao do start entre eixos (pinelmatico)
	'AntcinH':						{ addr: 0x1D, startBit: 0, bitSize: 8 },			
	'TempPPL':						{ addr: 0x1E, startBit: 0, bitSize: 8 },		//Retardo para o start automatico passo a passo
	'TempPPH':						{ addr: 0x1F, startBit: 0, bitSize: 8 },			
				
	'FLAGPL':						{ addr: 0x20, startBit: 0, bitSize: 8 },		//Flag de configuracao da programacao

		'FLAGPL.STAUTA': 			{ addr: 0x20, startBit: 0, bitSize: 1 },		//Start automatico no avanco ligado
		'FLAGPL.STAUTR':			{ addr: 0x20, startBit: 1, bitSize: 1 },		//Start automatico no retorno ligado
		'FLAGPL.SSAUTA':			{ addr: 0x20, startBit: 2, bitSize: 1 },		//Saida de start no avanco ligado
		'FLAGPL.SSAUTR':			{ addr: 0x20, startBit: 3, bitSize: 1 },		//Saida de start no retorno ligado
		'FLAGPL.HSEXTE':			{ addr: 0x20, startBit: 4, bitSize: 1 },		//Start externo habilitado ??
		'FLAGPL.LSEXTE':			{ addr: 0x20, startBit: 5, bitSize: 1 },		//Logica do start externo ??
		'FLAGPL.ESENTR':			{ addr: 0x20, startBit: 6, bitSize: 1 },		//Entrada de start entre eixo habilitado ??
		'FLAGPL.STAREF':			{ addr: 0x20, startBit: 7, bitSize: 1 },		//Start externo para referenciar habilitado ??


	'FLAGPH':						{ addr: 0x21, startBit: 0, bitSize: 8 },		//Flag de configuracao da programacao

		'FLAGPH.LOGIMP':			{ addr: 0x20, startBit: 0, bitSize: 1 },		//Logica do sinal de impressao
		'FLAGPH.LOGREV':			{ addr: 0x20, startBit: 1, bitSize: 1 },		//Logica do sinal de reversao
		'FLAGPH.SELSER':			{ addr: 0x20, startBit: 2, bitSize: 1 },		//Selecao de impressao via serial ligada
		'FLAGPH.REVSER':			{ addr: 0x20, startBit: 3, bitSize: 1 },		//Reversao de impressao via serial ligada
		'FLAGPH.ZERIHP':			{ addr: 0x20, startBit: 4, bitSize: 1 },		//Zero Index habilitado p/ protecao
		'FLAGPH.ZERIHC':			{ addr: 0x20, startBit: 5, bitSize: 1 },		//Zero Index habilitado p/ correcao
		'FLAGPH.REDCOR':			{ addr: 0x20, startBit: 6, bitSize: 1 },		//Reducao do nivel de corrente em repouso
		'FLAGPH.MODPP':				{ addr: 0x20, startBit: 7, bitSize: 1 },		//Modo continuo/passo a passo

				
	'TEMPPTL':						{ addr: 0x22, startBit: 0, bitSize: 8 },		//Retardo para o sinal de impressao
	'TEMPPTH':						{ addr: 0x23, startBit: 0, bitSize: 8 },			
	'Ptaco':						{ addr: 0x24, startBit: 0, bitSize: 8 },		//Divisor programado do taco
	'Vago1':						{ addr: 0x25, startBit: 0, bitSize: 8 },		//Vago

	'JanelaL':						{ addr: 0x26, startBit: 0, bitSize: 8 },		//(+/-) Tolerancia de Erro do zero index
	'JanelaH':						{ addr: 0x27, startBit: 0, bitSize: 8 },			
	'npulsoL': 						{ addr: 0x28, startBit: 0, bitSize: 8 },		//Numero de pulsos por volta do motor
	'npulsoH': 						{ addr: 0x29, startBit: 0, bitSize: 8 },			
	'valrefL':						{ addr: 0x2A, startBit: 0, bitSize: 8 },		//Valor programado da referencia
	'valrefH':						{ addr: 0x2B, startBit: 0, bitSize: 8 },			
	'AreferL':						{ addr: 0x2C, startBit: 0, bitSize: 8 },		//Aceleracao de referencia
	'AreferH':						{ addr: 0x2D, startBit: 0, bitSize: 8 },			
	'VreferL':						{ addr: 0x2E, startBit: 0, bitSize: 8 },		//Velocidade de referencia
	'VreferH':						{ addr: 0x2F, startBit: 0, bitSize: 8 },			
				
	'FLAGPE':						{ addr: 0x30, startBit: 0, bitSize: 8 },		//Flag especial de intertravamento.

		'FLAGPE.SstaPP':			{ addr: 0x30, startBit: 0, bitSize: 1 },		//Saida de start passo a passo ?
		'FLAGPE.STautPP':			{ addr: 0x30, startBit: 1, bitSize: 1 },		//Start automatico passo a passo
		'FLAGPE.SelPorMul':			{ addr: 0x30, startBit: 2, bitSize: 1 },		//Selecao de mensagem por multipla
		'FLAGPE.SelPorImp':			{ addr: 0x30, startBit: 3, bitSize: 1 },		//Selecao de mensagem por impresão
		'FLAGPE.SelParalela':		{ addr: 0x30, startBit: 4, bitSize: 1 },		//Selecao de mensagem pela paralela
		'FLAGPE.SelMenDecRet':		{ addr: 0x30, startBit: 5, bitSize: 1 },		//Selecao de mensagem Decrementado no retorno


	'Pmotor':						{ addr: 0x31, startBit: 0, bitSize: 8 },		//Divisor programado do motor
				
	'CTRSER':						{ addr: 0x32, startBit: 0, bitSize: 8 },		//Controle via serial

		'CTRSER.SerStart':			{ addr: 0x32, startBit: 0, bitSize: 1 },		//Start serial
		'CTRSER.SerStop':			{ addr: 0x32, startBit: 1, bitSize: 1 },		//Stop serial
		'CTRSER.SerPausa':			{ addr: 0x32, startBit: 2, bitSize: 1 },		//Pausa serial
		'CTRSER.SerManual':			{ addr: 0x32, startBit: 3, bitSize: 1 },		//Modo manual serial
		'CTRSER.SerTstImp':			{ addr: 0x32, startBit: 4, bitSize: 1 },		//Teste de impressao serial
		'CTRSER.SerLeitOkBhs':		{ addr: 0x32, startBit: 5, bitSize: 1 },		//Usado na bahia sul, descrito na rotina LEITOK
		'CTRSER.SerGrvEpr':			{ addr: 0x32, startBit: 6, bitSize: 1 },		//Grava eprom2


	'CtrSerH':						{ addr: 0x33, startBit: 0, bitSize: 8 },			

		'CtrSerH.IgnProtPor':		{ addr: 0x33, startBit: 4, bitSize: 1 },		//Ignora a proteção da porta

				
	'POSINDEL': 					{ addr: 0x34, startBit: 0, bitSize: 8 },		//O Programa salva nesta variavel a diferenca
	'POSINDEH': 					{ addr: 0x35, startBit: 0, bitSize: 8 },		//entre a saida do fc- e o primeiro giro do zindex
				
	'FLAGC':						{ addr: 0x36, startBit: 0, bitSize: 8 },		//Valor anterior da porta C
				
	'FlagG':						{ addr: 0x37, startBit: 0, bitSize: 8 },		//Flag de uso geral

		'FlagG.FinalizRef':			{ addr: 0x37, startBit: 0, bitSize: 1 },		//Finalizacao da referencia
		'FlagG.ZerIndInv': 			{ addr: 0x37, startBit: 1, bitSize: 1 },		//Bit de valor do zero index invalido
		'FlagG.StaAutPe':  			{ addr: 0x37, startBit: 2, bitSize: 1 },		//Start automatico pendente
		'FlagG.StaEntEixP':			{ addr: 0x37, startBit: 3, bitSize: 1 },		//Start entre eixo pendente
		'FlagG.AcsEprSer': 			{ addr: 0x37, startBit: 5, bitSize: 1 },		//Acesso a eprom via serial
		'FlagG.GrvBlkEpr': 			{ addr: 0x37, startBit: 6, bitSize: 1 },		//Gravacao de bloco na eprom2 em andamento
		'FlagG.GrvEprAnd': 			{ addr: 0x37, startBit: 7, bitSize: 1 },		//Gravacao da eprom2 em andamento

	'CNTPIST':						{ addr: 0x38, startBit: 0, bitSize: 8 },		//Contador do temporizador do pistao
				
	'CONFC':						{ addr: 0x39, startBit: 0, bitSize: 8 },		//Nivel dos sinais de fc-/fc+/ref/zindex

		'CONFC.H/F':				{ addr: 0x39, startBit: 0, bitSize: 1 },		// Half or full step
		'CONFC.Nmotor':				{ addr: 0x39, startBit: 1, bitSize: 1 },		// Nivel do motor
		'CONFC.Fc+':				{ addr: 0x39, startBit: 2, bitSize: 1 },		// Giro do motor
		'CONFC.Dmotor':				{ addr: 0x39, startBit: 3, bitSize: 1 },		// Direcao do motor
		'CONFC.CKmotor':			{ addr: 0x39, startBit: 4, bitSize: 1 },		// Clock do motor
		'CONFC.FC-':				{ addr: 0x39, startBit: 5, bitSize: 1 },		// Inicio de curso
		'CONFC.REF':				{ addr: 0x39, startBit: 6, bitSize: 1 },		// Referencia
		'CONFC.Emotor':				{ addr: 0x39, startBit: 7, bitSize: 1 },		// Energizacao do motor

				
	'iMenAv':						{ addr: 0x3A, startBit: 0, bitSize: 8 },		//Numero de mensagem no avanco
	'iMenRt':						{ addr: 0x3B, startBit: 0, bitSize: 8 },		//Numero de mensagem no avanco
				
	'CNTPTL':						{ addr: 0x3C, startBit: 0, bitSize: 8 },		//Contador do retardo para o sinal de impressao
	'CNTPTH':						{ addr: 0x3D, startBit: 0, bitSize: 8 },		//Contador do retardo para o sinal de impressao
				
	'emg_cnt':						{ addr: 0x3E, startBit: 0, bitSize: 8 },		//carrega contador do botao de emergencia
	'CNTBH':						{ addr: 0x3F, startBit: 0, bitSize: 8 },		//Contador do tempo de pulso da bahia sul


} as const



