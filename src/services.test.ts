import 'mocha'
import { expect } from 'chai'

import { BadState } from './errors'
import { Events, EventsHistory } from './services'

describe('Services', () => {
  describe('Events', () => {

    before(() => {
      Events.clear()
      EventsHistory.clear()
    })

    it('create', () => {
      expect(Events.create()).to.deep.equal({id: '1', state: 'open'})
      expect(EventsHistory.show('1')).to.deep.equal([
        {timestamp: '2017-10-01', change: {state: {from: null, to: 'open'}}}
      ])
    })

    it('index', () => {
      expect(Events.index()).to.deep.equal([{id: '1', state: 'open'}])
    })

    it('show', () => {
      expect(Events.show('1')).to.deep.equal({id: '1', state: 'open'})
    })

    it('update', () => {
      expect(Events.update('1', 'dismissed')).to.deep.equal({id: '1', state: 'dismissed'})
      expect(EventsHistory.show('1')).to.deep.equal([
        {timestamp: '2017-10-01', change: {state: {from: null, to: 'open'}}},
        {timestamp: '2017-10-01', change: {state: {from: 'open', to: 'dismissed'}}}
      ])
    })

    it('update with bad state throws', () => {
      expect(() => Events.update('1', 'a bad state')).to.throw(BadState)
    })

  })

  describe('EventsHistory', () => {

    it('add', () => {
      expect(EventsHistory.add('2', null, 'open')).to.deep.equal(
        {timestamp: '2017-10-01', change: {state: {from: null, to: 'open'}}}
      )
    })

    it('show', () => {
      EventsHistory.add('3', null, 'open')
      EventsHistory.add('3', 'open', 'dismissed')
      EventsHistory.add('3', 'dismissed', 'reopened')
      EventsHistory.add('3', 'reopened', 'closed')
      expect(EventsHistory.show('3')).to.deep.equal([
        {timestamp: '2017-10-01', change: {state: {from: null, to: 'open'}}},
        {timestamp: '2017-10-01', change: {state: {from: 'open', to: 'dismissed'}}},
        {timestamp: '2017-10-01', change: {state: {from: 'dismissed', to: 'reopened'}}},
        {timestamp: '2017-10-01', change: {state: {from: 'reopened', to: 'closed'}}},
      ])
    })

  })
})
