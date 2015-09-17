'use strict'

var bcrypt = require('bcrypt')

class Roomies {
  constructor () {
    this._email = ''
    this._hash = undefined
  }

  get email () {
    return this._email
  }

  set email (newEmail) {
    this._email = newEmail
  }

  encryptPassword (password) {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)
    this._hash = hash
  }

  checkPassword (passwordToTest) {
    return bcrypt.compareSync(passwordToTest, this._hash)
  }
}

module.exports = Roomies
