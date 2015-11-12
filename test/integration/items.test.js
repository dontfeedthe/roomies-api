'use strict'

const chai = require('chai')
const request = require('supertest-as-promised')
const app = require('../../src/app')

chai.should()

describe('Items', () => {
  describe('GET /sharedflats/:id/items', () => {
    it('should return a list of items', () => {
      // create a sharedflats
      return request(app)
        .post('/sharedflats')
        .set('Content-Type', 'application/json')
        .send({
          address: 'foobar',
          name: 'foobar'
        })
        .then((res) => res.body.data.id)
        .then((sharedflatId) => {
          return request(app)
            .get('/sharedflats/' + sharedflatId + '/items')
            .expect(200, {
              data: [],
              errors: null
            })
        })
    })
  })
})
