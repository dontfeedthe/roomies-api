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

router.get('/', RoomiesService.getAll)
// router.post('/', RoomiesService.createOne)
router.delete('/', RoomiesService.destroyAll)

module.exports = router
