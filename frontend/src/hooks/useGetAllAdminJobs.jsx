import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get(`${JOB_API_END_POINT}/get-job-by-recruiter`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setAllAdminJobs(res?.data?.jobs))
      }
    }
    fetchJobs()
  }, [])
}

export default useGetAllAdminJobs