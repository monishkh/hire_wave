import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { EyeClosedIcon, EyeIcon, EyeOff, PictureInPicture2, PictureInPictureIcon, PowerOffIcon, UploadIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [input, setInput] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        setInput({ ...input, file: e.target.files[0] })
    }

    const handleSubmit = async (e) => {


        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("username", input.username);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);


        if (input.file) {
            formData.append("file", input.file)
        }





        try {

            const res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            })

            if (res.status === 201) {
                navigate("/log-in")
                toast.success(res.data.message)
            }



        } catch (error) {
            console.log('SignUp Error: ', error);
            toast.error(error.response.data.message)
        }
    }



    return (
        <>
            <Navbar />

            <div className='flex justify-center items-center h-screen'>
                <form className='w-6/12  border shadow-lg bg-white p-4 rounded-md' onSubmit={handleSubmit}>
                    <h1 className='font-bold text-2xl mb-5'>SignUp</h1>
                    <div>

                        <Label
                            htmlFor='fullName'
                            className='text-md cursor-pointer mb-2'>
                            Full Name
                        </Label>
                        <sup className='text-red-500'>*</sup>
                        <Input
                            type='text'
                            placeholder='Full Name'
                            id='username'
                            name='username'
                            value={input.username}
                            onChange={handleChange}
                            className='p-5 font-medium text-sm mb-3'
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor='email'
                            className='text-md cursor-pointer'
                        >
                            Email
                        </Label>
                        <sup className='text-red-500'>*</sup>
                        <Input
                            type='email'
                            placeholder='example@gmail.com'
                            id='email'
                            name='email'
                            value={input.email}
                            onChange={handleChange}
                            className='p-5 font-medium text-sm mb-3'
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor='phoneNumber'
                            className='text-md cursor-pointer'
                        >
                            Phone Number
                        </Label>

                        <Input
                            type='text'
                            placeholder='Phone Number'
                            id='phoneNumber'
                            name='phoneNumber'
                            value={input.phoneNumber}
                            onChange={handleChange}
                            className='p-5 font-medium text-sm mb-3'
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor='password'
                            className='text-md cursor-pointer'
                        >
                            Password
                        </Label>
                        <sup className='text-red-500'>*</sup>
                        <div className='flex justify-between items-center shadow-sm mb-3  gap-5'>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter Password'
                                id='password'
                                name='password'
                                value={input.password}
                                onChange={handleChange}
                                className='p-5 font-medium text-sm'
                            />
                            {showPassword ? <EyeOff onClick={() => setShowPassword(!showPassword)} /> : <EyeIcon onClick={() => setShowPassword(!showPassword)} />}
                        </div>



                        <div className='flex justify-between items-center gap-5 pt-2'>

                            <RadioGroup className='flex justify-start items-center gap-5'>
                                <div className="flex items-center space-x-5">
                                    <Input
                                        type='radio'
                                        id='Employee'
                                        value="employee"
                                        name='role'
                                        checked={input.role === "employee"}
                                        onChange={handleChange}
                                        className="cursor-pointer" />
                                    <Label htmlFor="Employee" className='text-sm cursor-pointer'>Employee</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type='radio'
                                        id='Recruiter'
                                        value="recruiter"
                                        checked={input.role === "recruiter"}
                                        name='role'
                                        onChange={handleChange}
                                        className="cursor-pointer" />
                                    <Label htmlFor="Recruiter" className='text-sm cursor-pointer'>Recruiter</Label>
                                </div>
                            </RadioGroup>



                            <Label htmlFor="p" className='flex items-center gap-5'>Profile Picture <UploadIcon htmlFor="p" /> </Label>

                            <Input id="p" type='file' className='hidden' onChange={handleFileChange} />




                        </div>



                        <Button type='submit' className='w-full mt-5 bg-blue-500 font-medium text-xl text-white p-5 hover:bg-blue-600  '>SignUp</Button>

                    </div>
                    <p className='text-center mt-5'>Already have an account? <Link to='/log-in' className='text-blue-500'>Login</Link></p>
                </form>
            </div>
        </>
    )
}

export default Signup