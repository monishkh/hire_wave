import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { Link, useParams } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/CompanySlice'

const AdminCompanies = () => {


    useGetAllCompanies()

    const [input, setInput] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input])

    useGetAllCompanies()
    return (
        <>
            <Navbar />
            <div className='max-w-5xl mx-auto my-10 h-screen'>
                <div className='flex item-centers justify-between'>
                    <Input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className="w-fit rounded p-4 font-medium"
                        placeholder="filter by name " />
                    <Link to={'/admin/create-comapny'}>
                        <Button className=" bg-blue-500 text-white rounded  hover:bg-blue-600 hover:text-white hover:shadow-lg">New Companies</Button>
                    </Link>
                </div>
                <CompaniesTable />
            </div>

            <Footer />
        </>
    )
}

export default AdminCompanies