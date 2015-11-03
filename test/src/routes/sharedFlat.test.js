/* global describe it */

'use strict'

let SharedFlatRouter = require('../../../src/routes/sharedFlat')

require('chai').should()

describe('Router', () => {
  describe('SharedFlat', () => {
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
