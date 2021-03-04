import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListSurveyUserService from '../application/surveysusers/services/ListSurveyUserService'

class NpsController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const { survey_id } = req.params

    const surveysAnweser = container.resolve(ListSurveyUserService)

    const answers = await surveysAnweser.calcNPS(survey_id)

    return res.status(200).json({ answers, status: 200 })
  }
}

export default NpsController
