/* global describe it */

'use strict'

let SharedFlatRouter = require('../../../src/routes/sharedflats')

require('chai').should()

describe('Router', () => {
  describe('sharedflats', () => {
    it('should exist', () => {
      SharedFlatRouter.should.exist
    })

    describe('Create a new shared flat', () => {
      let creationRoute = SharedFlatRouter.stack[0]

      it('should exist a route for that', () => {
        creationRoute.should.exist
      })

      it('should be applied on /', () => {
        '/'.match(creationRoute.regexp).should.exist
      })
    })
  })
})
