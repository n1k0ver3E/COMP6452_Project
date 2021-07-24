import { IDocument } from '../interfaces/document'
import { Model, model, Schema } from 'mongoose'
import { DocumentType, DocumentStatus } from '../enums/documentContract'

const DocumentSchema: Schema = new Schema(
  {
    documentName: {
      type: String,
      required: true,
    },
    docTypeValue: {
      type: Number,
      enum: Object.values(DocumentType),
      required: true,
    },
    referenceId: {
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
      required: true,
    },
  },
  { timestamps: true }
)

const Document: Model<IDocument> = model('Document', DocumentSchema)

export default Document
