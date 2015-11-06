'use strict'

const reply = exports.reply = function (content) {
  if (!content) {
    throw new ReferenceError('`content` is missing')
  }

  let errorHappened = content.errors && content.errors.length > 0
  return {
    errors: !errorHappened ? null : content.errors.map((error) => {
      return {
        status: error.code,
        title: require('http').STATUS_CODES[error.code],
        detail: error.message
      }
    }),
    data: errorHappened ? null : content.data
  }
}

exports.replyError = function replyError (code, message) {
  if (!code) {
    throw new ReferenceError('`code` is missing')
  }

  if (!message) {
    throw new ReferenceError('`message` is missing')
  }

  return reply({
    errors: [{code, message}]
  })
}

exports.replySuccess = function replySuccess (data) {
  if (!data) {
    throw new ReferenceError('`data` is missing')
  }

  return reply({
    errors: null,
    data: data
  })
}

/**
 *
 */
exports.testContentType = function (req, res, next) {
  // We don't test GET and HEAD content type since... there's none.
  var httpMethodsWithoutContentType = ['GET', 'HEAD']
  if (httpMethodsWithoutContentType.indexOf(req.method) !== -1) {
    return next()
  }

  var supportedContentTypes = ['application/json']
  if (supportedContentTypes.indexOf(req.headers['content-type']) !== -1) {
    return next()
  }

  return res.status(415).send({
    error: true,
    content: {
      message: `The content type "${req.headers['content-type']}" is not supported. Are supported: "${supportedContentTypes}"`
    }
  })
}

/*
 * Create a new error to manage 404 error
 */

exports.handleMissingResource = function (req, res, next) {
  res.status(404).send({
    error: true,
    content: {
      message: 'Not found'
    }
  })
}

/**
 * Send an error when something wrong happens on the server side.
 */

exports.handleServerError = function (err, req, res, next) {
  res.status(err.status || 500).send({
    error: true,
    content: {
      message: err
    }
  })
}

/**
 * Normalize a port into a number, string, or false.
 */

exports.normalizePort = function (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

exports.onError = function (port) {
  return function (error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

exports.onListening = function (debug, server) {
  return function () {
    var addr = server.address()
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
    debug('Listening on ' + bind)
  }
}
