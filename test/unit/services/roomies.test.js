/* global describe it before after */

'use strict'

var chai = require('chai')
var sinon = require('sinon')
var httpMocks = require('node-mocks-http')

var models = require('../../../src/models')
var roomiesService = require('../../../src/services/roomies')

var expect = chai.expect
chai.should()

describe('RoomiesServices', function () {
  let mockedRoomie = {
    email: 'foobar@baz.com',
    firstName: 'foo',
    lastName: 'bar'
  }

  it('should exist', function () {
    expect(roomiesService).to.not.be.undefined
  })

  it('should contain a getOne function', function () {
    expect(roomiesService).to.have.property('getOne')
    expect(roomiesService.getOne).to.be.a('function')
  })

  it('should contain a createOne function', function () {
    expect(roomiesService).to.have.property('createOne')
    expect(roomiesService.createOne).to.be.a('function')
  })

  describe('get a single roomie', function () {
    it('there should be a function for that', function () {
      expect(roomiesService).to.have.property('getOne')
      expect(roomiesService.getOne).to.be.a('function')
    })

    describe('when no email is provided', () => {
      let error, data
      let response = httpMocks.createResponse()
      let request = httpMocks.createRequest({
        params: {
          email: null
        }
      })

      before(() => {
        roomiesService.getOne(request, response)
        data = response._getData()
        error = data.errors[0]
      })

      it('should return a 400', () => {
        response.statusCode.should.equal(400)
      })

      it('should return an error message', function () {
        data.errors.should.exist
        data.errors.should.be.an('array')
        error.should.exist
        error.status.should.equal(400)
        error.detail.should.equal('`email` is missing')
      })
    })

    describe('when an email is provided', () => {
      let response = httpMocks.createResponse()
      let request = httpMocks.createRequest({
        params: {
          email: 'foo@bar.com'
        }
      })

      describe('when there are no roomies', () => {
        let result, statusCode
        before((done) => {
          sinon.stub(models.Roomies, 'find').returns(Promise.resolve(null))
          roomiesService
            .getOne(request, response)
            .then(() => {
              result = response._getData()
              statusCode = response.statusCode
              done()
            })
        })

        after(() => {
          models.Roomies.find.restore()
        })

        it('should return 404', () => {
          statusCode.should.equal(404)
        })

        it('should return a detailed error', () => {
          result.errors.should.exist
          result.errors[0].status.should.equal(404)
          result.errors[0].detail.should.equal('No resource matching foo@bar.com')
        })
      })

      describe('when there is a roomie', () => {
        let result, statusCode
        before(() => {
          sinon.stub(models.Roomies, 'find').returns(Promise.resolve(mockedRoomie))
          roomiesService
            .getOne(request, response)
            .then(() => {
              result = response._getData()
              statusCode = response.statusCode
            })
        })

        after(() => {
          models.Roomies.find.restore()
        })

        it('should return a 200', () => {
          statusCode.should.equal(200)
        })

        it('should return a detailed message', () => {
          result.should.be.an('object')
          expect(result.errors).to.not.exist
          result.data.should.exist

          let data = result.data
          data.should.be.an('object')
          data.should.have.property('firstName')
          data.should.have.property('lastName')
          data.should.have.property('email')
        })
      })
    })
  })

  describe('create a single roomie', () => {
    it('should exist a function for that', () => {
      roomiesService.createOne.should.exist
    })

    describe('when email is missing', () => {
      let req = httpMocks.createRequest({
        method: 'POST',
        url: '/roomies'
      })
      let res = httpMocks.createResponse()

      before(() => {
        roomiesService.createOne(req, res)
      })

      it('should return a 400', () => {
        res.statusCode.should.equals(400)
      })
    })

    describe('when firstName is missing', () => {
      let req = httpMocks.createRequest({
        method: 'POST',
        url: '/roomies',
        body: {
          email: 'foobar'
        }
      })
      let res = httpMocks.createResponse()

      before(() => {
        roomiesService.createOne(req, res)
      })

      it('should return a 400', () => {
        res.statusCode.should.equals(400)
      })
    })

    describe('when lastName is missing', () => {
      let req = httpMocks.createRequest({
        method: 'POST',
        url: '/roomies',
        body: {
          email: 'foobar',
          firstName: 'foobar'
        }
      })
      let res = httpMocks.createResponse()

      before(() => {
        roomiesService.createOne(req, res)
      })

      it('should return a 400', () => {
        res.statusCode.should.equals(400)
      })
    })

    describe('when a facebookId is provided', () => {
      let roomie
      let roomieData = {
        email: 'foobar',
        firstName: 'foo',
        lastName: 'bar',
        facebookId: 'facebookid',
        save: () => Promise.resolve()
      }
      let res = httpMocks.createResponse()
      let req = httpMocks.createRequest({
        method: 'POST',
        url: '/roomies',
        body: roomieData
      })

      before(() => {
        sinon.stub(models.Roomies, 'build').returns(roomieData)
        roomiesService.createOne(req, res)
        roomie = res._getData()
      })

      after(() => {
        models.Roomies.build.restore()
      })

      it('should return the created roomie with a facebookId', () => {
        roomie.should.deep.equals({
          errors: null,
          data: {
            email: 'foobar',
            firstName: 'foo',
            lastName: 'bar',
            facebookId: 'facebookid'
          }
        })
      })
    })

    describe('when all information are provided', () => {
      let roomie
      let roomieData = {
        email: 'foobar',
        firstName: 'foo',
        lastName: 'bar',
        facebookId: 'facebookId',
        save: () => Promise.resolve()
      }
      let res = httpMocks.createResponse()
      let req = httpMocks.createRequest({
        method: 'POST',
        url: '/roomies',
        body: roomieData
      })

      before(() => {
        sinon.stub(models.Roomies, 'build').returns(roomieData)
        roomiesService.createOne(req, res)
        roomie = res._getData()
      })

      after(() => {
        models.Roomies.build.restore()
      })

      it('should return 201', () => {
        res.statusCode.should.equal(201)
      })

      it('should return a new roomie', () => {
        roomie.should.deep.equals({
          data: {
            email: 'foobar',
            firstName: 'foo',
            lastName: 'bar',
            facebookId: 'facebookId'
          },
          errors: null
        })
      })
    })
  })
})
