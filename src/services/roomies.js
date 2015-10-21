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

exports.createOne = function createOne (req, res, next) {
  models.Roomies
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
        .then(function(values) {
          res.status(200).send({
            error: false,
            content: {
              message: 'All resources have been destroyed'
            }
          })
        })
    })
}
