import React from 'react'
// import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import LatestJobCard from './LatestJobCard';
import userGetAllJobs from '@/hooks/useGetAllCompanies';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    useGetAllJobs()
    const { allJobs } = useSelector(state => state.job)
   

    return (
        <div className='max-w-6xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-blue-500'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs?.length <= 0 ? <span className='font-base text-lg text-gray-500'>No Jobs Available</span> : allJobs?.slice(0, 6).map((job) => (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            key={job?._id}>
                            <LatestJobCard job={job} />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}

export default LatestJobs