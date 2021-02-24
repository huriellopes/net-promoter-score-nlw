import 'reflect-metadata'
import '../helpers/environment'
import 'dotenv/config'
import 'express-async-errors'
import '../database'
import './container'

import { errors } from 'celebrate'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import AppError from '../app/exceptions/AppError'
import { config } from '../helpers/environment'
import routes from '../routes'

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errors())
app.use(routes)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message })
  }

  if (config('app.debug')) {
    console.log(err)
    return res.status(400).json({ status: 'error debug', message: err })
  } else {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error!' })
  }
})

export default app
