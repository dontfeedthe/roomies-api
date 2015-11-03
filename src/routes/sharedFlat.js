'use strict'

/**
 * Module dependencies
 */

var express = require('express')

/**
 * Module configuration
 */

var router = express.Router()
var SharedFlatService = require('../services/sharedFlat')

/**
 * Routes
 */

router.post('/', SharedFlatService.createOne)

module.exports = router
