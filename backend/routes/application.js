
import express from 'express'
import { applyJob, getAppliedJobs, getApplcantsByJob, statusUpdate } from '../controllers/application.contrller.js'
import {authenticate} from '../middleware/Auth.js'

const router = express.Router()


router.get('/apply-job/:id', authenticate, applyJob)
router.get('/applied-jobs', authenticate, getAppliedJobs)
router.get('/applicants/:id', authenticate, getApplcantsByJob)
router.put('/status-update/:id', authenticate, statusUpdate)


export default router
