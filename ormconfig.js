// eslint-disable-next-line
require('dotenv').config()
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _typeorm = require('typeorm')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { driver, ...connectionData } = require('./src/config/database')

function TypeOrm() {
  try {
    if (!connectionData[driver]) {
      throw `Error: the '${driver}' driver does not exist.`
    }

    if (
      !connectionData[driver].type === 'sqlite' &&
      connectionData[driver].database !== ''
    ) {
      throw `Error: database name not entered!`
    }

    return connectionData[driver]
  } catch (e) {
    console.log(e)

    process.exit(1)
  }
}

module.exports = TypeOrm()
