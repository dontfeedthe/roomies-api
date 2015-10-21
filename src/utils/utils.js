var env = process.env.NODE_ENV || 'development'

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
