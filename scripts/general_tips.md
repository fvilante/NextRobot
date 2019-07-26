
# `Tips & tricks`

> initial author: Flavio

Feel free to update information in this file as necessary.


## `package.json` into each package/dir:

Each package you put into "package/" directory SHOULD have a package.json file with at least 
the following data _(directories, files, typings, publishConfig and main:)_:

```
  "directories": {
    "lib": "lib",
    "test": "__tests__"
  },
  "files": [
    "lib"
  ],
  "private": false,
  "publishConfig": {
    "access": "public"
  }
```

> Without `publishConfig` above the command `lerna publish` will fail to publish in npm (but will give no error). 
`npm publish` will fail with "402 error" message.


Other general information SHOULD be included: 

```
  "name": "@nextrobot/package_name_here",
  "version": "0.0.1-alpha.0",
  "main": "lib/package_name_here.js",
  "description": "> TODO: description",
  "author": "Flavio Vilante <fvilante1@gmail.com>",
  "homepage": "",
  "license": "ISC",

```


## Lerna commands:

lerna run <script_name> // enter each package and runs respective package.json's script
lerna bootstrap // runs npm install on each package
lerna clean // deletes modules from each package

## Lerna considerations:

- Lerna has a main package.json. The main dependencies are "assumed" true to each package


## Lerna and NPM 

- you need to create an account and a organization in www.npmjs.com
- in must have your systen prompt logged in npmjs. Type 'npm login' and insert user and password


## Lerna Typescript considerations: 

Typescript is a compiler, each package has a tsconfig.json
The main lerna directory has the main tsconfig.json that CAN be extended by each package like this:

