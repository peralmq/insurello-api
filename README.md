# TypeScript tech stack
Stack based on
* [Node.js v8.0](https://nodejs.org/dist/latest-v8.x/docs/api/) - a JavaScript runtime that you can run on the server side
* [TypeScript](https://www.typescriptlang.org) - a version of JavaScript with static types.
* [Express](https://expressjs.com/) - a micro web framework for Node.js (and TypeScript)
* [Yarn](https://yarnpkg.com) - Node.js package and dependency management

## Usage
```
> curl localhost:9003
Hello from the TypeScript world!
```

## Local development
```
npm install -g yarn
yarn install
yarn start
```

### Tests
```
yarn test
```

## Other

### tsc
The TypeScript to JavaScript compiler, [see details](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

### `tsconfig.json`
Specifies the root files and compiler options for the TypeScript compiler, [see details](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
