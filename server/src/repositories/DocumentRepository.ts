import { DocumentModel } from '../models'
import { IDocument } from '../interfaces/document'

const documentUpload = (body: IDocument) => {
  return DocumentModel.create(body)
}

export default {
  documentUpload,
}
