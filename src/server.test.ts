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

  describe('POST /events', () => {

    it('should create a new event', (done) => {
      supertest(server)
      .post('/events')
      .type('json')
      .expect(201)
      .expect(res => {
        expect(res.body).to.deep.equal({id: '1', state: 'open'})
      })
      .end(done)
    })

  })

  describe('GET /events', () => {

    it('should create a new event', (done) => {
      supertest(server)
      .get('/events')
      .type('json')
      .expect(200)
      .expect(res => {
        expect(res.body).to.deep.equal([{id: '1', state: 'open'}])
      })
      .end(done)
    })

  })

  describe('GET /events/:id', () => {

    it('should show an event', (done) => {
      supertest(server)
      .get('/events/1')
      .type('json')
      .expect(200)
      .expect(res => {
        expect(res.body).to.deep.equal({id: '1', state: 'open'})
      })
      .end(done)
    })

  })

  describe('PATCH /events/:id', () => {

    it('should update an event', (done) => {
      supertest(server)
      .patch('/events/1')
      .type('json')
      .send({state: 'closed'})
      .expect(200)
      .expect(res => {
        expect(res.body).to.deep.equal({id: '1', state: 'closed'})
      })
      .end(done)
    })

    it('should fail on bad Content-Type', (done) => {
      supertest(server)
      .patch('/events/1')
      .type('form')
      .send({state: 'closed'})
      .expect(400)
      .end(done)
    })

    it('should fail on bad body', (done) => {
      supertest(server)
      .patch('/events/1')
      .type('json')
      .send()
      .expect(400)
      .end(done)
    })

  })

  describe('GET /events/:id/history', () => {

    it('should show the history of changes to an event', (done) => {
      supertest(server)
      .get('/events/1/history')
      .type('json')
      .expect(200)
      .expect(res => {
        expect(res.body).to.deep.equal([
          {timestamp: '2017-10-01', change: {state: {from: null, to: 'open'}}},
          {timestamp: '2017-10-01', change: {state: {from: 'open', to: 'closed'}}},
        ])
      })
      .end(done)
    })

  })

})
