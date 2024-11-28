import { Job } from "../models/job.model.js";


// create job for employer by recruiter
export const createJob = async (req, res) => {
    try {

        // get job data from body
        const { title, description, location, salary, companyId, requirements, experienceLevel, jobType, openings, } = req.body

        const userId = req.id

        //check if all fields are required

        if (!title || !description || !location || !salary || !companyId || !requirements || !experienceLevel || !jobType || !openings) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // create job
        const job = await Job.create({
            title,
            description,
            location,
            salary: Number(salary),
            requirements: requirements.split(','),
            experienceLevel,
            jobType,
            openings: Number(openings),
            company: companyId,
            created_by: userId
        })

        // return response
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });

    } catch (error) {
        console.log('Error Create Job: ', error);
        res.status(500).json({ message: 'Internal server error' })
    }
}



// get query
export const getQuery = async (req, res) => {
    try {

        // find query from request
        const keyword = req.query.keyword || ""

        // query logic
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                //{ description: { $regex: keyword, $options: "i" } },
                // { requirements: { $elemMatch: { $regex: keyword, $options: "i" } } }
            ]
        };

        // find query
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });


       
        // if query not found 
        if (!jobs) return res.status(404).json({
            message: "Job not find",
            success: false
        })


        // send response
        res.status(201).json(jobs)

    } catch (error) {
        console.log('Error getJobById ', error);
        res.status(500).json({ message: 'Internal server error' })
    }
}


// find job by id
export const getJobById = async (req, res) => {
    try {

        // get id from req params
        const JobId = req.params.id

        if (!JobId) return res.status(404).json({message: 'Please Provide Id'})

        // find job
        const findJob = await Job.findById({ _id: JobId }).populate([
            { path: 'applications' }
        ]);


        // if not found
        if (!findJob) return res.status(404).json({
            message: "can't find",
            success: false
        })

        // response send 
        res.status(201).json({ message: "find done", findJob })


    } catch (error) {
        console.log('Error getJobById ', error);
        res.status(500).json('Internal server error')
    }
}

// recruier want to know how many job he created
export const getJobByRecruiter = async (req, res) => {
    try {
        // get recruiter id from user
        const recruiterId = req.id

        // find job by recruiter id
        const jobs = await Job.find({ created_by: recruiterId }).populate({
            path: 'company',
            createdAt: -1
        });

        if (!jobs) return res.status(404).json({ message: 'Job not found', success: false })

        // response send
        res.status(200).json({ jobs, success: true })
    } catch (error) {
        console.log('Error getJobByRecruiter ', error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

// update job 
export const getUpdateJob = async(req, res) => {
    try {
        const jobId = req.params 
        const { title, description, location, salary, requirements, experienceLevel, jobType, openings } = req.body 

        // find job by id
        const job = await Job.findByIdAndUpdate({_id: jobId.id}, {
            title,
            description,
            location,
            salary: Number(salary),
            requirements,
            experienceLevel,
            jobType,
            openings: Number(openings)
        }, { new: true })
        
        res.status(201).json({message: 'Job Update Successfully',job})
        
    } catch (error) {
        console.log('JobUpdate Error', error);
        res.status(500).json({message: 'Interal Server Error'})
    }
}
