import { Document } from 'mongoose'

export type IDocumentResp = Pick<
  IDocument,
  'documentName' | 'docTypeValue' | 'referenceId' | 'hashContent'
>

export interface IDocument extends Document {
  documentName: string
  docTypeValue: number
  referenceId: number
  hashContent: string
}
