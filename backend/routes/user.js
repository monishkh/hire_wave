import express from "express";

import {authenticate} from '../middleware/Auth.js'

import { signup, login, logout, updateUser, deleteResume, updateProfilePicture } from "../controllers/user.controller.js";

import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// routes
router.post("/signup", singleUpload, signup);
router.post("/login", login);
router.get("/logout", logout);
router.put("/profile/update", authenticate, singleUpload, updateUser);
router.get("/resume/delete/:id", deleteResume)
router.put('/profile-picture-update',authenticate, singleUpload, updateProfilePicture)

export default router;
