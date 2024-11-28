import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    phoneNumber: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["employee", "recruiter"],
        required: true,
    },

    profile: {
        bio: {type: String},
        skills: {type: [String]},
        resume: {type: String},
        deleteResources: {type: String},
        resumeOriginalName: {type: String},
        companyName: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
        profilePicture: {type: String, default: ""},
    }

}, {timestamps: true}); 

export const User = mongoose.model("User", userSchema);

