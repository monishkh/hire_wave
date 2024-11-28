import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Job from './Job'
import Filter from './Filter'
import userGetAllJobs from '@/hooks/useGetAllCompanies'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { setSearchedQuery } from '@/redux/jobSlice'

const random = [1, 2, 3]

function Browse() {
  useGetAllJobs()

  const { allJobs } = useSelector(state => state.job)

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className='w-[80%] mx-auto min-h-screen'>
        <h1 className='text-xl font-bold my-10'>Search Result ( {allJobs.length} )</h1>
        <div className='grid grid-cols-3 gap-4'>
          {allJobs.map((job) => (
            <Job job={job} key={job._id} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Browse