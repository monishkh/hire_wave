import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';

const CompaniesTable = () => {
    // useGetAllCompanies()
    const { companies, searchCompanyByText } = useSelector(state => state.company)
    const [filterCompany, setFilterCompany] = useState(companies)

    useEffect(() => {
        setFilterCompany(companies.filter(company => company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())))
    }, [searchCompanyByText, companies])

    const handeDelete = async (id) => {
        // Delete company logic here
        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete-company/${id}`, { withCredentials: true })


        } catch (error) {
            console.log('handeDelete', error);
        }
    }

    const navigate = useNavigate()
    return (
        <>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr className='hover:bg-slate-50 hover:shadow-md' key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} alt="Company Logo" />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>

                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => handeDelete(company._id)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Trash className='w-4' />
                                                <span>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default CompaniesTable;
