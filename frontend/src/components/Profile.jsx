import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Mail, PhoneCall, Pen, Upload, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/AuthSlice';
import { toast } from 'sonner';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

function Profile() {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useGetAppliedJobs();

    // Handle Resume Deletion
    const handleDeleteResume = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/resume/delete/${user?._id}`);
            if (res.status === 200) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
            toast.error('Failed to delete resume.');
        }
    };

    // Handle Profile Picture Upload
    const handleUploadProfile = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.put(`${USER_API_END_POINT}/profile-picture-update`, formData, { withCredentials: true });
            if (res.status === 200) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            toast.error('Failed to update profile picture.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-5 border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Profile Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Profile Avatar */}
                        <div className="relative group w-24 h-24">
                            <Avatar className="w-full h-full">
                                <AvatarImage
                                    className="object-cover rounded-full group-hover:opacity-50 transition-opacity duration-200"
                                    src={user?.profile?.profilePicture || 'https://github.com/shadcn.png'}
                                    alt={user?.username || 'User Profile'}
                                />
                                <AvatarFallback>
                                    {user?.username?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            {/* Upload Overlay */}
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
                                    onChange={handleUploadProfile}
                                />
                            </div>
                        </div>

                        {/* User Info */}
                        <div>
                            <h1 className="text-xl font-bold">{user?.username || 'User Name'}</h1>
                            <p className="text-base text-gray-500">
                                {user?.profile?.bio || "I'm a software engineer from India who loves coding and building new things."}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 rounded-full hover:bg-white hover:text-blue-500 hover:font-bold hover:scale-105 transition-transform duration-300"
                    >
                        <Pen className="w-4 h-4" />
                        Edit Profile
                    </Button>
                </div>

                {/* Profile Details */}
                <div className="mt-5">
                    <div className="flex items-center gap-2 mt-5">
                        <Mail className="w-4 h-4" />
                        <p className="text-base font-semibold">{user?.email || 'monish@gmail.com'}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-5">
                        <PhoneCall className="w-4 h-4" />
                        <p className="text-base font-semibold">{user?.phoneNumber || '6232762409'}</p>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mt-5">
                    <h3 className="text-lg font-semibold">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user?.profile?.skills?.map((skill, index) => (
                            <Badge key={index} className="rounded-xl p-2 bg-black text-white shadow-lg">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Resume Section */}
                <div className="mt-5 flex gap-4 items-center">
                    <h3 className="text-lg font-semibold">Resume:</h3>
                    {user?.profile?.resume ? (
                        <Link to={`${user.profile.resume}`} target="_blank" rel="noopener noreferrer">
                            <span className="text-blue-600 hover:underline">{user.profile.resumeOriginalName}</span>
                        </Link>
                    ) : (
                        <p className="text-gray-500">No resume found</p>
                    )}
                    {user?.profile?.resume && (
                        <Trash2
                            onClick={handleDeleteResume}
                            className="w-6 h-6 hover:text-blue-600 hover:scale-110 transition-transform duration-200 cursor-pointer"
                        />
                    )}
                </div>

                {/* Applied Jobs Section */}
                <div className="mt-5">
                    <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </>
    );
}

export default Profile;
