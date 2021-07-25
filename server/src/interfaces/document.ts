import { Document } from 'mongoose'

export type IDocumentResp = Pick<
  IDocument,
  'id' | 'documentName' | 'accountId' | 'hashContent'
>

export type IDocumentVerify = Pick<
  IDocument,
  'subDocumentId' | 'documentName' | 'accountId' | 'hashContent' | 'documentStatus'
>

export interface IDocument extends Document {
  //documentId: string
  subDocumentId: number
  documentName: string
  accountId: number
  hashContent: string
  documentStatus: number
}
  //'id' | 'documentName' | 'accountId' | 'hashContent'

