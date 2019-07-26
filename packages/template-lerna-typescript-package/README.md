
> TODO: Substitute this readme file content to your package description

# `Lerna Typescript Package Template`

author: Flavio

This template is used to create new lerna package pre-configured with typescript and other things. 

## How to install

- open terminal
- change dir to your `packages/` directory inside your lerna project
- copy the template from github repository at address bellow:

`https://github.com/fvilante/NextRobot/tree/develop/packages/template-lerna-typescript-package`

- don't forget to overwrite this readme file with your package info.

## What is pre-configured

- typescript (full and strict static checking)
- gitignore (for ignore vscode, lerna, etc)
- jest
- initial sample src/index.ts and its corresponding test file

## How to set-up your package

1. Define name and version for your package's package.json. Example:

```
  "name": "@nextbot/template-lerna-typescript-package",
  "version": "0.0.3-alpha.0",
```

Note: Don't forget to put the npm organization name, in this case `@nextbot`

2. Put your source code into `/src` directory, and your tests into `/src/__test__`

## Notes: 

> Source files: You can create sub-directories in `/src`. 

> TestFiles: Put all your tests files in a sub-folder (relative to the file which is in test). 
Name de test sub-folder as `__test__`

See template /src and /src/__test__ folder for an example of this.


