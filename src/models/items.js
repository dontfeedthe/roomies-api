'use strict'

module.exports = function (sequelize, DataTypes) {
  var Items = sequelize.define('Items', {
    content: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  })

  return Items
}
