'use strict'

module.exports = function (sequelize, DataTypes) {
  var Roomies = sequelize.define('Roomies', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  })

  return Roomies
}
