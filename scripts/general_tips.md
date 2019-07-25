
*author: Flavio*

## Lerna commands:

lerna run <script_name> // enter each package and runs respective package.json's script
lerna bootstrap // runs npm install on each package
lerna clean // deletes modules from each package

=Lerna considerations:

- Lerna has a main package.json. The main dependencies are "assumed" true to each package


## Lerna and NPM 

- you need to create an account and a organization in www.npmjs.com
- in must have your systen prompt logged in npmjs. Type 'npm login' and insert user and password


## Lerna Typescript considerations: 

Typescript is a compiler, each package has a tsconfig.json
The main lerna directory has the main tsconfig.json that CAN be extended by each package like this:

