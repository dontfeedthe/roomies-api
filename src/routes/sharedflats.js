'use strict'

/**
 * Module dependencies
 */

var express = require('express')

/**
 * Module configuration
 */

var router = express.Router()
var SharedflatsService = require('../services/sharedflats')
var ItemsService = require('../services/items')

/**
 * Routes
 */

router.post('/', SharedflatsService.createOne)
router.get('/:sharedflatId/items', ItemsService.getAll)
router.post('/:sharedflatId/items', ItemsService.createOne)

module.exports = router
