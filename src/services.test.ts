import 'mocha'
import { expect } from 'chai'

import { Events } from './services'

describe('Services', () => {
  describe('Events', () => {

    before(() => Events.clear())

    it('create', () => {
      expect(Events.create()).to.deep.equal({id: '1', state: 'open'})
    })

    it('index', () => {
      expect(Events.index()).to.deep.equal([{id: '1', state: 'open'}])
    })

    it('show', () => {
      expect(Events.show('1')).to.deep.equal({id: '1', state: 'open'})
    })

    it('update', () => {
      expect(Events.update('1', {state: 'dismissed'})).to.deep.equal({id: '1', state: 'dismissed'})
    })

  })
})
