import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    salary: { type: Number, required: true },
    experienceLevel: { type: Number, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    openings: { type: Number, required: true },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }]
}, { timestamps: true });

// Middleware for cascading deletion
jobSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
     
        
        // Delete all applications tied to this job
        await mongoose.model('Application').deleteMany({ job: doc._id });
    }
});

export const Job = mongoose.model("Job", jobSchema);
