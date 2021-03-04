import { inject, injectable } from 'tsyringe'

// import AppError from '../../../exceptions/AppError'
import { Survey } from '../../../models/Survey'
import { IRequestSurvey } from '../interfaces/ISurvey'
import ISurveyRepository from '../interfaces/ISurveyRepository'

@injectable()
export default class CreateServeyService {
  constructor(
    @inject('SurveyRepository')
    private surveysRepository: ISurveyRepository
  ) {}

  public async execute({
    title,
    description,
  }: IRequestSurvey): Promise<Survey> {
    const survey = await this.surveysRepository.create({
      title,
      description,
    })

    return survey
  }
}
