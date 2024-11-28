import { Application } from '../models/application.model.js'
import { Job } from '../models/job.model.js'


export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };

        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getAppliedJobs = async (req, res) => {
    try {

        const  userId  = req.id
        
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                select: 'name',
                options: { sort: { createdAt: -1 } },

            }
        })

        if (!applications) return res.status(404).json({ message: 'No applications found', success: false })

        res.status(200).json({ applications, success: true })

    } catch (error) {
        console.log('Error getAppliedJobs ', error);
        res.status(500).json({ message: 'Internal server error' })
    }
}


export const getApplcantsByJob = async (req, res) => {
    try {
        const JobId = req.params.id


        const job = await Job.findById(JobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
                options: { sort: { createdAt: -1 } },
            }
        })

       
        res.status(200).json({ applicants: job, success: true })

    } catch (error) {
        console.log('Error by getApplcantsByJob: ', error);
        res.status(500).json('Internal Server Error')
    }
}


export const statusUpdate = async (req, res) => {
    try {
        const applicationId = req.params.id
        const { status } = req.body

        if (!status) return res.status(400).json({ message: 'Status is required', success: false })

        const application = await Application.findOne({ _id: applicationId })

        if (!application) return res.status(404).json({ message: 'Application not found', success: false })

        application.status = status
        await application.save()

        res.status(200).json({ message: 'Status updated successfully', success: true })

    } catch (error) {
        console.log('Error statusUpdate: ', error);
        res.status(500).json('Internal Server Error')
    }
}
