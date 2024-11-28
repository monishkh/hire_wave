import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Job from './Job'
import Filter from './Filter'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'

import { motion } from 'framer-motion'

// const jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function Jobs() {

  useGetAllJobs()
  const { allJobs, searchedQuery } = useSelector(state => state.job)
  const [filterJob, setFilterJob] = useState(allJobs)

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchedQuery) {
      setFilterJob(allJobs.filter(job =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      ))
    } else {
      setFilterJob(allJobs)
    }


  }, [searchedQuery, dispatch])



  return (
    <>
      <Navbar />
      <div className='flex  justify-center min-h-screen'>
        <div className='w-[20%]'>
          <Filter />
        </div>
        <div className='w-[80%] grid grid-cols-3 gap-4 p-4'>
          {filterJob?.length <= 0 ? <span className='text-center'>No Jobs Available</span> : filterJob.map((job) => (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              key={job?._id} >
              <Job job={job} />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Jobs