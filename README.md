# TypeScript tech stack
Stack based on
* [Node.js v8.0](https://nodejs.org/dist/latest-v8.x/docs/api/) - a JavaScript runtime that you can run on the server side
* [TypeScript](https://www.typescriptlang.org) - a version of JavaScript with static types.
* [Express](https://expressjs.com/) - a micro web framework for Node.js (and TypeScript)
* [Yarn](https://yarnpkg.com) - Node.js package and dependency management

## Usage
```
❯ curl -X POST localhost:3000/events
{"id":"1","state":"open"}%
❯ curl localhost:3000/events/1
{"id":"1","state":"open"}
curl -X PATCH localhost:3000/events/1 -H 'Content-Type: application/json' -d '{"state": "closed"}'
{"id":"1","state":"closed"}
❯ curl localhost:3000/events/1/history
[{"timestamp":"2017-10-01","change":{"state":{"from":null,"to":"open"}}},{"timestamp":"2017-10-01","change":{"state":{"from":"open","to":"closed"}}}]
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
