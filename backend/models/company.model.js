import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    logo: { type: String },
    website: { type: String },
    location: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Middleware for cascading deletion
companySchema.post('findOneAndDelete', async function (doc) {
    if (doc) {


        // Delete all jobs associated with this company
        await mongoose.model('Job').deleteMany({ company: doc._id });

        // Automatically handled by Job's pre-delete hook: applications tied to those jobs will also be deleted
    }
});

export const Company = mongoose.model("Company", companySchema);
