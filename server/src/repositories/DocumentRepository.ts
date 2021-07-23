import { DocumentModel } from '../models'
import { IDocumentResp } from '../interfaces/document'

const documentUpload = (body: IDocumentResp) => {
  return DocumentModel.create(body)
}

export default {
  documentUpload,
}
