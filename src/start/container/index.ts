import { container } from 'tsyringe'

import IUserRepository from '../../app/application/users/interfaces/IUserRepository'
import { UserRepository } from '../../app/application/users/repositories/UserRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
