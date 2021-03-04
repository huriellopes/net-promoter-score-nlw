import { User } from '../../../models/User'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

export default interface IUserRepository {
  findAllUsers(): Promise<User[]>
  findByEmail(email: string): Promise<User | null>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
