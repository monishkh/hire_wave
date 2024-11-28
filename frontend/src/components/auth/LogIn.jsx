import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { RadioGroup } from '../ui/radio-group'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/AuthSlice'

function LogIn() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const { loading, user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setUser(res.data.user));
        navigate("/")
        toast.success(res.data.message)
      }


    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center h-screen w-full'>
        <form className='w-1/3 border shadow-lg bg-white p-4 rounded-md' onSubmit={handleSubmit}>
          <h1 className=' text-2xl font-bold mb-5'>LogIn</h1>
          <div>
            <Label htmlFor='email' className='text-md cursor-pointer mb-2' >Email</Label>
            <sup className='text-red-500'>*</sup>
            <Input type='email' id='email' className='p-5 font-medium text-sm mb-3' placeholder='example@gmail.com' name='email' onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor='password' className='text-md cursor-pointer mb-2' >Password</Label>
            <sup className='text-red-500'>*</sup>
            <Input type='password' id='password' className='p-5 font-medium text-sm mb-3' placeholder='Enter Password' name='password' onChange={handleChange} />
          </div>
          <div>
            <RadioGroup defaultValue="Employee" className='flex justify-start items-center gap-5'>
              <div className='flex items-center gap-2'>
                <Input type='radio' id='Employee' value="employee" className="cursor-pointer" name='role' onChange={handleChange} checked={input.role === "employee"} />
                <Label htmlFor='Employee' className='cursor-pointer'>Employee</Label>
              </div>

              <div className='flex items-center gap-2'>
                <Input type='radio' id='recruiter' value="recruiter" className="cursor-pointer" name='role' onChange={handleChange} checked={input.role === "recruiter"} />
                <Label htmlFor='recruiter' className='cursor-pointer'>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type='submit' className='w-full mt-5 bg-blue-500 font-medium text-xl text-white p-5 hover:bg-blue-600  '>
            {loading ? "Loading..." : "Login"}
          </Button>
          <p className='text-center mt-5'>Don't have an account? <Link to='/sign-up' className='text-blue-500'>SignUp</Link></p>
        </form>
      </div>
    </>
  )
}

export default LogIn