import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import useGetSingleJob from '@/hooks/useGetSingleJob';
import { setSingleJob } from '@/redux/jobSlice';

const CreateJob = () => {
    const { singleJob } = useSelector(state => state.job)

    const dispatch = useDispatch()

    const params = useParams()
    useGetSingleJob(params.id)

    if (!params.id) {
        dispatch(setSingleJob(null))
    }


    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        openings: 0,
        companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(state => state.company)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value) => {
        const company = companies.find((company) => company.name.toLowerCase() === value)
        setInput({ ...input, companyId: company._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {

            setLoading(true);

            const res = await axios.post(`${JOB_API_END_POINT}${params.id ? `/update-job/${params.id}` : '/create'}`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (params.id) {
                toast.success(res?.data?.message);

            }



            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        setInput({
            title: singleJob?.title || "",
            description: singleJob?.description || "",
            requirements: singleJob?.requirements || "",
            salary: singleJob?.salary || "",
            location: singleJob?.location || "",
            jobType: singleJob?.jobType || "",
            experienceLevel: singleJob?.experienceLevel || 0,
            openings: singleJob?.openings || 0,
            companyId: singleJob?.company || ""
        })


    }, [singleJob]);

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center h-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experienceLevel"
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="openings"
                                value={input.openings}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px] bg-white">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ?

                            <Button className="w-full my-4 bg-blue-500 hover:bg-blue-600 text-white rounded "> <Loader2 className='mr-2 h-4 w-4 animate-spin  ' /> Please wait </Button>

                            :

                            <Button type="submit" className="w-full my-4 bg-blue-500 hover:bg-blue-600 text-white rounded">{params.id ? 'Update Job' : 'Post New Job'}</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
            <Footer />
        </>
    )
}

export default CreateJob