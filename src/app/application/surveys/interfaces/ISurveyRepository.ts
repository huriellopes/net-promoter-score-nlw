import { Survey } from '../../../models/Survey'
import ICreateSurveyDTO from '../dtos/ICreateSurveyDTO'

export default interface ISurveyRepository {
  findSurvey(id: string): Promise<Survey | null>
  findAllSurveys(): Promise<Survey[]>
  create(data: ICreateSurveyDTO): Promise<Survey>
  save(survey: Survey): Promise<Survey>
}
