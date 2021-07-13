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

export default {
  register,
  isAccountAlreadyRegistered,
}
