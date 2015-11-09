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
})
