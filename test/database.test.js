var expect = require('chai').expect
var host = 'roomies-api.cni8lechdtt5.eu-west-1.rds.amazonaws.com:3306'
var Sequelize = require('sequelize')

describe('database', function () {
  it('should accept a new connection', function (done) {
    var sequelize = new Sequelize('roomies-api', 'roomies_api_root', 'foobar1234', {
      host: host,
      dialect: 'mysql'
    })

    var User = sequelize.define('User', {
      username: Sequelize.STRING,
      birthday: Sequelize.DATE
    })

    sequelize
      .sync()
      .then(function() {
        return User.create({
          username: 'janedoe',
          birthday: new Date(1980, 6, 20)
        })
      })
      .then(function(jane) {
        console.log(jane.get({plain: true}))
        done()
      })
  })
})
