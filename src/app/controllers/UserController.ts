import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '../application/users/services/CreateUserService'
import ListUserService from '../application/users/services/ListUserService'

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService)

    const users = await listUsers.execute()

    return res.status(200).json({
      data: users,
      status: 200,
    })
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
    })

    return res.status(201).json(classToClass(user))
  }
}

export default UserController
