import { container } from 'tsyringe'

import ISurveyRepository from '../../app/application/surveys/interfaces/ISurveyRepository'
import { SurveyRepository } from '../../app/application/surveys/repositories/SurveyRepository'
import ISurveyUserRepository from '../../app/application/surveysusers/interfaces/ISurveyUserRepository'
import { SurveyUserRepository } from '../../app/application/surveysusers/repositories/SurveyUserRepository'
import IUserRepository from '../../app/application/users/interfaces/IUserRepository'
import { UserRepository } from '../../app/application/users/repositories/UserRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<ISurveyRepository>(
  'SurveyRepository',
  SurveyRepository
)

container.registerSingleton<ISurveyUserRepository>(
  'SurveyUserRepository',
  SurveyUserRepository
)
