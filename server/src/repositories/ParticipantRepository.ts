import { ParticipantModel } from '../models'
import { IParticipant } from '../interfaces/participant'

const register = (participantDetails: IParticipant): Promise<IParticipant> => {
  return ParticipantModel.create(participantDetails)
}

export default { register }
