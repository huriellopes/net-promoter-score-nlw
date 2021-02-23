import { env } from '../helpers/environment'

export = {
  driver: env('DB_CONNECTION', 'sqlite'),

  /**
  |-----------------------------------------------------------------------------
  | SQLite
  |-----------------------------------------------------------------------------
  |
  | Para usar é necessário adicionar o pacote: sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: env('DB_DATABASE', ''),
    },
    useNullAsDefault: true,
    debug: env('DB_DEBUG', false),
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
    client: 'mysql',
    connection: {
      host: env('DB_HOST', 'localhost'),
      port: parseInt(env('DB_PORT', 3306)),
      user: env('DB_USER', 'root'),
      password: env('DB_PASSWORD', ''),
      database: env('DB_DATABASE', ''),
    },
    debug: env('DB_DEBUG', false),
  },

  /**
  |-----------------------------------------------------------------------------
  | PostgreSQL
  |-----------------------------------------------------------------------------
  |
  | Para usar é necessário adicionar o pacote: pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: env('DB_HOST', 'localhost'),
      port: parseInt(env('DB_PORT', 5432)),
      user: env('DB_USER', 'root'),
      password: env('DB_PASSWORD', ''),
      database: env('DB_DATABASE', ''),
    },
    debug: env('DB_DEBUG', false),
  },
}
