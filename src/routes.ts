import * as express from 'express'
import { Events, EventsHistory } from './controllers'

const Router = express.Router()

Router.route('/events')
  .get(Events.index)
  .post(Events.create)

Router.route('/events/:id')
  .get(Events.show)
  .patch(Events.update)

Router.get('/events/:id/history', EventsHistory.show)

Router.all(
    '/',
    (req: express.Request, res: express.Response) => res.send('Hello from the TypeScript world!')
)

export default Router
