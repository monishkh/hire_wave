import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { setAllApplicants } from '@/redux/Application.Slice'

const Applicants = () => {
  const { applicants } = useSelector(store => store.application);
  

  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchApplicant = async () => {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/applicants/${params.id}`, { withCredentials: true })

      if (res.data.success) {
        dispatch(setAllApplicants(res?.data?.applicants))
      }
    }
    fetchApplicant()
  }, [])
  return (
    <>
      <Navbar />
      <div className='max-w-4xl mx-auto h-screen'>
        <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
        {/* Applicants Table */}
        <ApplicantsTable />
      </div>
      <Footer />
    </>
  )
}

export default Applicants