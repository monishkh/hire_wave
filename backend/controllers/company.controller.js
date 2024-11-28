
import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";


// Create a new company
export const createCompany = async (req, res) => {
    try {

        // get company name
        const { companyname } = req.body;
       


        if (!companyname) return res.status(400).json({ message: 'Company name is required' });

        // check if company are alreay exists
        const existingCompany = await Company.findOne({ name: companyname });


        if (existingCompany) return res.status(400).json({ message: 'Company already exists' });

        // create a new company in database
        const newCompany = await Company.create({ name: companyname, userId: req.id });


        // return response
        res.status(201).json({
            success: true,
            message: 'Company created successfully',
            company: newCompany
        });


    } catch (error) {
        console.log('Error creating company', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// get company
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId })
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {

       


        // get company by id
        const id = req.params.id

        // find company by id
        const findCompany = await Company.findById({ _id: id })

        // if company not found
        if (!findCompany) return res.status(404).json({ message: 'Company not found', success: false });

        // return response
        res.status(201).json({
            findCompany,
            success: true
        })

    } catch (error) {
        console.log('Error getting company by ID:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

// update company
export const updateCompany = async (req, res) => {
    

    try {
        const { name, description, website, location } = req.body;

        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }

        if (name) company.name = name
        if (description) company.description = description
        if (website) company.website = website
        if (location) company.location = location
       

        if (req.file) {
            const file = req.file;
            // cloudinary 
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            company.logo = cloudResponse.secure_url;
        }

        await company.save();

        return res.status(200).json({
            message: "Company information updated.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// delete company


export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        
        

        // Delete the company by its ID
        const company = await Company.findOneAndDelete({ _id: companyId });

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        // Jobs and applications will be deleted automatically via middleware
        res.status(200).json({ message: "Company, associated jobs, and applications deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
