

Nota> Help this file to improved. Update it with more updated and datailed infomation.

= How to configure enviroment

- Install Windows Powershell 5.1 or higher on your machine.
Follow this link to do that and come back to this tutorial. [Link](https://docs.microsoft.com/pt-br/skypeforbusiness/set-up-your-computer-for-windows-powershell/download-and-install-windows-powershell-5-1)

- Install:

-- NodeJS

Install NodeJS on your operational system: (link)[https://nodejs.org/en/]


-- git
install git on your operational system. (link)[https://git-scm.com/]


-- vscode
note: if you want to automatic configure all plugins install: "Settings Sync"


- install chocolatey
Chocolatey é um gerenciador de pacotes, semelhante ao "google store" do android
https://chocolatey.org/install


- install: posh-git from github (optional)

Nota: Talvez para instalar usando o chocolatey seja necessario fechar e abrir um novo terminal no modo administrador.

this programs configure powershell prompt to works together with git
https://github.com/dahlbyk/posh-git


- Install ZLocation

Powershell tool to change directory easily

- Intall notepad++:

it is a improved notepad. Useful for edit lonely files (it's faster than VSCode which is better to edit whole projects).

https://notepad-plus-plus.org/download/v7.7.1.html

Note: Maybe necessary to add installation dir of notepad++.exe manually into path variable


https://www.powershellgallery.com/packages/ZLocation/1.2.0


- Instale o Firefox (ou navegador de sua preferencia)


= Configurando repositorio local:


- Clone repository

git clone https://github.com/fvilante/NextRobot.git

- Clone branch

-instalar Lerna globally:

npm install -g lerna

- install Jest globally:

npm install -g jest

- install ts-node globally: 

npm install ts-node


-bootstrap do lerna:
```
cd \NextRobot
lerna bootstrap
lerna link
```





