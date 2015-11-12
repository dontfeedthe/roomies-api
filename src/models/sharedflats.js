'use strict'

module.exports = function (sequelize, DataTypes) {
  let Sharedflats = sequelize.define('Sharedflats', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  })

  return Sharedflats
}
