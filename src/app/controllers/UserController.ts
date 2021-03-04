import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import * as yup from 'yup'

import CreateUserService from '../application/users/services/CreateUserService'
import ListUserService from '../application/users/services/ListUserService'
import AppError from '../exceptions/AppError'

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService)

    const users = await listUsers.execute()

    return res.status(200).json({
      users,
      status: 200,
    })
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body

    const createUser = container.resolve(CreateUserService)

    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório.'),
      email: yup
        .string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    })

    if (!(await schema.isValid(req.body))) {
      throw new AppError('Validation Failed!')
    }

    const user = await createUser.execute({
      name,
      email,
    })

    const data = classToClass(user)

    return res.status(201).json({
      status: 201,
      data,
    })
  }
}

export default UserController
