import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AnswerService from '../application/surveysusers/services/AnswerService'

class AnswerController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const { value } = req.params
    const { u } = req.query

    const answerService = container.resolve(AnswerService)

    const answer = await answerService.execute(Number(value), String(u))

    return res.status(201).json({ answer, status: 201 })
  }
}

export default AnswerController
