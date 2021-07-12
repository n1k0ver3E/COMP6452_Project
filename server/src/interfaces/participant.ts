import { Document } from 'mongoose'

export interface IParticipant extends Document {
  accountAddress: string
  accountId: number
  accountName: string
  accountStatus: number
  accountType: number
}
