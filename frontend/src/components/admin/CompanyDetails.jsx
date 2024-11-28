import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { useSelector } from 'react-redux'

const CompanyDetails = () => {
    const params = useParams()

    useGetCompanyById(params.id)

    const { singleCompany } = useSelector(state => state.company)



    // const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })





    //const companyId = params.id
    const navigate = useNavigate()


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })

    }

    const submitHandler = async (e) => {
        e.preventDefault()



        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                navigate('/admin/companies')
            }

        } catch (error) {
            console.log('Company SetUp error', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null
        })
    }, [singleCompany]);

    return (
        <>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ?
                            <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
                            <Button type="submit" className="w-full my-4 hover:bg-blue-600 hover:text-white bg-blue-500 text-white">Update</Button>
                    }
                </form>
            </div>
            <Footer />
        </>
    )
}

export default CompanyDetails