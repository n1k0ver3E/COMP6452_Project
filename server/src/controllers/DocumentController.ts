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

const getAllDocuments = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const documents = await DocumentService.getAllDocuments()

    return res.status(httpStatus.OK).json({
      success: true,
      documents,
    })
  }
)

const getDocumentsByStatus = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {

    const documentStatuses: string[] | string =
      (Object.values(req.query)[0] as string[] | string) || []

    const documents = await DocumentService.getDocumentsByStatus(
      documentStatuses
    )

    return res.status(httpStatus.OK).json({
      success: true,
      documents,
    })
  }
)


const updateDocStatusByAccIdSubDocId = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const subDocumentId = (Object.values(req.query)[0] as string)
    console.log("subDocumentId", subDocumentId)
    const accountId = (Object.values(req.query)[1] as string)
    console.log("accountId", accountId)
    console.log("body", req.body)
    const { documentStatus: updatedStatus } = req.body
    console.log("updatedStatus", updatedStatus)
    const documents = await DocumentService.updateDocStatusByAccIdSubDocId(
      parseInt(subDocumentId),
      parseInt(accountId),
      parseInt(updatedStatus)
    )

    return res.status(httpStatus.OK).json({
      success: true,
      documents,
    })
  }
)

export default {
  uploadDocument,
  getAllDocuments,
  getDocumentsByStatus,
  updateDocStatusByAccIdSubDocId,
}


