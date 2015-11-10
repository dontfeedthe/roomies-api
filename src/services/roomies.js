'use strict'

const models = require('../models')
const replyError = require('../utils/utils').replyError
const replySuccess = require('../utils/utils').replySuccess
const debug = require('debug')('api:server')

exports.createOne = (req, res) => {
  let email = req.body.email
  if (!email) {
    return res.status(400).send(replyError(400, '`email` is missing'))
  }

  let firstName = req.body.firstName
  if (!firstName) {
    return res.status(400).send(replyError(400, '`firstName` is missing'))
  }

  let lastName = req.body.lastName
  if (!lastName) {
    return res.status(400).send(replyError(400, '`lastName` is missing'))
  }

  let data = {email, firstName, lastName}

  let facebookId = req.body.facebookId
  if (facebookId) {
    data.facebookId = facebookId
  }

  res.status(201).send(replySuccess(data))
  models.Roomies.build(data).save()
    .then(() => {
      debug(`roomie with email "${email}" has been saved`)
    }).catch(() => {
      debug(`roomie with email "${email}" could not be saved`)
    })
}

exports.getOne = (req, res) => {
  let email = req.params.email
  if (!email) {
    return res.status(400).send(replyError(400, '`email` is missing'))
  }

  return models.Roomies
    .find({where: {email}})
    .then((roomie) => {
      if (!roomie) {
        return res.status(404).send(replyError(404, `No resource matching ${email}`))
      }

      let data = {
        email: roomie.email,
        firstName: roomie.firstName,
        lastName: roomie.lastName
      }

      return res.status(200).send(replySuccess(data))
    })
}
