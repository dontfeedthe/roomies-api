'use strict'

module.exports = function SharedFlat (sequelize, DataTypes) {
  let SharedFlat = sequelize.define('SharedFlat', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  })

  return SharedFlat
}
