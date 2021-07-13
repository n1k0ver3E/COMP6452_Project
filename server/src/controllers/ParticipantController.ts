import { Request, Response, NextFunction } from 'express'
import httpStatus = require('http-status')
import { catchAsync } from '../utils'

const register = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    console.log('request body', req.body)

    return res.status(httpStatus.OK).json({
      success: true,
      message: 'End point under constructions',
    })
  }
)

export default {
  register,
}
