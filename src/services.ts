import { Event as EventModel, EventBuilder } from './models'
import Storage from './storage'

const EventsService = ({Builder, Storage}) => {
  const storage = Storage()

  return {
    clear: () => storage.truncate(),
    create: (): EventModel => Builder.fromStorage(storage.create(null, {state: 'open'})),
    index: (): [EventModel] => storage.index().map(Builder.fromStorage),
    show: (id: string): EventModel => Builder.fromStorage(storage.show(id)),
    update: (id: string, {state}): EventModel => Builder.fromStorage(storage.update(id, {state}))
  }
}

export const Events = EventsService({Builder: EventBuilder, Storage})
