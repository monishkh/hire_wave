import React from 'react';
import { Badge } from './ui/badge';

function LatestJobCard({ job }) {
    const { title, description, openings, jobType, salary, company } = job;

    return (
        <>
        
            <div className="p-5 rounded-lg shadow-lg hover:cursor-pointer bg-white transition-transform transform hover:scale-105">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5 pb-5 border-b border-gray-200">
                    {/* Company Logo */}
                    <img
                        src={company.logo}
                        alt="company logo"
                        className="w-16 h-16 sm:w-10 sm:h-10 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-lg font-bold">{title}</h1>
                        <p className="text-gray-500">{company.name}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 line-clamp-3 sm:line-clamp-5">{description}</p>

                {/* Badges Section */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mt-3">
                    <Badge className="text-blue-500 bg-blue-50 px-3 py-1 cursor-pointer font-bold">
                        {openings} Openings
                    </Badge>
                    <Badge className="bg-blue-50 text-red-600 cursor-pointer px-3 py-1 font-bold">
                        {jobType}
                    </Badge>
                    <Badge className="cursor-pointer bg-blue-50 text-[#7209b7] font-bold">
                        {salary / 100000} LPA
                    </Badge>
                </div>
            </div>
        </>
    );
}

export default LatestJobCard;
