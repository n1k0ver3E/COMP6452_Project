import { Document } from 'mongoose'

export type IDocumentResp = Pick<
  IDocument,
  'id' | 'documentName' | 'docTypeValue' | 'referenceId' | 'hashContent'
>

export interface IDocument extends Document {
  id?: string
  documentName: string
  docTypeValue: number
  referenceId: number
  hashContent: string
}
