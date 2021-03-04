import { getRepository, Repository } from 'typeorm'

import { Survey } from '../../../models/Survey'
import ICreateSurveyDTO from '../dtos/ICreateSurveyDTO'
import ISurveyRepository from '../interfaces/ISurveyRepository'

export class SurveyRepository implements ISurveyRepository {
  private ormRepository: Repository<Survey>

  constructor() {
    this.ormRepository = getRepository(Survey)
  }

  public async findSurvey(id: string): Promise<Survey | null> {
    const survey = await this.ormRepository.findOne({ id: id })

    return survey
  }

  public async findAllSurveys(): Promise<Survey[]> {
    let surveys: Survey[]

    // eslint-disable-next-line prefer-const
    surveys = await this.ormRepository.find()

    return surveys
  }

  public async create({
    title,
    description,
  }: ICreateSurveyDTO): Promise<Survey> {
    const surveys = this.ormRepository.create({ title, description })

    await this.ormRepository.save(surveys)

    return surveys
  }

  save(survey: Survey): Promise<Survey> {
    return this.ormRepository.save(survey)
  }
}
