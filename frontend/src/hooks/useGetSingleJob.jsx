import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetSingleJob = (JobId) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${JOB_API_END_POINT}/get-jobs/${JobId}`, { withCredentials: true })

      if (res.status === 201) {
        dispatch(setSingleJob(res?.data?.findJob))
      }

    }
    fetchData()
  }, [])
}

export default useGetSingleJob