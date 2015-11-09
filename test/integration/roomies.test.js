'use strict'

const chai = require('chai')
const request = require('supertest')
const app = require('../../src/app')

chai.should()

describe('Roomies', () => {
  describe('POST /roomies', () => {
    describe('when the data are correct', () => {
      let result
      const data = {
        email: 'foobar@baz.com',
        firstName: 'foo',
        lastName: 'bar'
      }

      before((done) => {
        request(app)
          .post('/roomies')
          .set('Content-Type', 'application/json')
          .send(data)
          .expect((res) => result = res)
          .end(done)
      })

      it('should return 201', () => {
        result.status.should.equals(201)
      })

      it('should return the new roomie', () => {
        result.body.should.deep.equals({
          errors: null,
          data: data
        })
      })
    })
  })

  describe('GET /roomies/:email', () => {
    let result
    const data = {
      email: 'getroomiesbyemail@roomies.com',
      firstName: 'foo',
      lastName: 'bar'
    }

    before((done) => {
      request(app)
        .post('/roomies')
        .set('Content-Type', 'application/json')
        .send(data)
        .end(done)
    })

    describe('when the email refers to an existing roomie', () => {
      before((done) => {
        request(app)
          .get('/roomies/' + data.email)
          .set('Content-Type', 'application/json')
          .expect((res) => result = res)
          .end(done)
      })

      it('should return 200', () => {
        result.status.should.equals(200)
      })

      it('should return the selected roomie', () => {
        result.body.should.deep.equals({
          errors: null,
          data: data
        })
      })
    })
  })
})
