/* global before */

'use strict'

var utils = require('../../../src/utils/utils')
var chai = require('chai');
var expect = chai.expect
var httpMocks = require('node-mocks-http')
var sinon = require('sinon')

chai.should()

describe('utils', function () {
  before(function () {
    this.mockedRes = httpMocks.createResponse()
  })

  describe('testContentType', function () {
    it('should have a testContentType function', function () {
      expect(utils).to.have.property('testContentType')
    })

    it('should be a function', function () {
      expect(utils.testContentType).to.be.a('function')
    })

    describe('when a GET request is passed', function () {
      it('should be allowed', function () {
        var req = httpMocks.createRequest({method: 'GET'})
        var callback = sinon.spy()
        utils.testContentType(req, this.mockedRes, callback)
        expect(callback.calledOnce).to.be.true
      })
    })

    describe('when a HEAD request is passed', function () {
      it('should be allowed', function () {
        var req = httpMocks.createRequest({method: 'GET'})
        var callback = sinon.spy()
        utils.testContentType(req, this.mockedRes, callback)
        expect(callback.calledOnce).to.be.true
      })
    })

    describe('when an other http method is passed', function () {
      describe('when content type is `application/json`', function () {
        it('should be allowed', function () {
          var req = httpMocks.createRequest({
            method: 'POST',
            url: '/foobar',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          var callback = sinon.spy()
          utils.testContentType(req, this.mockedRes, callback)
          expect(callback.called).to.be.true
        })
      })

      describe('when content type is not `application/json`', function () {
        it('should return a 415', function () {
          var req = httpMocks.createRequest({
            method: 'POST',
            url: '/foobar',
            headers: {
              'Content-Type': 'text/html'
            }
          })

          var res = httpMocks.createResponse()
          utils.testContentType(req, res)
          expect(res.statusCode).to.equals(415)
        })

        it('should return a detailed error', function () {
          var req = httpMocks.createRequest({
            method: 'POST',
            url: '/foobar',
            headers: {
              'Content-Type': 'text/html'
            }
          })

          var res = httpMocks.createResponse()
          utils.testContentType(req, res)
          expect(res._getData()).to.have.property('error')
          expect(res._getData()).to.have.property('error')
          expect(res._getData().content).to.have.property('message')
          expect(res._getData().content.message).to.be.a('string')
        })

        it('should not be propagated to the next middleware', function () {
          var req = httpMocks.createRequest({
            method: 'POST',
            url: '/foobar',
            headers: {
              'Content-Type': 'text/html'
            }
          })

          var callback = sinon.spy()
          utils.testContentType(req, this.mockedRes, callback)
          expect(callback.called).to.be.false
        })
      })
    })
  })

  describe('reply', () => {
    const reply = utils.reply
    it('should be available in utils', function () {
      expect(utils).to.have.property('testContentType')
    })

    it('should be a function', function () {
      expect(utils.testContentType).to.be.a('function')
    })

    describe('when content is missing', () => {
      it('should throw ReferenceError', () => {
        reply.bind().should.throw(Error)
      })
      it('should say that the content is missing', () => {
        reply.bind().should.throw(/`content` is missing/)
      })
    })

    describe('when errors are provided', () => {
      let content = {
        errors: [{
          code: 400,
          message: 'foobar foo baz'
        }]
      }

      it('should return the appropriate format', () => {
        reply(content).should.deep.equals({
          errors: [{
            status: 400,
            title: 'Bad Request',
            detail: 'foobar foo baz'
          }],
          data: null
        })
      })
    })

    describe('when data are provided', () => {
      let content = {
        data: 'foobar'
      }

      it('should return the appropriate format', () => {
        reply(content).should.deep.equals({
          errors: null,
          data: 'foobar'
        })
      })
    })

    describe('when both are provided', () => {
      it('should return the error only', () => {
        let content = {
          data: 'foobar',
          errors: [{
            code: 400,
            message: 'foobar foo baz'
          }]
        }

        reply(content).should.deep.equals({
          errors: [{
            status: 400,
            title: 'Bad Request',
            detail: 'foobar foo baz'
          }],
          data: null
        })
      })
    })
  })
})
