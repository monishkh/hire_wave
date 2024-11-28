import React from 'react'
import { Badge } from './ui/badge'


function LatestJobCard({job}) {
    const {title, description, openings, jobType, salary, company } = job;
   
    return (
        <>
            <div className='p-5 rounded-lg shadow-lg hover:cursor-pointer'>
                <div className='flex items-center gap-2 mb-5 pb-5 border-b border-gray-200'>
                    <img src={company.logo} alt='company logo' className='w-10 h-10 rounded-full' />
                    <div>
                        <h1 className='text-lg font-bold'>{title}</h1>
                        <p className='text-gray-500'>{company.name}</p>
                    </div>
                </div>
                <p className='text-gray-500 line-clamp-5'>{description}</p>
                <div className='flex items-center justify-between gap-2 mt-3'>
                    <Badge className='text-blue-500 bg-blue-50 px-3 py-1 cursor-pointer font-bold '>{openings} Opeing</Badge>
                    <Badge className='bg-blue-50 text-red-600  cursor-pointer px-3 py-1 font-bold'>{jobType}</Badge>
                    <Badge className='cursor-pointer bg-blue-50 text-[#7209b7] font-bold '>{salary/100000} LPA</Badge>
                </div>
                
            </div>
        </>
    )
}

export default LatestJobCard