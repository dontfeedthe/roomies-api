/* global describe it */
var expect = require('chai').expect

describe('Roomies', function () {
  var Roomies = require('../models/roomies.js')
  var roomie = new Roomies()

  it('should be defined', function () {
    expect(Roomies).to.not.be.undefined
  })

  it('should be creatable', function () {
    expect(roomie).to.not.be.undefined
  })

  it('should be an instanceof `Roomies`', function () {
    expect(roomie).to.be.an.instanceof(Roomies)
  })

  describe('email', function () {
    it('should exist', function () {
      expect(roomie.email).to.not.be.undefined
    })

    it('should have a default value set to an empty string', function () {
      expect(roomie.email).to.equal('')
    })

    it('should be accessible as a property', function () {
      expect(roomie).to.have.property('email')
    })

    it('should accept a new value when provided', function () {
      roomie.email = 'foo'
      expect(roomie.email).to.equal('foo')
    })
  })

  describe('password', function () {
    it('should not be defined', function () {
      expect(roomie.password).to.be.undefined
    })

    it('should not be accessible as a property', function () {
      expect(roomie).to.not.have.property('password')
    })
  })
})
