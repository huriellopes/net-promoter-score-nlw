import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import UserController from '../app/controllers/UserController'

const userRouter = Router()

const userController = new UserController()

userRouter.get('/', userController.index)
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  userController.create
)

export default userRouter
