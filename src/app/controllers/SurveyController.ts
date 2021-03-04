import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateSurveyService from '../application/surveys/services/CreateSurveyService'
import ListSurveyService from '../application/surveys/services/ListSurveyService'

class SurveyController {
  public async index(_: Request, res: Response): Promise<Response> {
    const listSurveys = container.resolve(ListSurveyService)

    const surveys = await listSurveys.execute()

    return res.status(200).json({
      surveys,
      status: 200,
    })
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body

    const createSurvey = container.resolve(CreateSurveyService)

    const survey = await createSurvey.execute({ title, description })

    const data = classToClass(survey)

    return res.status(201).json({ status: 201, data })
  }
}

export default SurveyController
