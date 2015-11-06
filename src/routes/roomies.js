'use strict'

/**
 * Module dependencies
 */

var express = require('express')

/**
 * Module configuration
 */

var router = express.Router()
var RoomiesService = require('../services/roomies')

/**
 * Routes
 */

router.get('/:email', RoomiesService.getOne)
router.post('/', RoomiesService.createOne)

module.exports = router
