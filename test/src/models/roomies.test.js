/* globals describe it */
var chai = require('chai')
var Roomies = require('../../../src/models/roomies')

chai.should()

describe('Models', () => {
  describe('Roomies', () => {
    it('should exist', () => {
      Roomies.should.exist
    })
  })
})
