/**
 * Module dependencies
 */

var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

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

app.get('/', function (req, res, next) {
  res.status(404).send({
    error: {
      summary: 'Missing resource',
      description: 'No resource to show. A more precise route must be provided'
    }
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
