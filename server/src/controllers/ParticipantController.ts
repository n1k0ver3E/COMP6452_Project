import { Request, Response, NextFunction } from 'express'
import { ParticipantService } from '../services'
import httpStatus = require('http-status')
import { catchAsync } from '../utils'

const register = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const participantDetails = await ParticipantService.register(req.body)

    return res.status(httpStatus.OK).json({
      success: true,
      participantDetails,
    })
  }
)

export default {
  register,
}
