/* global describe it */

'use strict'

var SharedFlat = require('../../../src/models/sharedFlat')
var chai = require('chai')

chai.should()

describe('Models', function () {
  describe('SharedFlat', function () {
    it('should exist', function () {
      SharedFlat.should.exist
    })
  })
})
