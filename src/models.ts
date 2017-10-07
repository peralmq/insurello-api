export interface Event {
  id: string,
  state: string,
}
export const EventBuilder = ({
  fromStorage: (storageEvent): Event => ({
    id: storageEvent._id,
    state: storageEvent.state,
  })
})
