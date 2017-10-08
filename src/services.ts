import {
  Event as EventModel,
  EventBuilder,
  EventHistory as EventHistoryModel,
  EventHistoryBuilder
} from './models'
import Storage from './storage'
import { BadState } from './errors'

const EventsService = ({Builder, Storage}) => {
  const storage = Storage()

  return {
    clear: () => storage.truncate(),
    create: (): EventModel => {
      const newEvent = Builder.fromStorage(storage.create(null, {state: 'open'}))
      EventsHistory.add(newEvent.id, null, 'open')
      return newEvent
    },
    index: (): [EventModel] => storage.index().map(Builder.fromStorage),
    show: (id: string): EventModel => Builder.fromStorage(storage.show(id)),
    update: (id: string, state): EventModel => {
      if (!/open|dismissed|closed|reopened/.test(state)) {
        throw new BadState(state)
      }
      const oldEvent = storage.show(id)
      EventsHistory.add(id, oldEvent.state, state)
      return Builder.fromStorage(storage.update(id, {state}))
    }
  }
}

const EventsHistoryService = ({Builder, Storage}) => {
  const storage = Storage()

  return {
    clear: () => storage.truncate(),
    add: (id: string, from: string, to: string): EventHistoryModel => {
      var result = storage.show(id)
      var history
      if (!result) {
        history = []
        storage.create(id, [])
      } else {
        history = result.history
      }
      const newHistory = Builder.fromData({from, to})
      history.push(newHistory)
      storage.update(id, {history})
      return newHistory
    },
    show: (id: string): [EventHistoryModel] => {
      const { history } = storage.show(id)
      return history.map(Builder.fromStorage)
    },
  }
}

export const Events = EventsService({Builder: EventBuilder, Storage})
export const EventsHistory = EventsHistoryService({Builder: EventHistoryBuilder, Storage})
