import { Document } from 'mongoose'

export interface IDocument extends Document {
  documentName: string
  docTypeValue: number
  referenceId: number
  hashContent: string
}
