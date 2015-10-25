'use strict'

var models = require('../models')

exports.getAll = function getAll (req, res, next) {
  models.Roomies
    .findAll()
    .then(function (roomies) {
      res.status(200).send({
        error: false,
        content: {
          message: roomies
        }
      })
    })
}

exports.getOne = (req, res) => {
  let email = req.params.email
  if (!email) {
    return res.status(400).send({
      error: true,
      content: {
        message: '`email` is missing'
      }
    })
  }

  return models.Roomies
    .find()
    .then((roomie) => {
      if (!roomie) {
        return res.status(404).send({
          error: true,
          content: {
            message: `No resource matching ${email}`
          }
        })
      }

      return res.status(200).send({
        error: false,
        content: {
          message: roomie
        }
      })
    })
}

exports.createOne = function createOne (req, res, next) {
  if (!Object.getOwnPropertyNames(req.body).length) {
    return res.status(400).send({
      error: true,
      content: {
        message: '`request.body` cannot be empty'
      }
    })
  }

  if (!req.body.email) {
    return res.status(400).send({
      error: true,
      content: {
        message: '`request.body.email` is missing'
      }
    })
  }

  if (!req.body.firstName) {
    return res.status(400).send({
      error: true,
      content: {
        message: '`request.body.firstName` is missing'
      }
    })
  }

  if (!req.body.lastName) {
    return res.status(400).send({
      error: true,
      content: {
        message: '`request.body.lastName` is missing'
      }
    })
  }

  return models.Roomies
    .create(req.body)
    .then(function (roomie) {
      res.status(201).send({
        error: false,
        content: {
          message: roomie
        }
      })
    })
}

exports.destroyAll = function destroyAll (req, res, next) {
  models.Roomies
    .findAll()
    .then(function (roomies) {
      Promise
        .all(roomies.map((roomie) => roomie.destroy()))
        .then(function (values) {
          res.status(200).send({
            error: false,
            content: {
              message: 'All resources have been destroyed'
            }
          })
        })
    })
}
