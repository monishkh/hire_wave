import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";





// Signup 
export const signup = async (req, res) => {
    try {

        // get user data from request body
        const { username, email, password, phoneNumber, role } = req.body;


        let cloudResponse

        // check if all fields are provided
        if (!username || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (req.file) {
            const file = req.file
            const fileUri = getDataUri(file)
            cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        }

        // check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // check if phone number already exists
        const existingPhoneNumber = await User.findOne({ phoneNumber });
        if (existingPhoneNumber) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user in database
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            phoneNumber, role,
            profile: {
                profilePicture: cloudResponse?.secure_url,
            }
        });


        // send response
        res.status(201).json({ message: "User created successfully", user: user });

    } catch (error) {
        console.log('Error in signup', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Login
export const login = async (req, res) => {

    try {
        // get user data from request body
        const { email, password, role } = req.body;

        // check if all fields are provided
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if user exists
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // check if role is correct
        if (role !== user.role) {
            return res.status(400).json({ message: "Crunnet Role not exit" });
        }

        // check if password is correct
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // create token
        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // send response
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }



        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.username}`,
            user,
            success: true
        })


    } catch (error) {
        console.log('Error in login', error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// logout
export const logout = async (req, res) => {

    res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "Logged out successfully" });
}

// update user
export const updateUser = async (req, res) => {
    try {
        const { username, email, phoneNumber, bio, skills } = req.body;

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; // middleware authentication

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        // updating data
        if (username) user.username = username
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // resume comes later here...

        if (req.file) {
            const file = req.file;
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            if (cloudResponse) {
                const cloudUri = cloudResponse.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');

                user.profile.resume = cloudUri // save the cloudinary url
                user.profile.resumeOriginalName = file.originalname // Save the original file name
                user.profile.deleteResources = cloudResponse.public_id
            }

        }




        await user.save();

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// delete resume
export const deleteResume = async (req, res) => {
    try {
        const userId = req.params.id


        const user = await User.findById(userId)


        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (user.profile.resumeOriginalName) {
            // Delete the resume from cloudinary
            await cloudinary.uploader.destroy(user.profile.deleteResources);
        }

        // Update resume field in user document

        user.profile.resume = '';
        user.profile.resumeOriginalName = '';
        user.profile.deleteResources = '';

        await user.save();

        res.status(200).json({ message: `${user.username}, your resume was deleted successfully.`, user });


    } catch (error) {
        console.log('delete resume error', error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// update profile picture
export const updateProfilePicture = async (req, res) => {
    try {

        const Profilepicture = req.file

        if (!Profilepicture) {
            return res.status(400).json({ message: 'No profile picture provided' })
        }

        const userId = req.id;



        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const fileUri = getDataUri(Profilepicture);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        user.profile.profilePicture = cloudResponse.secure_url;
        await user.save();

        res.status(200).json({ message: `${user.username}, your profile picture was updated successfully.`, user });

    } catch (error) {
        console.log('Profile Picture Error', error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}




