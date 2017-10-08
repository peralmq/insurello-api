import 'mocha'
import { expect } from 'chai'
import Storage from './storage'
import { DuplicateKey } from './errors'

describe('Storage', () => {
  const storage = Storage()
  const key = 'foo'
  const value = {bar: 'baz'}
  const valueWithEmbeddedKey = {_id: key, ...value}

  it('create', () => {
    expect(storage.create(key, value)).to.deep.equal(valueWithEmbeddedKey)
  })

  it('create fails on duplicate key', () => {
    expect(() => storage.create(key, value)).to.throw(DuplicateKey)
  })

  it('index', () => {
    expect(storage.index()).to.deep.equal([valueWithEmbeddedKey])
  })

  it('show', () => {
    expect(storage.show(key)).to.deep.equal(valueWithEmbeddedKey)
  })

  it('update', () => {
    const actual = storage.update(key, {bar: 'qux'})
    expect(actual).to.not.deep.equal(value)
    expect(actual).to.deep.equal({_id: key, bar: 'qux'})
  })

  it('destroy', () => {
    expect(storage.destroy(key)).to.deep.equal({_id: key, bar: 'qux'})
  })

})
