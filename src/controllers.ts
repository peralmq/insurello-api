import * as express from 'express'
import { NotFound, BadState } from './errors'
import { Events as EventService, EventsHistory as EventsHistoryService } from './services'

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
    try {
      const event = EventService.show(req.params.id)
        res.status(200).json(event)
    } catch (NotFound) {
      return res.status(404).end()
    }
  },
  update: (req: express.Request, res: express.Response) => {
    if (!req.is('json')) {
      return res.status(400).end()
    }

    const {state} = req.body
    try {
      const updatedEvent = EventService.update(req.params.id, state)
      res.status(200).json(updatedEvent)
    } catch (BadState) {
      return res.status(400).end()
    }
  }
}

export const EventsHistory = {
  show: (req: express.Request, res: express.Response) => {
    try {
      const eventHistory = EventsHistoryService.show(req.params.id)
      res.status(200).json(eventHistory)
    } catch (NotFound) {
      return res.status(404).end()
    }
  }
}
