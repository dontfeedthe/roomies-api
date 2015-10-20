/**
 * Module dependencies
 */

var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var sequelize = require('sequelize')

var handleMissingResource = require('./utils/utils.js').handleMissingResource
var handleServerError = require('./utils/utils.js').handleServerError

/**
 * Application configuration
 */

var roomies = require('./routes/roomies')
var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())

/**
 * Routes list
 */

app.use('/roomies', roomies)
app.use(handleMissingResource)

/**
 * Errors handler
 */

// no stacktraces leaked to user unless in development environment
app.use(handleServerError);

module.exports = app
