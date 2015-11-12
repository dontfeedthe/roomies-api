'use strict'

const replyError = require('../utils/utils').replyError
const replySuccess = require('../utils/utils').replySuccess
const models = require('../models')

exports.getAll = (req, res) => {
  let sharedflatId = req.params.sharedflatId
  if (!sharedflatId) {
    return res.status(400).send(replyError(400, 'a collocationId must be provided'))
  }

  return models.Items
    .findAll()
    .then((items) => {
      return res.status(200).send(replySuccess(items))
    })
}

exports.createOne = function (req, res) {
  
}
