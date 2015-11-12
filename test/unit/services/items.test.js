/* global describe it before after */

'use strict'

var chai = require('chai')
var sinon = require('sinon')
var httpMocks = require('node-mocks-http')

var models = require('../../../src/models')
var itemsService = require('../../../src/services/items')

// var expect = chai.expect
chai.should()

describe('ItemsService', () => {
  it('should exist', () => {
    itemsService.should.exist
  })

  describe('getAll', () => {
    it('should be available in ItemsService', () => {
      itemsService.should.have.property('getAll')
    })

    it('should be a function', () => {
      itemsService.getAll.should.be.a('function')
    })

    describe('when the sharedflats id is not provided', () => {
      let result, statusCode

      const res = httpMocks.createResponse()
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/sharedflats/foo/items',
        params: {
          id: null
        }
      })

      before(() => {
        itemsService.getAll(req, res)
        result = res._getData()
        statusCode = res.statusCode
      })

      it('should return 400', () => {
        statusCode.should.equal(400)
      })

      it('should return a detailed error', () => {
        result.should.deep.equal({
          errors: [{
            status: 400,
            title: 'Bad Request',
            detail: 'a collocationId must be provided'
          }],
          data: null
        })
      })
    })

    describe('when everything is ok', () => {
      const items = [{
        content: 'foobar',
        done: false
      }, {
        content: 'bazqux',
        done: true
      }, {
        content: 'tototiti',
        done: true
      }]

      const res = httpMocks.createResponse()
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/sharedflats/foo/items',
        params: {
          sharedflatId: 'foo'
        }
      })

      let result
      let statusCode

      before((done) => {
        sinon.stub(models.Items, 'findAll').returns(Promise.resolve(items))
        itemsService
          .getAll(req, res)
          .then(() => {
            result = res._getData()
            statusCode = res.statusCode
            done()
          })
      })

      after(() => {
        models.Items.findAll.restore()
      })

      it('should return 200', () => {
        statusCode.should.equals(200)
      })

      it('should return a list of items', () => {
        result.should.deep.equal({
          errors: null,
          data: items
        })
      })
    })
  })
})
