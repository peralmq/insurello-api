import * as express from 'express'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'

import Router from './routes'

const server: express.Application = express()
server.use(morgan('dev'))
server.use(bodyParser.json())

server.use('/', Router)

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`The TypeScript API is up and running on port ${port}.`))

export default server
