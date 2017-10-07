import * as express from 'express'
import { Events as EventService } from './services'

export const Events = {
  create: (req: express.Request, res: express.Response) => {
    const newEvent = EventService.create()
    res.status(201).json(newEvent)
  },
  index: (req: express.Request, res: express.Response) => {
    const events = EventService.index()
    res.status(200).json(events)
  },
  show: (req: express.Request, res: express.Response) => {
    const event = EventService.show(req.params.id)
    res.status(200).json(event)
  },
  update: (req: express.Request, res: express.Response) => {
    const {state} = req.body
    const updatedEvent = EventService.update(req.params.id, {state})
    res.status(200).json(updatedEvent)
  }
}
