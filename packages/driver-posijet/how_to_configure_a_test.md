# Como configurar uma infraestrutura de teste unitario tdd em javascript

autor: Flavio V.

As tecnologias usadas serao:
* vscode
* jest
* tdd
* unit test
* node js
* javascript
  

## porque jest

robusto, vem pré-configurado, usado por grandes empresas como facebook.

## como configurar

* instalar *visual code studio* da Microsoft 
* crie o diretorio do projeto e mute para o diretorio do projeto
* no terminal digite `yarn add --dev jest`
* digite no terminal `npm test`, e devera aparecer uma mensagem de erro 
* edite o package.json e na seccao `scripts` adicione o seguinte `"test": "jest"`. Caso ja exista o registro "test", apague-o e substituia pelo texto indicado.
* crie um arquivo de teste basico chamado `exemplo.test.js` e adicione o seguinte conteudo:
  
```javascript 

it('works', () => {
    expect(1).toBe(1)
})
```
* digite novamente no terminal `npm test`, e desta vez o mecanismo de teste ira rodar, porém o teste irá falhar.

* edite o package.json e na seccao `scripts` adicione o `"watch": "jest --watch"`. o segmento ficará mais ou menos assim:

```json
  "scripts": {
    "test": "jest",
    "watch": "jest --watch"
  
```

* acrescente também no package.json a configuracao abaixo. Ela previne que o watcher fique rodando sem parar caso você esteja utilizando o Babel.js.
```
  "jest": {
    "watchPathIgnorePatterns": ["<rootDir>/node_modules/"]
  }
```

* no terminal digite `npm run watch`. 
  
  
Neste momento passará a rodar um mecanismo que ficará varrendo o seu diretorio do projeto e toda vez que um arquivo for alterado (quando voce salvar o arquivo) um novo test será executado automaticamente. Ou seja, você terá os testes rodando sem a necessidade de você solicitar que eles rodem.