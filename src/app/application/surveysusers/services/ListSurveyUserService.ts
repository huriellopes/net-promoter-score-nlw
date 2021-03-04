import { classToClass } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

import AppError from '../../../exceptions/AppError'
import { SurveyUser } from '../../../models/SurveyUser'
import ISurveyUserRepository from '../interfaces/ISurveyUserRepository'

@injectable()
export default class ListSurveyService {
  constructor(
    @inject('SurveyUserRepository')
    private surveysUsersRepository: ISurveyUserRepository
  ) {}

  public async execute(): Promise<SurveyUser[]> {
    const surveysUsers = await this.surveysUsersRepository.findAllSurveysUsers()

    if (surveysUsers.length < 0) {
      throw new AppError('Surveys_users not found.')
    }

    return classToClass(surveysUsers)
  }

  public async calcNPS(survey_id: string): Promise<SurveyUser> {
    const surveysUsers = await this.surveysUsersRepository.findAnswerSurvey(
      survey_id
    )

    const detractor = surveysUsers.filter(
      (survey) => Number(survey.value) >= 0 && Number(survey.value) <= 6
    ).length

    const promoters = surveysUsers.filter(
      (survey) => Number(survey.value) >= 9 && Number(survey.value) <= 10
    ).length

    const passive = surveysUsers.filter(
      (survey) => Number(survey.value) >= 7 && Number(survey.value) <= 8
    ).length

    const totalAnswers = surveysUsers.length

    const calculate = Number(
      (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
    )

    return {
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate,
    }
  }
}
