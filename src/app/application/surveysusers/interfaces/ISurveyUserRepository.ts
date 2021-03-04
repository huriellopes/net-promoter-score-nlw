import { SurveyUser } from '../../../models/SurveyUser'
import ICreateSurveyUserDTO from '../dtos/ICreateSurveyUserDTO'

export default interface ISurveyUserRepository {
  findAllSurveysUsers(): Promise<SurveyUser[]>
  findSurveyUser(user_id: string): Promise<SurveyUser | null>
  findServeyUserOne(id: string): Promise<SurveyUser | null>
  findAnswerSurvey(survey_id: string): Promise<SurveyUser[]>
  create(data: ICreateSurveyUserDTO): Promise<SurveyUser>
  save(surveyUser: SurveyUser): Promise<SurveyUser>
}
