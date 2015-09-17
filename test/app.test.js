var app = require('../app')
var request = require('supertest')
var expect = require('chai').expect

describe('app', function () {
  it('should be a function', function () {
    expect(app).to.be.a('function')
  })
})

describe('/', function () {
  describe('GET', function () {
    it('should return 404', function (done) {
      request(app)
        .get('/')
        .expect(404, done)
    })

    it('should contain a detailed error', function (done) {
      request(app)
        .get('/')
        .expect(function (res) {
          expect(res.body).to.be.an('object')
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.summary).to.equal('Missing resource')
          expect(res.body.error.description).to.equal('No resource to show. A more precise route must be provided')
        })
        .end(done)
    })
  })
})
