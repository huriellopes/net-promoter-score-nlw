import { getRepository, IsNull, Not, Repository } from 'typeorm'

import { SurveyUser } from '../../../models/SurveyUser'
import ICreateSurveyUserDTO from '../dtos/ICreateSurveyUserDTO'
import ISurveyUserRepository from '../interfaces/ISurveyUserRepository'

export class SurveyUserRepository implements ISurveyUserRepository {
  private ormRepository: Repository<SurveyUser>

  constructor() {
    this.ormRepository = getRepository(SurveyUser)
  }

  public async findServeyUserOne(id: string): Promise<SurveyUser | null> {
    const surveyUser = await this.ormRepository.findOne(id)

    return surveyUser
  }

  public async findSurveyUser(user_id: string): Promise<SurveyUser | null> {
    const surveyUser = await this.ormRepository.findOne({
      where: { user_id, value: null },
      relations: ['user', 'survey'],
    })

    return surveyUser
  }

  public async findAllSurveysUsers(): Promise<SurveyUser[]> {
    let surveysUsers: SurveyUser[]

    // eslint-disable-next-line prefer-const
    surveysUsers = await this.ormRepository.find({
      relations: ['user', 'survey'],
    })

    return surveysUsers
  }

  public async findAnswerSurvey(survey_id: string): Promise<SurveyUser[]> {
    const surveyUser = await this.ormRepository.find({
      survey_id,
      value: Not(IsNull()),
    })

    return surveyUser
  }

  public async create({
    user_id,
    survey_id,
    value,
  }: ICreateSurveyUserDTO): Promise<SurveyUser> {
    const surveys = this.ormRepository.create({ user_id, survey_id, value })

    await this.ormRepository.save(surveys)

    return surveys
  }

  save(surveyUsers: SurveyUser): Promise<SurveyUser> {
    return this.ormRepository.save(surveyUsers)
  }
}
