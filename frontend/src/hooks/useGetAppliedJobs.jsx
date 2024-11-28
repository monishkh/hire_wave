import { setAllAppliedJobs } from '@/redux/jobSlice'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/applied-jobs`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setAllAppliedJobs(res.data.applications
        ))
      }

    }
    fetchData()
  }, [])
}

export default useGetAppliedJobs