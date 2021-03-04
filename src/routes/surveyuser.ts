import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import SendMailController from '../app/controllers/SendMailController'

const surveyUserRouter = Router()

const sendMailController = new SendMailController()

surveyUserRouter.get('/', sendMailController.index)

surveyUserRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      survey_id: Joi.string().required(),
    },
  }),
  sendMailController.execute
)

export default surveyUserRouter
