import * as express from 'express'
import * as morgan from 'morgan'
// import Storage from './storage'

const server: express.Application = express()
server.use(morgan('dev'))

server.all(
    '/',
    (req: express.Request, res: express.Response) => res.send('Hello from the TypeScript world!')
)

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Express is up and running.`))

export default server
