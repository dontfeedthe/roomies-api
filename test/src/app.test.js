var expect = require('chai').expect
var app = require('../../src/app')
var request = require('supertest')

describe('App', function () {
  it('should exist', function () {
    expect(app).to.not.be.undefined
    expect(app).to.be.a('function')
  })
})
