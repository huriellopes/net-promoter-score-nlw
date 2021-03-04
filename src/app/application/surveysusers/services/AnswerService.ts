import { inject, injectable } from 'tsyringe'

import AppError from '../../../exceptions/AppError'
import { SurveyUser } from '../../../models/SurveyUser'
import ISurveyUserRepository from '../interfaces/ISurveyUserRepository'

@injectable()
export default class AnswerController {
  constructor(
    @inject('SurveyUserRepository')
    private surveysUsersRepository: ISurveyUserRepository
  ) {}

  public async execute(value: number, u: string): Promise<SurveyUser> {
    const surveyUser = await this.surveysUsersRepository.findServeyUserOne(u)

    if (!surveyUser) {
      throw new AppError('Survey User does not exists.')
    }

    surveyUser.value = value

    await this.surveysUsersRepository.save(surveyUser)

    return surveyUser
  }
}
