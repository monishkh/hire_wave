import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { setSingleCompany } from '@/redux/CompanySlice'
import { toast } from 'sonner'

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState()
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/create`, {companyname: companyName }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className='max-w-4xl mx-auto my-10 h-screen'>
        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Your Company Name</h1>
          <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
        </div>
        <Label className="font-bold text-lg">Company Name</Label>
        <Input
          type="text"
          className="my-2 rounded-xl py-6 text-xl font-base"
          placeholder="JobHunt, Microsoft etc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className='flex items-center gap-2 my-10'>
          <Button variant="outline" className="rounded-xl" onClick={() => navigate("/admin/companies")}>Cancel</Button>
          <Button onClick={registerNewCompany} className="bg-blue-500 text-white rounded-xl hover:bg-blue-600">Continue</Button>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default CreateCompany