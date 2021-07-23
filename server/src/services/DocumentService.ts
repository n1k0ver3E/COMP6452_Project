import { DocumentRepository } from '../repositories'
import { IDocument } from '../interfaces/document'

const documentUpload = (body: IDocument) => {
  return DocumentRepository.documentUpload(body)
}

export default {
  documentUpload,
}
