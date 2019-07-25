# Biblioteca *CMPP*


## Índice

- [Biblioteca *CMPP*](#biblioteca-cmpp)
  - [Índice](#%C3%ADndice)
  - [Apresentacao](#apresentacao)
    - [Principais características](#principais-caracter%C3%ADsticas)
    - [Qualidade da biblioteca](#qualidade-da-biblioteca)
  - [Informacoes sobre versionamento](#informacoes-sobre-versionamento)
  - [Como instalar](#como-instalar)
    - [Configuração do ambiente](#configura%C3%A7%C3%A3o-do-ambiente)
    - [Download e instalação da Biblioteca *CMPP*](#download-e-instala%C3%A7%C3%A3o-da-biblioteca-cmpp)
    - [Uso da biblioteca](#uso-da-biblioteca)

## Apresentacao

Este modulo funciona como uma camada de abstração para controle de dispositivos *CMPP*s e compatíveis. O design desta biblioteca visa permitir um alto grau de abstração dos detalhes do controle permitindo o programador concentrar-se em aspectos de mais alto nível. Porém funções de baixo nível também podem ser acessadas.


### Principais características

- Transacoes *assíncronas* de pacotes
- Facilidade de se configurar `mapas de memória`*CMPP*
- *Cache* de memoria *CMPP* para evitar comunicação desnecessaria (*configuravel*)
- Simulação de porta serial (*permite emulação dispositivos *CMPP**)

### Qualidade da biblioteca

- Todos os modulos da biblioteca incluem testes unitários, inclusive com simulação de pacotes defeituosos.
- Utilização de [TDD - Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)


## Informacoes sobre versionamento

Esta sendo usado o workflow especial do git chamado [`git flow`](https://datasift.github.io/gitflow/IntroducingGitFlow.html). Este mecanismo de versionamento representa o repositorio em 2 ramos principais: 

1. **Master**: Contem as versao oficiais de lançamento da biblioteca (*versao estável*)
2. **Development**: Que contem as versoes em desenvolvimento da proxima versão oficial da biblioteca (*ou seja, pode conter alguma característica menos estavel*).

Em totos estes ramos ([`branch`](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)) os [`commits`](https://www.git-tower.com/learn/git/commands/git-commit) só devem ser feitos caso todos os testes unitários da biblioteca estejam passando.

Este workflow também conta com outros ramos (*branches*) que podem ser melhor consultados em sua documentação. Uma visão rapida sobre o uso da ferramenta `git flow` pode ser visto [aqui](https://danielkummer.github.io/git-flow-cheatsheet/)


## Como instalar

> ***NOTA:*** *as instrucoes abaixo foram escritas de memoria. Caso voce execute as etapas abaixo podera editar este arquivo para adicionar informacoes que considere relevante e assim auxilar as proximas pessoas que forem seguir as instruções*

O processo de instalação e uso da biblioteca consiste em tres etapas principais: 1. Configuração do ambiente de desenvolvimento, 2. Download da biblioteca e instalação, 3. Uso da biblioteca

### Configuração do ambiente

> ***NOTA:*** *Futuramente um script poderá ser criado para realizar automaticamente os passos abaixo.*

Caso seu ambiente ja esteja configurado, ou seja, se voce ja executou esta etapa ao menos uma vez em seu computador voce pode pular os passos abaixos e ir direto para a proxima etapa.

Abaixo os passos necessarias para configurar o ambiente de desenvolvimento na sua maquina. 

O ambiente de desenvolvimento pode ser instalados em sistemas operacioanais Linux ou Windows. Os passos abaixo assume que a instalação será feita em sistema Windows, exceto caso informado ao contrario.


1. Atualizar Windows PowerShell
   
   a. Va no menu iniciar e digite `powershell` e pressione enter para abrir a linha de comando.

   b. Digite o comando:

   ```powershell

   $PSVersionTable.PSVersion

   ```

   > *Caso a sua versao seja inferior a 5.1 (Major/Minor) realize a atualização do seu *powershell* *

2. Instalar Node.Js, Typescript e Jest:
    
    a. [Instalar o node.js](https://nodejs.org/en/download/)

    b. [Instalar TypeScript](https://www.typescriptlang.org/index.html#download-links)

    A forma mais simples de instalar o typescript é via gerenciador de pacotes do node.js, o `npm`. Digite:

    ```powershell
    
    npm install -g typescript

    ```
    > *Este comando instalara o typescript globalmente na sua maquina*

    c. Instalar Jest    
  

    ```powershell

    npm install --save-dev jest

    ```



3. [Instalar git](https://git-scm.com/download/win)
   

4. [Instalar VSCode](https://code.visualstudio.com/)

    a. Apos fazer download e instalação do VSCode, instale as seguintes extensões:

    > *NOTA*: Estas extensoes adicionam capacidade ao VSCode de trabalhar com o git, typescript, node.js, etc. O jeito mais pratico é instalalas de dentro do VSCode no menu `View`opção `extensions`

    ```

    - TSLint
    - npm
    - npm Intellisense
    - GitLens -- Git supercharged
    - gitignore
    - gitflow
    - Git History
    - ESLint
    - Auto Import

    ```



### Download e instalação da Biblioteca *CMPP*


A Biblioteca *CMPP* deve ser baixada para ser usada com um programa que voce esteja criando e que tenha necessidade de se comunicar com um dispositivo *CMPP*.

As instrucoes abaixo o auxiliam a criar um pequeno projeto que simula o envio das iniciais da frase "Hello World" para um dispositivo *CMPP*, usando a Biblioteca *CMPP*

1. Configuração do projeto:

    a. Crie um diretorio que conterá o seu projeto *Hello Word*, dê a ele o nome que preferir, chamaremos este diretorio para a finalidade deste documento genericamente de `$Projeto`.

    b. Dentro da pasta `$Projeto` crie o diretorio `src\`.

    c. inicie o repositorio digitando `node init` dentro do diretorio `$Projeto`. Ao termin desta etapa voce deverá ter dentro do diretorio `$Projeto` o arquivo package.json.

2. Escreva um simples program hello world:

    a. crie na pasta `$Projeto\src` o arquivo *helloword.ts* contendo:

    ```typescript

    import { transactSync, pacoteDeTransmissao, Direcao, } from '*CMPP*'

    const direcao = Direcao.ENVIO
    const canal = 1
    const comando = 0x60
    const dado = 22344 // representa a uniao dos caracteres 'H' e 'W' iniciais da frase 'Hello World!'
    const p = await pacoteDeTransmissao(direcao, canal, comando, dado)
    console.log(p)


    ``` 

    b. Na tentativa de executar este programa voce devera obter uma mensagem de erro pois a bilioteca *CMPP* nao foi instalada ainda. Estando dentro do diretorio `$Projeto\src`, digite:
    
    ```powershell
    
    tsc helloword.ts

    ```


3. Instalando a Biblioteca *CMPP*

    a. Crie um diretorio chamdo `lib` dentro da pasta  `$Projeto`. Dentro deste novo diretorio digite:

    ```powershell

    git clone https://github.com/fvilante/posijet1/tree/master

    ```

    > *Este comando fara o acesso a internet e a busca da biblioteca*


    b. Mude para o novo diretorio que foi criado contendo o codigo fonte da biblioteca. e digite: 
    
    ```powershell

    npm test

    ```

    > *Este comando devera rodar os testes unitarios em cima do codigo fonte da biblioteca. Caso a instalação esteja em perfeito funcionamento todos os testes deverao passar.*


    c. Instale as dependencias da biblioteca, digite:

    ```powershell

    npm install

    ```

    > *Este comando instalar automaticamente todas as bibliotecas da qual a Biblioteca *CMPP* depende para funcionar*



### Uso da biblioteca

Se voce chegou até esta etapa, voce ja esta com o seu ambiente configurado, tem um projeto HelloWord configurado que usa a Biblioteca *CMPP* para enviar as iniciais da frase "Hello Word" para o dispositivo *CMPP*.

Para rodar o seu programa voce deve mudar para o diretorio `$PROJETO` e digitar: 

```powershell

tsc /src/helloworld.ts

```











