import { DocumentModel } from '../models'
import { IDocumentResp, IDocument } from '../interfaces/document'

const documentUpload = (body: IDocumentResp) => {
  return DocumentModel.create(body)
}

const getAllDocuments = (): Promise<IDocument[]> => {
  return DocumentModel.find({}).exec();
}

const getDocumentsByStatus = (
  documentStatuses: string[] | string
): Promise<IDocument[]> => {
  // @ts-ignore
  return DocumentModel.find({
    documentStatus: { $in: documentStatuses },
  }).exec()
}
// composite keys for document Item  is accountId and subDocumentId
const updateDocStatusByAccIdSubDocId = async (
  accountId: number,
  subDocumentId: number,
  updatedStatus: number
): Promise<IDocument> => {
  // @ts-ignore
  return DocumentModel.findOneAndUpdate(
    {
      accountId: accountId,
      subDocumentId: subDocumentId,
    },
    {
      $set: {
        documentStatus: updatedStatus,
      },
    },
    {
      new: true,
    }
  )
}


export default {
  documentUpload,
  getAllDocuments,
  getDocumentsByStatus,
  updateDocStatusByAccIdSubDocId
}
