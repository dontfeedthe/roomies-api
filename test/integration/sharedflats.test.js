'use strict'

const chai = require('chai')
const request = require('supertest')
const app = require('../../src/app')

const expect = require('chai').expect
chai.should()

describe('Sharedflats', () => {
  describe('POST /sharedflats', () => {
    it('should create a new sharedflats resource', (done) => {
      // create a sharedflats
      request(app)
        .post('/sharedflats')
        .set('Content-Type', 'application/json')
        .send({
          address: 'foobar',
          name: 'foobar'
        })
        .expect((res) => {
          expect(res.body.errors).to.not.exist
          res.body.data.should.be.an('object')
          res.body.data.address.should.equal('foobar')
          res.body.data.name.should.equal('foobar')
        })
        .expect(201, done)
    })
  })
})
