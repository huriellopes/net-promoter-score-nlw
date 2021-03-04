import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'

import { config } from '../../../../helpers/environment'
import AppError from '../../../exceptions/AppError'
import { SurveyUser } from '../../../models/SurveyUser'
import SendMailService from '../../mail/services/SendMailService'
import ISurveyRepository from '../../surveys/interfaces/ISurveyRepository'
import IUsersRepository from '../../users/interfaces/IUserRepository'
import { IRequestSurveyUser } from '../interfaces/ISurveyUser'
import ISurveyUserRepository from '../interfaces/ISurveyUserRepository'

@injectable()
export default class CreateServeyUserService {
  constructor(
    @inject('SurveyUserRepository')
    private surveysUsersRepository: ISurveyUserRepository,

    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('SurveyRepository')
    private surveysRepository: ISurveyRepository
  ) {}

  public async execute({
    email,
    survey_id,
    value,
  }: IRequestSurveyUser): Promise<SurveyUser> {
    const npsPath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'views',
      'emails',
      'npsMail.hbs'
    )

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found.')
    }

    const survey = await this.surveysRepository.findSurvey(survey_id)

    if (!survey) {
      throw new AppError('Survey not found.')
    }

    const surveyUserAlreadyExists = await this.surveysUsersRepository.findSurveyUser(
      user.id
    )

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: config('app.url'),
    }

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id
      await SendMailService.execute(email, survey.title, variables, npsPath)

      throw new AppError(
        `A pesquisa já foi enviada para o usuário ${user.name}.`,
        200
      )
    }

    const surveyUser = await this.surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
      value,
    })

    variables.id = surveyUser.id

    await SendMailService.execute(email, survey.title, variables, npsPath)

    return surveyUser
  }
}
