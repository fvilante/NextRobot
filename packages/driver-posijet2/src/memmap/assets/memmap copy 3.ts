
type PointerMap = typeof PointerMap

type A = PointerMap[keyof PointerMap]

const PointerMap = {


	'PatuaL':			{ addr: 0x00, bitSize: 8 },				//Posicao atual
	'PatuaH':			{ addr: 0x01, bitSize: 8 },
	'PexecL':			{ addr: 0x02, bitSize: 8 },				//Posicao de execucao
	'PexecH':			{ addr: 0x03, bitSize: 8 },
	'PrampL':			{ addr: 0x04, bitSize: 8 },				//Posicao do inicio da rampa
	'PrampH':			{ addr: 0x05, bitSize: 8 },
	'VmaxL':			{ addr: 0x06, bitSize: 8 },				//Velocidade maxima
	'VmaxH':			{ addr: 0x07, bitSize: 8 },
	'VminL':			{ addr: 0x08, bitSize: 8 },				//Velocidade minima
	'VminH':			{ addr: 0x09, bitSize: 8 },
	'VincL':			{ addr: 0x0A, bitSize: 8 },				//Incremento de Velocidade
	'VincH':			{ addr: 0x0B, bitSize: 8 },
	'velatuF':			{ addr: 0x0C, bitSize: 8 },				//Velocidade atual (3 byte)
	'velatuL':			{ addr: 0x0D, bitSize: 8 },
	'velatuH':			{ addr: 0x0E, bitSize: 8 },
	'iMensag':			{ addr: 0x0F, bitSize: 8 },				//Numero da proxima mensagem a ser impressa
	
	'FLGpis':			{ addr: 0x13, bitSize: 8,				//Flag do pistao
		detail: {
			'AntecipOk':		7,				//Indica que ja passou pela posição de antecipação
			'ImpressOk':		6,				//Indica que a posição atual é uma Posição de impressão
		},
	},

	'FmaxL':			{ addr: 0x14, bitSize: 8},				//Velocidade limite superior, constante do sistema
	'FmaxH':			{ addr: 0x15, bitSize: 8},
	'FminL':			{ addr: 0x16, bitSize: 8},				//Velocidade limite inferior, constante do sistema
	'FminH':			{ addr: 0x17, bitSize: 8},
	'tmpsysL':			{ addr: 0x18, bitSize: 8},				//Contador do tempo do sistema
	'tmpsysH':			{ addr: 0x19, bitSize: 8},
	'ndivL':			{ addr: 0x1A, bitSize: 8},				//Novo divisor do contador para o comparador A
	'ndivH':			{ addr: 0x1B, bitSize: 8},
	'cntprtL':			{ addr: 0x1C, bitSize: 8},				//Contador da Largura do sinal de impressao
	'cntprtH':			{ addr: 0x1D, bitSize: 8},
	'PindeL':			{ addr: 0x1E, bitSize: 8},				//Posicao do zero index
	'PindeH':			{ addr: 0x1F, bitSize: 8},
	'prtL':				{ addr: 0x20, bitSize: 8},
	'prtH':				{ addr: 0x21, bitSize: 8},
	'SobraIntTmpL':		{ addr: 0x22, bitSize: 8},				//Menor tempo de sobra da rotina intTmp
	'SobraIntTmpH':		{ addr: 0x23, bitSize: 8},				//Menor tempo de sobra da rotina intTmp
	'FlgSdoor':			{ addr: 0x26, bitSize: 8},				//Filtro do sensor de porta
	'NUMmenA':			{ addr: 0x27, bitSize: 8},				//Ultimo valor do numero de mensagem a ser impressa
	'nummen':			{ addr: 0x28, bitSize: 8},				//Numero de mensagem a ser impressa
	'Vmotor':			{ addr: 0x29, bitSize: 8},				//Valor do divisor do motor
	'masceL':			{ addr: 0x2A, bitSize: 8,				//Mascara de erro byte low
		detail: {
			'eSinStaV': 		0, 				//Sinal de start, velocidade
			'eSinStaO': 		1,				//Sinal de start/outro
			'eSinIndx2':		2,				//Sinal do zero index
			'eSinIndx3':		3,				//Sinal do zero index
			'eSinImpr': 		4,				//Sinal de impressao
			'eSerCom1': 		5,				//Erro na com1  (Valido somente com o include "..\BIBN\CODEBOX8.bib")
			'eMudPar':			6, 				//Mudanca de parametros no instante errado
		},
	},

	'masceH':			{ addr: 0x2B, bitSize: 8,				//byte high
		detail: {
			'eRunTime':			0,				//Erro de RunTimer da rotina inttmp
			'ePortaBerta':		2,				//Erro de porta aberta
		},
	},

	'cntstaL':			{ addr: 0x2C, bitSize: 8},				//Contador da do sinal do start externo
	'cntstaH':			{ addr: 0x2D, bitSize: 8},
	'cntautL':			{ addr: 0x2E, bitSize: 8},				//Contador do sinal do start automatico
	'cntautH':			{ addr: 0x2F, bitSize: 8},
	'PORTCX':			{ addr: 0x30, bitSize: 8},
	'PORTCY':			{ addr: 0x31, bitSize: 8},
	
	'StatusL':			{ addr: 0x32, bitSize: 8,				//Flag de status
		detail: {
			'ReferenciaOk':		0,				//Referenciado
			'PosExecutada':		1,				//Posicao Executada (Só esta como variavel no .include "..\BIBN\serial38.bib")
			'Referenciando':	2,				//Referenciando
			'sttDirPos':		3,				//Direcao do movimento
			'sttAceler':		4,				//Aceleracao ligada
			'sttDesacel':		5,				//Desaceleracao ligada//
			'sttErro':			7,				//Indicacao de erro
		},
	},

	'StatusH':			{ addr: 0x33, bitSize: 8},				//Flag de status
	'ErroSys': 			{ addr: 0x34, bitSize: 8},				//Byte com o cod. de erro
	'tstindL':			{ addr: 0x36, bitSize: 8},				//So'para teste do zero index ???###???
	'tstindH':			{ addr: 0x37, bitSize: 8},				//So'para teste do zero index ???###???
	
	'flagZ':			{ addr: 0x39, bitSize: 8},				//Flags do sinal do zero index
	'tmpintL':			{ addr: 0x3A, bitSize: 8},				//So'para teste de overrun da interrupcao ???###???
	'tmpintH':			{ addr: 0x3B, bitSize: 8},				//So'para teste de overrun da interrupcao ???###???
	
	'FlgStaX':			{ addr: 0x3C, bitSize: 8,				//Flags do sinal do start externo
		detail: {
			'D7':				7,				//Valor do sinal de start anterior
			'D4':				4,				//Indica que o start foi entre eixos
			'D0-3':				[3,2,1,0],		//Contador de leitura do start
		},
	},

	'FlgStaY':			{ addr: 0x3D, bitSize: 8,				//Flags do sinal do start do eixo Y
		detail: {
			'D0-3;7':			[0,1,2,3,7], 	//igual a flags
			'D4':				4,				//Sinal de start entre eixo
			'D5':				5,				//Indica saida de start entre eixo em andamento
			'D6':				6,				//Indica que a saida do start entre eixo e' esterno
		},
	},
	
	'posiniL':			{ addr: 0x00, bitSize: 8},				//Posicao inicial programada
	'posiniH':			{ addr: 0x01, bitSize: 8},			
	'posfimL':			{ addr: 0x02, bitSize: 8},				//Posicao final programada
	'posfimH': 			{ addr: 0x03, bitSize: 8},							
	'AavanL':			{ addr: 0x04, bitSize: 8},				//Aceleracao de avanco programada
	'AavanH':			{ addr: 0x05, bitSize: 8},			
	'AretoL':			{ addr: 0x06, bitSize: 8},				//Aceleracao de retorno programada
	'AretoH':			{ addr: 0x07, bitSize: 8},			
	'VavanL':			{ addr: 0x08, bitSize: 8},				//Velocidade de avanco programada
	'VavanH':			{ addr: 0x09, bitSize: 8},			
	'VretoL':			{ addr: 0x0A, bitSize: 8},				//Velocidade de retorno programada
	'VretoH':			{ addr: 0x0B, bitSize: 8},			
	'nMenAv':			{ addr: 0x0C, bitSize: 8},				//Numero de mensagem no avanco
	'nMenRt':			{ addr: 0x0D, bitSize: 8},				//Numero de mensagem no retorno
	'pPrtAvL':			{ addr: 0x0E, bitSize: 8},				//posicao da primeira impressao no avanco
	'pPrtAvH':			{ addr: 0x0F, bitSize: 8},			
	'pPrtRtL':			{ addr: 0x10, bitSize: 8},				//posicao da primeira impressao no retorno
	'pPrtRtH':			{ addr: 0x11, bitSize: 8},			
	'UprtAVL':			{ addr: 0x12, bitSize: 8},				//Posicao da ultima mensagem no avanco
	'UprtAVH':			{ addr: 0x13, bitSize: 8},			
	'UprtRTL':			{ addr: 0x14, bitSize: 8},				//Posicao da ultima mensagem no retorno
	'UprtRTH':			{ addr: 0x15, bitSize: 8},			
	'tmpprtL':			{ addr: 0x16, bitSize: 8},				//Largura do sinal de impressao
	'tmpprtH':			{ addr: 0x17, bitSize: 8},			
	'tmpautL':			{ addr: 0x18, bitSize: 8},				//Tempo para o start automatico
	'tmpautH':			{ addr: 0x19, bitSize: 8},			
	'tmpextL':			{ addr: 0x1A, bitSize: 8},				//Tempo para o start externo
	'tmpextH':			{ addr: 0x1B, bitSize: 8},			
	'AntcinL':			{ addr: 0x1C, bitSize: 8},				//Cota de antecipacao do start entre eixos (pinelmatico)
	'AntcinH':			{ addr: 0x1D, bitSize: 8},			
	'TempPPL':			{ addr: 0x1E, bitSize: 8},				//Retardo para o start automatico passo a passo
	'TempPPH':			{ addr: 0x1F, bitSize: 8},			
				
	'FLAGPL':			{ addr: 0x20, bitSize: 8,				//Flag de configuracao da programacao
		detail: {
			'STAUTA':			0,				//Start automatico no avanco ligado
			'STAUTR':			1,				//Start automatico no retorno ligado
			'SSAUTA':			2,				//Saida de start no avanco ligado
			'SSAUTR':			3,				//Saida de start no retorno ligado
			'HSEXTE':			4,				//Start externo habilitado ??
			'LSEXTE':			5,				//Logica do start externo ??
			'ESENTR':			6,				//Entrada de start entre eixo habilitado ??
			'STAREF':			7,				//Start externo para referenciar habilitado ??
		},
	},

	'FLAGPH':			{ addr: 0x21, bitSize: 8,				//Flag de configuracao da programacao
		detail: {
			'LOGIMP':			0,				//Logica do sinal de impressao
			'LOGREV':			1,				//Logica do sinal de reversao
			'SELSER':			2,				//Selecao de impressao via serial ligada
			'REVSER':			3,				//Reversao de impressao via serial ligada
			'ZERIHP':			4,				//Zero Index habilitado p/ protecao
			'ZERIHC':			5,				//Zero Index habilitado p/ correcao
			'REDCOR':			6,				//Reducao do nivel de corrente em repouso
			'MODPP':			7,				//Modo continuo/passo a passo
		},
	},
				
	'TEMPPTL':			{ addr: 0x22, bitSize: 8},				//Retardo para o sinal de impressao
	'TEMPPTH':			{ addr: 0x23, bitSize: 8},			
	'Ptaco':			{ addr: 0x24, bitSize: 8},				//Divisor programado do taco
	'Vago1':			{ addr: 0x25, bitSize: 8},				//Vago
				
	'JanelaL':			{ addr: 0x26, bitSize: 8},				//(+/-) Tolerancia de Erro do zero index
	'JanelaH':			{ addr: 0x27, bitSize: 8},			
	'npulsoL': 			{ addr: 0x28, bitSize: 8},				//Numero de pulsos por volta do motor
	'npulsoH': 			{ addr: 0x29, bitSize: 8},			
	'valrefL':			{ addr: 0x2A, bitSize: 8},				//Valor programado da referencia
	'valrefH':			{ addr: 0x2B, bitSize: 8},			
	'AreferL':			{ addr: 0x2C, bitSize: 8},				//Aceleracao de referencia
	'AreferH':			{ addr: 0x2D, bitSize: 8},			
	'VreferL':			{ addr: 0x2E, bitSize: 8},				//Velocidade de referencia
	'VreferH':			{ addr: 0x2F, bitSize: 8},			
				
	'FLAGPE':			{ addr: 0x30, bitSize: 8,				//Flag especial de intertravamento.
		detail: {
			'SstaPP':			0,				//Saida de start passo a passo ?
			'STautPP':			1,				//Start automatico passo a passo
			'SelPorMul':		2,				//Selecao de mensagem por multipla
			'SelPorImp':		3,				//Selecao de mensagem por impresão
			'SelParalela':		4,				//Selecao de mensagem pela paralela
			'SelMenDecRet':		5,				//Selecao de mensagem Decrementado no retorno
		},
	},

	'Pmotor':			{ addr: 0x31, bitSize: 8},				//Divisor programado do motor
				
	'CTRSER':			{ addr: 0x32, bitSize: 8,				//Controle via serial
		detail: {
			'SerStart':			0,				//Start serial
			'SerStop':			1,				//Stop serial
			'SerPausa':			2,				//Pausa serial
			'SerManual':		3,				//Modo manual serial
			'SerTstImp':		4,				//Teste de impressao serial
			'SerLeitOkBhs':		5,				//Usado na bahia sul, descrito na rotina LEITOK
			'SerGrvEpr':		6,				//Grava eprom2
		},
	},

	'CtrSerH':			{ addr: 0x33, bitSize: 8,			
		detail: {
			'IgnProtPor':		4,				//Ignora a proteção da porta
		},
	},
				
	'POSINDEL': 		{ addr: 0x34, bitSize: 8},				//O Programa salva nesta variavel a diferenca
	'POSINDEH': 		{ addr: 0x35, bitSize: 8},				//entre a saida do fc- e o primeiro giro do zindex
				
	'FLAGC':			{ addr: 0x36, bitSize: 8},				//Valor anterior da porta C
				
	'FlagG':			{ addr: 0x37, bitSize: 8,				//Flag de uso geral
		detail: {
			'FinalizRef':		0,				//Finalizacao da referencia
			'ZerIndInv': 		1,				//Bit de valor do zero index invalido
			'StaAutPe':  		2,				//Start automatico pendente
			'StaEntEixP':		3,				//Start entre eixo pendente
			'AcsEprSer': 		5,				//Acesso a eprom via serial
			'GrvBlkEpr': 		6,				//Gravacao de bloco na eprom2 em andamento
			'GrvEprAnd': 		7,				//Gravacao da eprom2 em andamento
		},
	},

	'CNTPIST':			{ addr: 0x38, bitSize: 8},				//Contador do temporizador do pistao
				
	'CONFC':			{ addr: 0x39, bitSize: 8,				//Nivel dos sinais de fc-/fc+/ref/zindex
		detail: {
			'H/F':				0,				// Half or full step
			'Nmotor':			1,				// Nivel do motor
			'Fc+':				2,				// Giro do motor
			'Dmotor':			3,				// Direcao do motor
			'CKmotor':			4,				// Clock do motor
			'FC-':				5,				// Inicio de curso
			'REF':				6,				// Referencia
			'Emotor':			7,				// Energizacao do motor
		},
	},
				
	'iMenAv':			{ addr: 0x3A, bitSize: 8},				//Numero de mensagem no avanco
	'iMenRt':			{ addr: 0x3B, bitSize: 8},				//Numero de mensagem no avanco
				
	'CNTPTL':			{ addr: 0x3C, bitSize: 8},				//Contador do retardo para o sinal de impressao
	'CNTPTH':			{ addr: 0x3D, bitSize: 8},				//Contador do retardo para o sinal de impressao
				
	'emg_cnt':			{ addr: 0x3E, bitSize: 8},				//carrega contador do botao de emergencia
	'CNTBH':			{ addr: 0x3F, bitSize: 8},				//Contador do tempo de pulso da bahia sul




} as const
	


