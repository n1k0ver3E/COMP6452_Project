import { Document } from 'mongoose'

export type IDocumentResp = Pick<
  IDocument,
  'id' | 'documentName' | 'accountId' | 'hashContent'
>

export interface IDocument extends Document {
  id?: string
  documentName: string
  accountId: number
  hashContent: string
  documentStatus: number
}
