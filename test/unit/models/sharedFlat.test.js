/* global describe it */

'use strict'

var sharedflats = require('../../../src/models/sharedflats')
var chai = require('chai')

chai.should()

describe('Models', function () {
  describe('sharedflats', function () {
    it('should exist', function () {
      sharedflats.should.exist
    })
  })
})
