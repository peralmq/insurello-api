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

## Structure

### `src/server.js` 
Web server and main entry point
### `src/routes.js`
Path based routing between server and controllers. I.e. requests to`GET /events/:id` are routed to `controllers.Events.show`
### `src/controllers.js`
HTTP <-> Business logic communication.
### `src/services.js`
Business logic and glue between other services. Uses dependency injection and tries to keep each service isolated from others to ease breaking out individual services to web services in the future
### `src/models.js`
Business logic models and converters between controller and storage objects.
### `src/storage.js`
Persistance layer. For now in-memory but due to it's clear interface a rewrite in to a database connector should be easy.
### `src/errors.js`
Defines error function that are global to the stack.

## Local development
```
npm install -g yarn
yarn install
yarn start
```

### Tests
Test files lives beside implementation files but has the file name ending `*.test.ts`
```
yarn test
```

## Other

### tsc
The TypeScript to JavaScript compiler, [see details](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

### `tsconfig.json`
Specifies the root files and compiler options for the TypeScript compiler, [see details](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
