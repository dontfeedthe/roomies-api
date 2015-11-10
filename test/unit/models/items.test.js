/* globals describe it */

var chai = require('chai')
var Items = require('../../../src/models/items')

chai.should()

describe('ItemsModels', () => {
  it('should exist', () => {
    Items.should.exist
  })
})
