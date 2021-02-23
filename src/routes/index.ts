import { Request, Response, Router } from 'express'

import userRouter from './user'

const routes = Router()

// Test Route
routes.get('/test', (_: Request, res: Response) => {
  return res.status(200).json({
    message: 'api is working.',
    status: 200,
  })
})

routes.use('/users', userRouter)

export default routes
