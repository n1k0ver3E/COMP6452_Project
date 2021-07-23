import { Request, Response, NextFunction } from 'express'
import { DocumentService } from '../services'
import httpStatus = require('http-status')
import { catchAsync } from '../utils'

const uploadDocument = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const document = await DocumentService.documentUpload(req.body)

    return res.status(httpStatus.CREATED).json({
      success: true,
      document,
    })
  }
)

export default {
  uploadDocument,
}
