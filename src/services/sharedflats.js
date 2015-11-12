'use strict'

var models = require('../models')
const replySuccess = require('../utils/utils').replySuccess
const replyError = require('../utils/utils').replyError
const debug = require('debug')('api:server')

exports.createOne = (req, res) => {
  let address = req.body.address
  if (!address) {
    throw new Error('`address` is missing')
  }

  let name = req.body.name
  if (!name) {
    throw new Error('`name` is missing')
  }

  let data = {address, name}
  let sharedflats = models.sharedflats.build(data)

  return sharedflats.save()
    .then((result) => {
      data.id = result.id
      debug(`Creation of sharedflats with address "${address}" and name "${name}" succeeded`)
      return res.status(201).send(replySuccess(data))
    })
    .catch((err) => {
      if (err) {
        debug(`Creation of sharedflats with address "${address}" and name "${name}" failed`)
        return res.status(400).send(replyError(400, err))
      }
    })
}
