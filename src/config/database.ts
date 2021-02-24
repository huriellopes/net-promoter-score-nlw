import path from 'path'

import { env } from '../helpers/environment'

export = {
  driver: env('DB_CONNECTION', 'postgres'),

  /**
  |-----------------------------------------------------------------------------
  | SQLite
  |-----------------------------------------------------------------------------
  |
  | Para usar é necessário adicionar o pacote: sqlite3
  |
  */
  sqlite: {
    type: env('DB_CONNECTION', 'sqlite'),
    database: env('DB_FILENAME', ''),
    logging: env('APP_DEBUG', false),
    entities: ['./src/app/models/**.ts'],
    migrations: ['./src/database/migrations/**.ts'],
    cli: {
      migrationsDir: ['./src/database/migrations'],
      entitiesDir: ['./src/app/models'],
    },
  },

  /**
  |-----------------------------------------------------------------------------
  | MySQL
  |-----------------------------------------------------------------------------
  |
  | Para usar é necessário adicionar o pacote: mysql
  |
  */
  mysql: {
    type: env('DB_CONNECTION', 'mysql'),
    host: env('DB_HOST', 'localhost'),
    port: parseInt(env('DB_PORT', 3306)),
    username: env('DB_USER', 'root'),
    password: env('DB_PASS'),
    database: env('DB_NAME', ''),
    synchronize: true,
    logging: env('APP_DEBUG', false),
    entities: ['./src/app/models/**.ts'],
    migrations: ['./src/database/migrations/**.ts'],
    cli: {
      migrationsDir: ['./src/database/migrations'],
      entitiesDir: ['./src/app/models'],
    },
  },

  /**
  |-----------------------------------------------------------------------------
  | PostgreSQL
  |-----------------------------------------------------------------------------
  |
  | Para usar é necessário adicionar o pacote: pg
  |
  */
  postgres: {
    name: 'default',
    type: env('DB_CONNECTION', 'postgres'),
    host: env('DB_HOST', 'localhost'),
    port: parseInt(env('DB_PORT', 5432)),
    username: env('DB_USER', 'postgres'),
    password: env('DB_PASS'),
    database: env('DB_NAME', ''),
    synchronize: true,
    logging: env('APP_DEBUG', false),
    entities: ['./src/app/models/**.ts'],
    migrations: ['./src/database/migrations/**.ts'],
    cli: {
      migrationsDir: ['./src/database/migrations'],
      entitiesDir: ['./src/app/models'],
    },
  },
}
