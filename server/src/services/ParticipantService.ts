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

export default {
  register,
}
