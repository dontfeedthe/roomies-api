var expect = require('chai').expect
var app = require('../../src/app')

describe('App', function () {
  it('should exist', function () {
    expect(app).to.not.be.undefined
    expect(app).to.be.a('function')
  })
})
