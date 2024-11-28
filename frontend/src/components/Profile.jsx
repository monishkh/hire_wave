import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './shared/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Contact, Delete, DeleteIcon, Mail, MapPin, Pen, PhoneCall, Trash, Trash2, Upload } from 'lucide-react'
import { Button } from './ui/button'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/AuthSlice'
import { toast } from 'sonner'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Skills = ['React', 'Node', 'Express', 'MongoDB', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Git', 'Docker', 'Kubernetes']

function Profile() {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(state => state.auth)



    const dispatch = useDispatch()

    useGetAppliedJobs()

    const handleDeleteResume = async () => {
        // delete resume logic here
        try {
            const res = await axios.get(`${USER_API_END_POINT}/resume/delete/${user?._id}`)
           
            if (res.status === 200) {

                // update user in the store
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)

            }

        } catch (error) {
            console.log('delete resume error', error);

        }
    }

    const handleUploadProfile = async (e) => {
        // Log the event to check the structure
        

        // Get the first file selected by the user
        const file = e.target.files[0];

        // Create a FormData object
        const formData = new FormData();
        formData.append("file", file);
        // Send the form data to the server
        try {
            const res = await axios.put(`${USER_API_END_POINT}/profile-picture-update`, formData, { withCredentials: true })
           
            if (res.status === 200) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log('profile picture error', error);

        }

    };


    return (
        <>
            <Navbar />

            {/* Profile Section */}
            <div className='max-w-4xl mx-auto bg-white rounded-2xl my-5 p-5 border border-gray-200 shadow-md 
            hover:shadow-xl transition-shadow duration-300'>
                {/* Profile Header */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>

                        <div className="relative group w-24 h-24">
                            <Avatar className="w-full h-full">
                                <AvatarImage
                                    className="object-cover transition-all duration-200 rounded-full group-hover:opacity-50"
                                    src={`${user?.profile?.profilePicture
                                        ? user?.profile?.profilePicture
                                        : "https://github.com/shadcn.png"
                                        }`}
                                    alt={user?.username ? user?.username : "User Profile"}
                                />
                                <AvatarFallback>
                                    {user ? user?.username?.charAt(0) : "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <label
                                    htmlFor="upload-profile"
                                    className="text-white text-sm font-semibold cursor-pointer flex items-center gap-2"
                                >
                                    <Upload className="w-5 h-5" /> Upload
                                </label>
                                <input
                                    id="upload-profile"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleUploadProfile(e)}
                                />
                            </div>
                        </div>



                        { /* <Avatar className="w-24 h-24">
                            <AvatarImage
                                className='object-cover hover:bg-transprent hover:scale-120 transition-all duration-100
                            hover:border-4 hover:border-blue-500 rounded-full hover:cursor-pointer hover:p-1'
                                src={`${user?.profile?.profilePicture ? user?.profile?.profilePicture : "https://github.com/shadcn.png"}`}
                                alt={user?.username ? user?.username : 'User Profile'} />
                            <AvatarFallback>{user ? user?.username?.charAt(0) : 'U'}</AvatarFallback>
                        </Avatar> */ }
                        <div>
                            <h1 className='text-xl font-bold'>{user ? user?.username : "User Name"}</h1>
                            <p className='text-base  text-gray-500'>{user ? user?.profile?.bio : "I'm a software engineer from India and I love to code and build new things "}</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(true)}
                        className='flex items-center gap-2 rounded-full hover:bg-white hover:text-blue-500 hover:font-bold hover:scale-105 transition-all duration-300'>
                        <Pen className='w-4 h-4' />
                        Edit Profile
                    </Button>
                </div>
                {/* Profile Details */}
                <div className='mt-5'>
                    <div className='mt-5 flex items-center gap-2'>
                        <Mail className='w-4 h-4' />
                        <p className='text-base font-semibold'>{user ? user?.email : "monish@gmail.com"}</p>
                    </div>
                    <div className='mt-5 flex items-center gap-2'>
                        <PhoneCall className='w-4 h-4' />
                        <p className='text-base font-semibold'>{user ? user?.phoneNumber : "6232762409"}</p>
                    </div>
                </div>
                {/* Profile Skills */}
                <div className='mt-5'>
                    <h3 className='text-lg font-semibold'>Skills</h3>
                    <div className='flex flex-wrap gap-2 mt-2 '>
                        {user?.profile?.skills?.map((skill, index) => (
                            <Badge key={index} className="rounded-xl p-2 bg-black text-white shadow-lg hover:bg-black hover:cursor-pointer" >{skill}</Badge>
                        ))}
                    </div>
                </div>
                {/*resume*/}
                <div className='mt-5 flex gap-4 items-center' >
                    <h3 className='text-lg font-semibold'>Resume: </h3>
                    {
                        user?.profile?.resume ? (
                            <Link to={`${user?.profile?.resume}`}  target="_blank" rel="noopener noreferrer" >
                                <span className='text-blue-600 hover:underline hover:cursor-pointer' >
                                    {user?.profile?.resumeOriginalName}
                                </span>
                            </Link>
                        ) : (
                            <p className='text-gray-500'>No resume found</p>
                        )
                    }
                    {user?.profile?.resume && <Trash2 onClick={handleDeleteResume} className='hover:text-blue-600 hover:scale-110 hover:cursor-pointer w-6 h-6 transition-all duration-100' />}
                </div>

                {/* Applied Jobs */}
                <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    {/* Applied Job Table   */}
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />

        </>
    )
}

export default Profile