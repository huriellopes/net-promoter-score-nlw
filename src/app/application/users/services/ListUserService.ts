import { classToClass } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

import AppError from '../../../exceptions/AppError'
import { User } from '../../../models/User'
import IUsersRepository from '../interfaces/IUserRepository'

@injectable()
export default class ListUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAllUsers()

    if (users.length < 0) {
      throw new AppError('Users not found.')
    }

    return classToClass(users)
  }
}
