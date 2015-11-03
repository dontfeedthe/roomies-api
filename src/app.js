/**
 * Module dependencies
 */

var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var handleMissingResource = require('./utils/utils.js').handleMissingResource
var handleServerError = require('./utils/utils.js').handleServerError
var env = process.env.NODE_ENV || 'development'

/**
 * Application configuration
 */

var roomies = require('./routes/roomies')
var sharedFlat = require('./routes/sharedFlat')
var app = express()

app.use(logger('dev', {
  skip: function (req, res) {
    return env === 'test'
  }
}))
app.use(bodyParser.json())

/**
 * Routes list
 */

app.use('/roomies', roomies)
app.use('/sharedFlat', sharedFlat)
app.use(handleMissingResource)

/**
 * Errors handler
 */

// no stacktraces leaked to user unless the environment is development
app.use(handleServerError)

module.exports = app
