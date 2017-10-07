import 'mocha'
import { expect } from 'chai'
import Storage from './storage'

describe('Storage', () => {
  const storage = Storage()
  const key = 'foo'
  const value = {bar: 'baz'}

  it('create', () => {
    expect(storage.create(key, value)).to.be.undefined
  })

  it('index', () => {
    expect(storage.index()).to.deep.equal([value])
  })

  it('show', () => {
    expect(storage.show(key)).to.equal(value)
  })

  it('update', () => {
    const actual = storage.update(key, {bar: 'qux'})
    expect(actual).to.not.deep.equal(value)
    expect(actual).to.deep.equal({bar: 'qux'})
  })

  it('destroy', () => {
    expect(storage.destroy(key)).to.deep.equal({bar: 'qux'})
  })

})
