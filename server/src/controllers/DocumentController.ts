import { Request, Response, NextFunction } from 'express'
import { DocumentService } from '../services'
import httpStatus = require('http-status')
import { catchAsync } from '../utils'

const uploadDocument = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const document = await DocumentService.documentUpload(req.file, req.body)

    return res.status(httpStatus.OK).json({
      success: true,
      document,
    })
  }
)

export default {
  uploadDocument,
}
