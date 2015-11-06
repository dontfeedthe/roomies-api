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
      let response = httpMocks.createResponse()
      let request = httpMocks.createRequest({
        params: {
          email: null
        }
      })

      it('should return a 400', () => {
        roomiesService.getOne(request, response)
        expect(response.statusCode).to.equal(400)
      })

      it('should return an error message', function () {
        roomiesService.getOne(request, response)

        let data = response._getData()
        expect(data.error).to.be.true
        expect(data.content).to.be.an('object')
        expect(data.content.message).to.be.a('string')
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
        before(() => {
          sinon.stub(models.Roomies, 'find').returns(Promise.resolve(null))
        })

        after(() => {
          models.Roomies.find.restore()
        })

        it('should return 404', () => {
          return roomiesService
            .getOne(request, response)
            .then(() => {
              expect(response.statusCode).to.equals(404)
            })
        })

        it('should return a detailed error', () => {
          return roomiesService
            .getOne(request, response)
            .then(() => {
              let data = response._getData()
              expect(data).to.be.an('object')
              expect(data.error).to.be.true
              expect(data.content).to.be.an('object')
              expect(data.content).to.have.property('message')
              expect(data.content.message).to.be.a('string')
            })
        })
      })

      describe('when there is a roomie', () => {
        before(() => {
          sinon.stub(models.Roomies, 'find').returns(Promise.resolve(mockedRoomie))
        })

        after(() => {
          models.Roomies.find.restore()
        })

        it('should return a 200', () => {
          return roomiesService
            .getOne(request, response)
            .then(() => {
              expect(response.statusCode).to.equals(200)
            })
        })

        it('should return a detailed message', () => {
          return roomiesService
            .getOne(request, response)
            .then(() => {
              let data = response._getData()
              expect(data).to.be.an('object')
              expect(data.error).to.be.false
              expect(data.content).to.be.an('object')
              expect(data.content).to.have.property('message')
              expect(data.content.message).to.be.an('object')
              expect(data.content.message).to.have.property('firstName')
              expect(data.content.message).to.have.property('lastName')
              expect(data.content.message).to.have.property('email')
            })
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

    describe('when all information are provided', () => {
      let roomie
      let roomieData = {
        email: 'foobar',
        firstName: 'foo',
        lastName: 'bar',
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

      it('should return 201', () => {
        res.statusCode.should.equal(201)
      })

      it('should return a new roomie', () => {
        roomie.should.deep.equals({
          data: {
            email: 'foobar',
            firstName: 'foo',
            lastName: 'bar'
          },
          errors: null
        })
      })
    })
  })
})
