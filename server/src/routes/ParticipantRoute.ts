import express from 'express'
import { ParticipantController } from '../controllers'

const router = express.Router()

router.route('/status').get(ParticipantController.getParticipantsByStatus)
router.route('/register').post(ParticipantController.register)

export default router
