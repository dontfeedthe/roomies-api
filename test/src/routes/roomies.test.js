/* global describe it before after*/

var request = require('supertest')
var sinon = require('sinon')
require('sinon-as-promised')

var app = require('../../../src/app')
var models = require('../../../src/models')

describe('Roomies', function () {
  var mockedRoomie = {
    email: 'foobar@baz.com',
    firstName: 'foo',
    lastName: 'bar'
  }

  var destroyableRoomie = {
    email: 'foobar@baz.com',
    firstName: 'foo',
    lastName: 'bar',
    destroy: () => new Promise((resolve, reject) => resolve())
  }

  var mockedRoomie2 = {
    email: 'tititoto@email.com',
    firstame: 'titi',
    lastName: 'toto'
  }

  var destroyableRoomie2 = {
    email: 'tititoto@email.com',
    firstame: 'titi',
    lastName: 'toto',
    destroy: () => new Promise((resolve, reject) => resolve())
  }

  describe('select all roomies', function () {
    describe('when there is no roomies', function () {
      before(function () {
        sinon.stub(models.Roomies, 'findAll').resolves([])
      })

      after(function () {
        models.Roomies.findAll.restore()
      })

      it('should return 200', function (done) {
        request(app)
          .get('/roomies')
          .expect(200, done)
      })

      it('should return an empty array', function (done) {
        request(app)
          .get('/roomies')
          .expect({
            error: false,
            content: {
              message: []
            }
          }, done)
      })
    })
    describe('when there is only one roomie', function () {
      before(function () {
        sinon.stub(models.Roomies, 'findAll').resolves([mockedRoomie])
      })

      after(function () {
        models.Roomies.findAll.restore()
      })

      it('should return 200', function (done) {
        request(app)
          .get('/roomies')
          .expect(200, done)
      })

      it('should return an array of roomies with a single roomie inside', function (done) {
        request(app)
          .get('/roomies')
          .expect({
            error: false,
            content: {
              message: [mockedRoomie]
            }
          }, done)
      })
    })
    describe('when there are many roomies', function () {
      before(function () {
        sinon.stub(models.Roomies, 'findAll').resolves([mockedRoomie, mockedRoomie2])
      })

      after(function () {
        models.Roomies.findAll.restore()
      })

      it('should return 200', function (done) {
        request(app)
          .get('/roomies')
          .expect(200, done)
      })

      it('should return the array of roomies', function (done) {
        request(app)
          .get('/roomies')
          .expect({
            error: false,
            content: {
              message: [mockedRoomie, mockedRoomie2]
            }
          }, done)
      })
    })
  })

  describe('delete all roomies', function () {
    describe('when there is no roomies', function () {
      before(function () {
        sinon.stub(models.Roomies, 'findAll').resolves([])
      })

      after(function () {
        models.Roomies.findAll.restore()
      })

      it('should return 200', function (done) {
        request(app)
          .delete('/roomies')
          .expect(200, done)
      })

      it('should return a message', function (done) {
        request(app)
          .delete('/roomies')
          .expect({
            error: false,
            content: {
              message: 'All resources have been destroyed'
            }
          }, done)
      })
    })

    describe('when there is only one roomie', function () {
      before(function () {
        sinon.stub(models.Roomies, 'findAll').resolves([destroyableRoomie])
      })

      after(function () {
        models.Roomies.findAll.restore()
      })

      it('should return 200', function (done) {
        request(app)
          .delete('/roomies')
          .expect(200, done)
      })

      it('should return a message', function (done) {
        request(app)
          .delete('/roomies')
          .expect({
            error: false,
            content: {
              message: 'All resources have been destroyed'
            }
          }, done)
      })
    })

    describe('when there are many roomies', function () {
      before(function () {
        sinon.stub(models.Roomies, 'findAll').resolves([destroyableRoomie, destroyableRoomie2])
      })

      after(function () {
        models.Roomies.findAll.restore()
      })

      it('should return 200', function (done) {
        request(app)
          .delete('/roomies')
          .expect(200, done)
      })

      it('should return a message', function (done) {
        request(app)
          .delete('/roomies')
          .expect({
            error: false,
            content: {
              message: 'All resources have been destroyed'
            }
          }, done)
      })
    })
  })

  describe('create a new roomie', function () {
    describe('when the request body is correct', function () {
      before(function () {
        sinon.stub(models.Roomies, 'create').resolves(mockedRoomie)
      })

      after(function () {
        models.Roomies.create.restore()
      })

      it('should return 201', function (done) {
        request(app)
          .post('/roomies')
          .send(mockedRoomie)
          .expect(201, done)
      })

      it('should return the create roomies', function (done) {
        request(app)
          .post('/roomies')
          .send(mockedRoomie)
          .expect({
            error: false,
            content: {
              message: mockedRoomie
            }
          }, done)
      })
    })

    describe('when the request body is empty', function () {
      it('should return 400', function (done) {
        request(app)
          .post('/roomies')
          .expect(400, done)
      })

      it('should return an error message', function (done) {
        request(app)
          .post('/roomies')
          .expect({
            error: true,
            content: {
              message: '`request.body` cannot be empty'
            }
          }, done)
      })
    })

    describe('when email is missing', function () {
      it('should return 400', function (done) {
        request(app)
          .post('/roomies')
          .send({firstName: 'foo', lastName: 'bar'})
          .expect(400, done)
      })

      it('should return an error message', function (done) {
        request(app)
          .post('/roomies')
          .send({firstName: 'foo', lastName: 'bar'})
          .expect({
            error: true,
            content: {
              message: '`request.body.email` is missing'
            }
          }, done)
      })
    })

    describe('when firstName is missing', function () {
      it('should return 400', function (done) {
        request(app)
          .post('/roomies')
          .send({email: 'foobar@baz.com', lastName: 'bar'})
          .expect(400, done)
      })

      it('should return an error message', function (done) {
        request(app)
          .post('/roomies')
          .send({email: 'foobar@baz.com', lastName: 'bar'})
          .expect({
            error: true,
            content: {
              message: '`request.body.firstName` is missing'
            }
          }, done)
      })

      describe('when lastName is missing', function () {
        it('should return 400', function (done) {
          request(app)
            .post('/roomies')
            .send({email: 'foobar@baz.com', firstName: 'foo'})
            .expect(400, done)
        })

        it('should return an error message', function (done) {
          request(app)
            .post('/roomies')
            .send({email: 'foobar@baz.com', firstName: 'foo'})
            .expect({
              error: true,
              content: {
                message: '`request.body.lastName` is missing'
              }
            }, done)
        })
      })
    })
  })
})
