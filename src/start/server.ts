import { config } from '../helpers/environment'
import app from './app'

const port = config('app.port')

app.listen(port, () => {
  console.log(`🚀 Server running on the port: ${port}`)
})
