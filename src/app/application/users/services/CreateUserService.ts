import { inject, injectable } from 'tsyringe'

import AppError from '../../../exceptions/AppError'
import { User } from '../../../models/User'
import { IRequestUser } from '../interfaces/IUser'
import IUsersRepository from '../interfaces/IUserRepository'

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email }: IRequestUser): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('User already is created.')
    }

    const user = await this.usersRepository.create({
      name,
      email,
    })

    return user
  }
}
