import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../ui/input';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import AdminJobsTable from './AdminJobsTable';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

function AdminJobs() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch()
    const { allAdminJobs } = useSelector(state => state.job)



    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])

    useGetAllAdminJobs()
    return (
        <>
            <Navbar />
            <div className='max-w-5xl mx-auto my-10 h-screen'>
                <div className='flex item-centers justify-between'>
                    <Input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className="w-fit rounded"
                        placeholder="filter by name, role " />
                    <Link to={'/admin/jobs/create'}>
                        <Button className="bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white hover:shadow-lg">New jobs</Button>
                    </Link>
                </div>
                <AdminJobsTable />
            </div>

            <Footer />
        </>
    )
}

export default AdminJobs