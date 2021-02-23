import 'dotenv/config'

import { existsSync } from 'fs'
import { join, resolve } from 'path'

/**
 * Helper utilizado em ~/src/config para tornar amigável a criação de arquivos
 * de configuração.
 *
 * @param {string} param
 * @param {any} defaultValue
 * @returns {any}
 */
function env(param: string, defaultValue?: any): any {
  return process.env[param.toUpperCase() || defaultValue]
}

/**
 * Helper utilizado no escopo geral da aplicação para acessar configurações
 * contidas em ~/src/config considerando o nome_arquivo.chave_principal.
 *
 * @param {string} param
 * @returns {any}
 */
function config(param: string): any {
  const [file, ...keys] = param.split('.')

  const rootPath = resolve(process.cwd(), 'src', 'config')
  const pathFile = join(rootPath, file + '.ts')

  if (existsSync(pathFile)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const configs = require(pathFile)

    if (keys) {
      return keys.reduce((object, key) => {
        return ((object || {}) as any)[key]
      }, configs)
    }

    return configs
  }
}

export { env, config }
