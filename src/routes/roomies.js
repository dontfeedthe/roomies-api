var express = require('express')
var router = express.Router()
var models = require('../models')

/* GET users listing. */
router.get('/', function (req, res) {
  models.Roomies.findAll()
    .then(function (roomies) {
      res.status(200).send(roomies)
    })
});

module.exports = router