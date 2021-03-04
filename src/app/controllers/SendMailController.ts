import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateSurveyUserService from '../application/surveysusers/services/CreateSurveyUserService'
import ListSurveyUserService from '../application/surveysusers/services/ListSurveyUserService'

class SendMailController {
  public async index(_: Request, res: Response): Promise<Response> {
    const listSurveysUsers = container.resolve(ListSurveyUserService)

    const surveysUsers = await listSurveysUsers.execute()

    return res.status(200).json({ surveysUsers, status: 200 })
  }

  public async execute(req: Request, res: Response): Promise<Response> {
    const { email, survey_id } = req.body

    const createSurveyUser = container.resolve(CreateSurveyUserService)

    const surveyUser = await createSurveyUser.execute({
      email,
      survey_id,
    })

    return res
      .status(200)
      .json({ surveyUser, message: 'Send survey in user.', status: 200 })
  }
}

export default SendMailController
