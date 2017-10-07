import 'mocha'
import { expect } from 'chai'
import * as supertest from 'supertest'
import server from './server'

describe('Insurello API', () => {
  it('GET /', (done) => {
    supertest(server)
    .get('/')
    .expect(200)
    .expect(res => expect(res.text).to.equal('Hello from the TypeScript world!'))
    .end(done)
  })
})
