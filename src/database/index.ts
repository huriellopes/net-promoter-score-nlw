import { createConnections } from 'typeorm'

createConnections()
  .then((connection) => {
    console.log('conectou.')
  })
  .catch((error) => console.log(error))
