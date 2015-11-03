'use strict'

var models = require('../models')

exports.createOne = (req, res) => {
  let address = req.body.address
  if (!address) {
    throw new Error('`address` is missing')
  }

  let name = req.body.name
  if (!name) {
    throw new Error('`name` is missing')
  }

  let sharedFlat = models.SharedFlat.build({address, name})
  return sharedFlat.save().then(() => {
    return res.status(201).send(sharedFlat)
  })
}
