'use strict'

var models = require('../models')

exports.createOne = (req, res) => {
  let address = req.params.address
  if (!address) {
    throw new Error('`address` is missing')
  }

  let name = req.params.name
  if (!name) {
    throw new Error('`name` is missing')
  }

  let sharedFlat = models.SharedFlat.build({address, name})
  return sharedFlat.save().then(() => {
    return res.status(201).send(sharedFlat)
  })
}
