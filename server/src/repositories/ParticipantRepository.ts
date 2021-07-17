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

const getParticipantsByStatus = (
  accountStatuses: string[] | string
): Promise<IParticipant[]> => {
  // @ts-ignore
  return ParticipantModel.find({
    accountStatus: { $in: accountStatuses },
  }).select('-__v')
}

export default { register, isAccountAlreadyRegistered, getParticipantsByStatus }
