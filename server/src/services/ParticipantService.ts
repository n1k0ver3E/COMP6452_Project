import { ParticipantRepository } from '../repositories'
import {
  IParticipant,
  ITransformedParticipant,
} from '../interfaces/participant'

const register = async (
  participantDetails: IParticipant
): Promise<ITransformedParticipant> => {
  const participant = await ParticipantRepository.register(participantDetails)

  return {
    accountAddress: participant.accountAddress,
    accountId: participant.accountId,
    accountName: participant.accountName,
    accountStatus: participant.accountStatus,
    accountType: participant.accountType,
  }
}

const isAccountAlreadyRegistered = async (
  accountAddress: string
): Promise<boolean> => {
  const account = await ParticipantRepository.isAccountAlreadyRegistered(
    accountAddress
  )

  return account !== null
}

const getParticipantsByStatus = async (
  accountStatus: string[] | string
): Promise<ITransformedParticipant[]> => {
  const results = await ParticipantRepository.getParticipantsByStatus(
    accountStatus
  )

  const participants = results.map((item: IParticipant) => {
    return {
      id: item._id,
      accountAddress: item.accountAddress,
      accountId: item.accountId,
      accountName: item.accountName,
      accountStatus: item.accountStatus,
      accountType: item.accountType,
    }
  })

  return participants
}

export default {
  register,
  isAccountAlreadyRegistered,
  getParticipantsByStatus,
}
