/* global describe it before after */

'use strict'

let sinon = require('sinon')
let httpMocks = require('node-mocks-http')

let models = require('../../../src/models')
let sharedFlatService = require('../../../src/services/sharedFlat')

require('chai').should()

describe.only('SharedFlatService', () => {
  it('should exist a service for that', () => {
    sharedFlatService.should.exist
  })

  describe('Create a new shared flat', () => {
    it('should exist a function for that', () => {
      sharedFlatService.createOne.should.exist
    })

    describe('when address is missing', () => {
      let req = httpMocks.createRequest({
        url: '/roomies',
        method: 'POST'
      })

      it('should throw an error when address is not provided', () => {
        sharedFlatService.createOne.bind(null, req, null).should.throw(Error)
      })

      it('should provide an error message when... an error is thrown', () => {
        sharedFlatService.createOne.bind(null, req, null).should.throw('`address` is missing')
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
        sharedFlatService.createOne.bind(null, req, null).should.throw(Error)
      })

      it('should provide an error message when... an error is thrown', () => {
        sharedFlatService.createOne.bind(null, req, null).should.throw('`name` is missing')
      })
    })

    describe('when everything is ok', () => {
      let data = {
        name: 'foobar',
        address: '31 main square, NY',
        save: () => Promise.resolve()
      }

      before(() => {
        sinon.stub(models.SharedFlat, 'build').returns(data)
      })

      it('should create a new sharedflat', () => {
        let req = httpMocks.createRequest({
          url: '/roomies',
          method: 'POST',
          body: data
        })
        let res = httpMocks.createResponse()

        return sharedFlatService
          .createOne(req, res)
          .then(() => {
            res.statusCode.should.equals(201)
          })
      })

      after(() => {
        models.SharedFlat.build.restore()
      })
    })
  })
})
