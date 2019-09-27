import { ByteToWord } from "../../transport-layer/transaction/pacote-models/base-model/byteAndWordConversors";
import { LENGTH, ANY_LENGTH } from "../kinetics/measure";

/*
CMPP09AF-3

regras de parsing:
1o) Excluido linhas de Comentarios
1.5o) Excluido dados que representam registradores e nao endereço de dados
2o) Excluido equ
3o) Alinhamento
*/


// core

const UNSTABLE = 'Unstable'
const STABLE = 'stable'

type Bit = number
type BitRange = [number, number]

type AnyAddrMap = {
	[WordLabel in string]: {
		addr: number,
		bitSize: number,
		detail?: {
			[BitsLabel in string]: (Bit | BitRange)[]
		}
	}
}

type GetDetail<T extends AnyAddrMap[string]> = 
	T  extends { addr: number, detail: unknown } ? keyof T['detail'] : never


type BytePointer<M extends AnyAddrMap, A extends keyof M> = [A]
type BitPointer<M extends AnyAddrMap, A extends keyof M, D extends GetDetail<M[A]>> = [A, D]

type AnyBytePointer = BytePointer<AnyAddrMap, keyof AnyAddrMap>
type AnyBitPointer = BitPointer<AnyAddrMap, keyof AnyAddrMap, string>

type MakeBytePointer<M extends AnyAddrMap> =  <A extends keyof M>(addr: A) => BytePointer<M, A>
type MakeBitPointer<M extends AnyAddrMap> =  <A extends keyof M, D extends GetDetail<M[A]>>(byteAddr: A, detail: D) => BitPointer<M,A,D>


type Pointed = (AnyBytePointer | AnyBitPointer)[]


type R = (_: Pointed) => number
type R = (_: Pointed) => number

// driver


const AddrMap = {
	'PatuaL': { addr: 0x00, bitSize: 8 },
	'PatuaH': { addr: 0x01, bitSize: 8 }, 
	'PexecL': { addr: 0x02, bitSize: 8 },
	'FlagPis':{ addr: 0x02, bitSize: 8,
		detail: {
			'AntecipOk': [7],
			'ImpressOk': [6],
		}
	}
} as const
type AddrMap = typeof AddrMap




const BytePointer: MakeBytePointer<AddrMap> = (addr) => [addr]
const BitPointer: MakeBitPointer<AddrMap> = (addr, detail) => [addr, detail]

const a = BytePointer('FlagPis')
const b = BitPointer('FlagPis', 'AntecipOk')

		
type A = {
	'Posicao Atual': ANY_LENGTH
	'Posicao de execucao': ANY_LENGTH
}

const A = {
	'Posicao Atual': {
		bundle: [BytePointer('PatuaL'), BitPointer('FlagPis', 'AntecipOk')],
		bundleToNumber: _ => _.reduce((acc, cur)=> acc+cur),
		numberToBundle: _ => numberToWord(_),
	}
}



const getData = <W extends keyof AddrMap, D extends GetDetail<AddrMap[W]>>(w: W, detail: D): Promise<number> => { }
const setData = w
//const setBitMask
//const resetBitmask

const a = getData('PatuaL')



const readBytes = (addresses) => 
const writeWord 


const ParameterMap = {
	'Posicao atual': {
		data: [AddrMap['PatuaL'], AddrMap['PatuaH']],
		toWave: (_) => AddrMap()

	}
}



const a = AddrMap['FlagPis'].detail['AntecipOk']
const b = ByteToWord(AddrMap.PatuaL, AddrMap.PatuaH)


PatuaL			;0x00				;Posicao atual
PatuaH			;0x01
PexecL			;0x02				;Posicao de execucao
PexecH			;0x03
PrampL			;0x04				;Posicao do inicio da rampa
PrampH			;0x05
VmaxL			;0x06				;Velocidade maxima
VmaxH			;0x07
VminL			;0x08				;Velocidade minima
VminH			;0x09
VincL			;0x0A				;Incremento de Velocidade
VincH			;0x0B
velatuF			;0x0C				;Velocidade atual (3 byte)
velatuL			;0x0D
velatuH			;0x0E
iMensag			;0x0F				;Numero da proxima mensagem a ser impressa

FLGpis			;0x13				;Flag do pistao
	AntecipOk 		;7				;Indica que ja passou pela posição de antecipação
	ImpressOk 		;6				;Indica que a posição atual é uma Posição de impressão
FmaxL			;0x14				;Velocidade limite superior, constante do sistema
FmaxH			;0x15
FminL			;0x16				;Velocidade limite inferior, constante do sistema
FminH			;0x17
tmpsysL			;0x18				;Contador do tempo do sistema
tmpsysH			;0x19
ndivL			;0x1A				;Novo divisor do contador para o comparador A
ndivH			;0x1B
cntprtL			;0x1C				;Contador da Largura do sinal de impressao
cntprtH			;0x1D
PindeL			;0x1E				;Posicao do zero index
PindeH			;0x1F
prtL			;0x20
prtH			;0x21
SobraIntTmpL	;0x22				;Menor tempo de sobra da rotina intTmp
SobraIntTmpH	;0x23				;Menor tempo de sobra da rotina intTmp

FlgSdoor		;0x26				;Filtro do sensor de porta
NUMmenA			;0x27				;Ultimo valor do numero de mensagem a ser impressa
nummen			;0x28				;Numero de mensagem a ser impressa
Vmotor			;0x29				;Valor do divisor do motor
masceL			;0x2A				;Mascara de erro byte low
	eSinStaV 		;0 				;Sinal de start, velocidade
	eSinStaO 		;1				;Sinal de start/outro
	eSinIndx2		;2				;Sinal do zero index
	eSinIndx3		;3				;Sinal do zero index
	eSinImpr 		;4				;Sinal de impressao
	eSerCom1 		;5				;Erro na com1  (Valido somente com o include "..\BIBN\CODEBOX8.bib")
	eMudPar			;6 				;Mudanca de parametros no instante errado

masceH			;0x2B				;byte high
	eRunTime		;0				;Erro de RunTimer da rotina inttmp
	ePortaBerta		;2				;Erro de porta aberta

cntstaL			;0x2C				;Contador da do sinal do start externo
cntstaH			;0x2D
cntautL			;0x2E				;Contador do sinal do start automatico
cntautH			;0x2F
PORTCX			;0x30
PORTCY			;0x31

StatusL			;0x32				;Flag de status
	ReferenciaOk	;0				;Referenciado
	PosExecutada	;1				;Posicao Executada (Só esta como variavel no .include "..\BIBN\serial38.bib")
	Referenciando	;2				;Referenciando
	sttDirPos		;3				;Direcao do movimento
	sttAceler		;4				;Aceleracao ligada
	sttDesacel		;5				;Desaceleracao ligada;
	sttErro			;7				;Indicacao de erro

StatusH			;0x33				;Flag de status
ErroSys 		;0x34				;Byte com o cod. de erro
tstindL			;0x36				;So'para teste do zero index ???###???
tstindH			;0x37				;So'para teste do zero index ???###???

flagZ			;0x39				;Flags do sinal do zero index
tmpintL			;0x3A				;So'para teste de overrun da interrupcao ???###???
tmpintH			;0x3B				;So'para teste de overrun da interrupcao ???###???

FlgStaX			;0x3C				;Flags do sinal do start externo
	FlgStaX			;7				;Valor do sinal de start anterior
	FlgStaX			;4				;Indica que o start foi entre eixos
	FlgStaX			;3,2,1,0		;Contador de leitura do start

FlgStaY			;0x3D				;Flags do sinal do start do eixo Y
	FlgStaY			;0,1,2,3,7 		;igual a flags
	FlgStaY			;4				;Sinal de start entre eixo
	FlgStaY			;5				;Indica saida de start entre eixo em andamento
	FlgStaY			;6				;Indica que a saida do start entre eixo e' esterno

;************************************************************************
;			Parametros do programa (Index Z)		*
;************************************************************************
posiniL			;0x00				;Posicao inicial programada
posiniH			;0x01			
posfimL			;0x02				;Posicao final programada
posfimH 		;0x03							
AavanL			;0x04				;Aceleracao de avanco programada
AavanH			;0x05			
AretoL			;0x06				;Aceleracao de retorno programada
AretoH			;0x07			
VavanL			;0x08				;Velocidade de avanco programada
VavanH			;0x09			
VretoL			;0x0A				;Velocidade de retorno programada
VretoH			;0x0B			
nMenAv			;0x0C				;Numero de mensagem no avanco
nMenRt			;0x0D				;Numero de mensagem no retorno
pPrtAvL			;0x0E				;posicao da primeira impressao no avanco
pPrtAvH			;0x0F			
pPrtRtL			;0x10				;posicao da primeira impressao no retorno
pPrtRtH			;0x11			
UprtAVL			;0x12				;Posicao da ultima mensagem no avanco
UprtAVH			;0x13			
UprtRTL			;0x14				;Posicao da ultima mensagem no retorno
UprtRTH			;0x15			
tmpprtL			;0x16				;Largura do sinal de impressao
tmpprtH			;0x17			
tmpautL			;0x18				;Tempo para o start automatico
tmpautH			;0x19			
tmpextL			;0x1A				;Tempo para o start externo
tmpextH			;0x1B			
AntcinL			;0x1C				;Cota de antecipacao do start entre eixos (pinelmatico)
AntcinH			;0x1D			
TempPPL			;0x1E				;Retardo para o start automatico passo a passo
TempPPH			;0x1F			
			
FLAGPL			;0x20				;Flag de configuracao da programacao
	STAUTA			;0				;Start automatico no avanco ligado
	STAUTR			;1				;Start automatico no retorno ligado
	SSAUTA			;2				;Saida de start no avanco ligado
	SSAUTR			;3				;Saida de start no retorno ligado
	HSEXTE			;4				;Start externo habilitado ??
	LSEXTE			;5				;Logica do start externo ??
	ESENTR			;6				;Entrada de start entre eixo habilitado ??
	STAREF			;7				;Start externo para referenciar habilitado ??
			
FLAGPH			;0x21				;Flag de configuracao da programacao
	LOGIMP			;0				;Logica do sinal de impressao
	LOGREV			;1				;Logica do sinal de reversao
	SELSER			;2				;Selecao de impressao via serial ligada
	REVSER			;3				;Reversao de impressao via serial ligada
	ZERIHP			;4				;Zero Index habilitado p/ protecao
	ZERIHC			;5				;Zero Index habilitado p/ correcao
	REDCOR			;6				;Reducao do nivel de corrente em repouso
	MODPP			;7				;Modo continuo/passo a passo
			
			
TEMPPTL			;0x22				;Retardo para o sinal de impressao
TEMPPTH			;0x23			
Ptaco			;0x24				;Divisor programado do taco
Vago1			;0x25				;Vago
			
JanelaL			;0x26				;(+/-) Tolerancia de Erro do zero index
JanelaH			;0x27			
npulsoL 		;0x28				;Numero de pulsos por volta do motor
npulsoH 		;0x29			
valrefL			;0x2A				;Valor programado da referencia
valrefH			;0x2B			
AreferL			;0x2C				;Aceleracao de referencia
AreferH			;0x2D			
VreferL			;0x2E				;Velocidade de referencia
VreferH			;0x2F			
			
FLAGPE			;0x30				;Flag especial de intertravamento.
	SstaPP			;0				;Saida de start passo a passo ?
	STautPP			;1				;Start automatico passo a passo
	SelPorMul		;2				;Selecao de mensagem por multipla
	SelPorImp		;3				;Selecao de mensagem por impresão
	SelParalela		;4				;Selecao de mensagem pela paralela
	SelMenDecRet	;5				;Selecao de mensagem Decrementado no retorno
			
Pmotor			;0x31				;Divisor programado do motor
			
CTRSER			;0x32				;Controle via serial
	SerStart		;0				;Start serial
	SerStop			;1				;Stop serial
	SerPausa		;2				;Pausa serial
	SerManual		;3				;Modo manual serial
	SerTstImp		;4				;Teste de impressao serial
	SerLeitOkBhs	;5				;Usado na bahia sul, descrito na rotina LEITOK
	SerGrvEpr		;6				;Grava eprom2
			
CtrSerH			;0x33			
	IgnProtPor		;4				;Ignora a proteção da porta
			
			
POSINDEL 		;0x34				;O Programa salva nesta variavel a diferenca
POSINDEH 		;0x35				;entre a saida do fc- e o primeiro giro do zindex
			
FLAGC			;0x36				;Valor anterior da porta C
			
FlagG			;0x37				;Flag de uso geral
	FinalizRef		;0				;Finalizacao da referencia
	ZerIndInv 		;1				;Bit de valor do zero index invalido
	StaAutPe  		;2				;Start automatico pendente
	StaEntEixP		;3				;Start entre eixo pendente
	AcsEprSer 		;5				;Acesso a eprom via serial
	GrvBlkEpr 		;6				;Gravacao de bloco na eprom2 em andamento
	GrvEprAnd 		;7				;Gravacao da eprom2 em andamento
			
CNTPIST			;0x38				;Contador do temporizador do pistao
			
CONFC			;0x39				;Nivel dos sinais de fc-/fc+/ref/zindex
	H/F				;0				; Half or full step
	Nmotor			;1				; Nivel do motor
	Fc+				;2				; Giro do motor
	Dmotor			;3				; Direcao do motor
	CKmotor			;4				; Clock do motor
	FC-				;5				; Inicio de curso
	REF				;6				; Referencia
	Emotor			;7				; Energizacao do motor
			
			
iMenAv			;0x3A				;Numero de mensagem no avanco
iMenRt			;0x3B				;Numero de mensagem no avanco
			
CNTPTL			;0x3C				;Contador do retardo para o sinal de impressao
CNTPTH			;0x3D				;Contador do retardo para o sinal de impressao
			
emg_cnt			;0x3E				;carrega contador do botao de emergencia
CNTBH			;0x3F				;Contador do tempo de pulso da bahia sul

