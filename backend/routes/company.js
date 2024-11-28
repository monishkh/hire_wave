
import express from 'express';
import { createCompany, deleteCompany, getCompany, getCompanyById, updateCompany } from '../controllers/company.controller.js';
import { authenticate } from '../middleware/auth.js';
import { singleUpload } from '../middleware/multer.js';
const router = express.Router();

// create company
router.post('/create', authenticate, createCompany)

// get company
router.get('/get', authenticate, getCompany)

// get company by id
router.get('/get-company/:id', authenticate, getCompanyById)

// update company
router.put('/update/:id', authenticate, singleUpload, updateCompany)

// delete company
// router.delete('/:id', deleteCompany)
router.delete('/delete-company/:id', authenticate, deleteCompany)

// export router
export default router;

