import { ParticipantModel } from '../models'
import { IParticipant } from '../interfaces/participant'

const register = (participantDetails: IParticipant): Promise<IParticipant> => {
  return ParticipantModel.create(participantDetails)
}

const isAccountAlreadyRegistered = async (
  accountAddress: string
): Promise<IParticipant | null> => {
  const entry = await ParticipantModel.findOne({
    accountAddress: accountAddress,
  })

  return entry
}

export default { register, isAccountAlreadyRegistered }
