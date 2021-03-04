import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import SurveyController from '../app/controllers/SurveyController'

const surveyRouter = Router()

const surveyController = new SurveyController()

surveyRouter.get('/', surveyController.index)
surveyRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  surveyController.create
)

export default surveyRouter
