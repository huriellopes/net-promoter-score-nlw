import { celebrate, Joi, Segments } from 'celebrate'
import { Request, Response, Router } from 'express'

import AnswerController from '../app/controllers/AnswerController'
import NpsController from '../app/controllers/NpsController'
import surveyRouter from './survey'
import surveyUserRouter from './surveyuser'
import userRouter from './user'

const routes = Router()

const answerController = new AnswerController()
const npsController = new NpsController()

// Test Route
routes.get('/test', (_: Request, res: Response) => {
  return res.status(200).json({
    message: 'api is working.',
    status: 200,
  })
})

routes.use('/users', userRouter)
routes.use('/surveys', surveyRouter)
routes.use('/send', surveyUserRouter)
routes.get(
  '/answers/:value',
  celebrate({
    [Segments.PARAMS]: {
      value: Joi.number().required(),
    },
  }),
  answerController.execute
)

routes.get(
  '/nps/:survey_id',
  celebrate({
    [Segments.PARAMS]: {
      survey_id: Joi.string().required(),
    },
  }),
  npsController.execute
)

export default routes
