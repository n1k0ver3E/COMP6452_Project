import { IDocument } from '../interfaces/document'
import { Model, model, Schema } from 'mongoose'
import { DocumentType, DocumentStatus } from '../enums/documentContract'

const DocumentSchema: Schema = new Schema(
  {
    documentName: {
      type: String,
      required: true,
    },
    accountId: {
      type: Number,
      required: true,
    },
    hashContent: {
      type: String,
      required: true,
    },
    documentStatus: {
      type: Number,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.PENDING,
    },
  },
  { timestamps: true }
)

const Document: Model<IDocument> = model('Document', DocumentSchema)

export default Document
