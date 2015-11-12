/* global describe it before after */

'use strict'

let sinon = require('sinon')
let httpMocks = require('node-mocks-http')

let models = require('../../../src/models')
let SharedflatsService = require('../../../src/services/sharedflats')

require('chai').should()

describe('SharedflatsService', () => {
  it('should exist a service for that', () => {
    SharedflatsService.should.exist
  })

  describe('Create a new shared flat', () => {
    it('should exist a function for that', () => {
      SharedflatsService.createOne.should.exist
    })

    describe('when address is missing', () => {
      let req = httpMocks.createRequest({
        url: '/roomies',
        method: 'POST'
      })

      it('should throw an error when address is not provided', () => {
        SharedflatsService.createOne.bind(null, req, null).should.throw(Error)
      })

      it('should provide an error message when... an error is thrown', () => {
        SharedflatsService.createOne.bind(null, req, null).should.throw('`address` is missing')
      })
    })

    describe('when name is missing', () => {
      let req = httpMocks.createRequest({
        url: '/roomies',
        method: 'POST',
        body: {
          address: 'foobar'
        }
      })

      it('should throw an error when name is not provided', () => {
        SharedflatsService.createOne.bind(null, req, null).should.throw(Error)
      })

      it('should provide an error message when... an error is thrown', () => {
        SharedflatsService.createOne.bind(null, req, null).should.throw('`name` is missing')
      })
    })

    describe('when everything is ok', () => {
      let statusCode
      let data = {
        name: 'foobar',
        address: '31 main square, NY',
        save: () => Promise.resolve({id: 1})
      }

      const req = httpMocks.createRequest({
        url: '/roomies',
        method: 'POST',
        body: data
      })
      const res = httpMocks.createResponse()

      before((done) => {
        sinon.stub(models.sharedflats, 'build').returns(data)
        SharedflatsService
          .createOne(req, res)
          .then(() => {
            statusCode = res.statusCode
            done()
          })
      })

      after(() => {
        models.sharedflats.build.restore()
      })

      it('should create a new sharedflats', () => {
        statusCode.should.equals(201)
      })
    })
  })
})
