import { getRepository, Repository } from 'typeorm'

import { User } from '../../../models/User'
import ICreateUserDTO from '../dtos/ICreateUserDTO'
import IUserRepository from '../interfaces/IUserRepository'

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findAllUsers(): Promise<User[]> {
    let users: User[]

    users = await this.ormRepository.find()

    return users
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } })

    return user
  }

  public async create({ name, email }: ICreateUserDTO): Promise<User> {
    const users = this.ormRepository.create({ name, email })

    await this.ormRepository.save(users)

    return users
  }

  save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}
