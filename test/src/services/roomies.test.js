var expect = require('chai').expect
var roomiesService = require('../../../src/services/roomies')

describe('Services', function () {
  describe('Roomies', function () {
    it('should exist', function () {
      expect(roomiesService).to.not.be.undefined
    })
    it('should contain a getAll function', function () {
      expect(roomiesService).to.have.property('getAll')
      expect(roomiesService.getAll).to.be.a('function')
    })
    it('should contain a createOne function', function () {
      expect(roomiesService).to.have.property('createOne')
      expect(roomiesService.createOne).to.be.a('function')
    })
    it('should contain a destroyAll function', function () {
      expect(roomiesService).to.have.property('destroyAll')
      expect(roomiesService.destroyAll).to.be.a('function')
    })
  })
})
