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


export default {
  documentUpload,
  getAllDocuments,
  getDocumentsByStatus
}
