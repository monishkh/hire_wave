import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJob from './LatestJob'
import Footer from './shared/Footer'
import userGetAllJobs from '@/hooks/useGetAllCompanies'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  //userGetAllJobs()
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate('/admin/companies')
    }
  }, [])


  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />
      <Footer />
    </>
  )
}

export default Home