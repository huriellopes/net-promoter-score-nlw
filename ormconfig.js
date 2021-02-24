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

    console.log(connectionData[driver].migrations)

    if (
      connectionData[driver].type === 'sqlite' &&
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
// {
//   type: process.env.DB_CONNECTION,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   synchronize: true,
//   logging: false,
//   entities: [__dirname + '/src/app/models/**/*.ts'],
//   migrations: [__dirname + '/src/database/migrations/**/*.ts'],
//   cli: {
//     migrationsDir: __dirname + '/src/database/migrations',
//     entitiesDir: __dirname + '/src/app/models',
//   },
// }
