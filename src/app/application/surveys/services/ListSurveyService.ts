import { classToClass } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

import AppError from '../../../exceptions/AppError'
import { Survey } from '../../../models/Survey'
import ISurveyRepository from '../interfaces/ISurveyRepository'

@injectable()
export default class ListSurveyService {
  constructor(
    @inject('SurveyRepository')
    private surveysRepository: ISurveyRepository
  ) {}

  public async execute(): Promise<Survey[]> {
    const surveys = await this.surveysRepository.findAllSurveys()

    if (surveys.length < 0) {
      throw new AppError('Surveys not found.')
    }

    return classToClass(surveys)
  }
}
