const { copyFileSync, existsSync } = require('fs')
const { join } = require('path')

const pathFile = join(process.cwd(), '.env')

if (!existsSync(pathFile)) {
  try {
    copyFileSync('.env.example', '.env')
  } catch (e) {
    console.log(e.message)
  }
}
