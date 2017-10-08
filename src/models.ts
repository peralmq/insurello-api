import * as moment from 'moment'
const today = () => moment().format('YYYY-MM-DD')

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
export interface EventHistory {
  timestamp: string,
  change: {
    state: {
      from: string,
      to: string,
    },
  }
}
export const EventHistoryBuilder = ({
  fromStorage: (storageEventHistory): EventHistory => {
    return {
      timestamp: storageEventHistory.timestamp,
      change: storageEventHistory.change,
    }
  },
  fromData: ({from, to}): EventHistory => {
    return {
      timestamp: today(),
      change: {
        state: {
          from,
          to,
        },
      }
    }
  }
})
