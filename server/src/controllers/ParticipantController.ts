import { Request, Response, NextFunction } from 'express'
import { ParticipantService } from '../services'
import httpStatus = require('http-status')
import { catchAsync } from '../utils'

const register = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { accountAddress } = req.body

    const alreadyRegistered =
      await ParticipantService.isAccountAlreadyRegistered(accountAddress)

    if (alreadyRegistered) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'This account address is already registered.',
      })
    }

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
