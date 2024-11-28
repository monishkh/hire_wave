
import express from 'express'
import { createJob, getQuery, getJobById, getJobByRecruiter, getUpdateJob } from '../controllers/job.controller.js'
import { authenticate } from '../middleware/auth.js'
const router = express.Router()


// create job routes
router.post('/create', authenticate, createJob)
router.get('/get-query', authenticate, getQuery)
router.get('/get-jobs/:id', authenticate, getJobById)
router.get('/get-job-by-recruiter', authenticate, getJobByRecruiter)
router.post('/update-job/:id', authenticate, getUpdateJob)

export default router

