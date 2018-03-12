const fs = require('fs')
const nconf = require('nconf')

function Config() {
  nconf.argv().env().file('development', { file: __dirname + '/../config.json' })
}

Config.prototype.get = function (key) {
  return nconf.get(key)
}

module.exports = new Config()
