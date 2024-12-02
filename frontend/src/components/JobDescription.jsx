import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);

    const isInitiallyApplied =
        singleJob?.applications?.some((application) => application.applicant === user?._id) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply-job/${jobId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob)); // Helps us to update the UI in real-time
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get-jobs/${jobId}`, {
                    withCredentials: true,
                });

                if (res.data) {
                    dispatch(setSingleJob(res.data.findJob));
                    setIsApplied(
                        res.data.findJob.applications.some(
                            (application) => application.applicant === user?._id
                        )
                    ); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto my-10 p-4 bg-white rounded-lg shadow-lg">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <Badge className="text-blue-700 font-bold rounded" variant="ghost">
                                {singleJob?.openings} Positions
                            </Badge>
                            <Badge className="text-[#F83002] font-bold rounded" variant="ghost">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className="text-[#7209b7] font-bold rounded" variant="ghost">
                                {singleJob?.salary / 100000} LPA
                            </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                {/* Job Description */}
                <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6">Job Description</h1>
                <div className="my-4 space-y-2">
                    <h1 className="font-bold">
                        Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span>
                    </h1>
                    <h1 className="font-bold">
                        Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
                    </h1>
                    <h1 className="font-bold">
                        Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
                    </h1>
                    <h1 className="font-bold">
                        Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} yrs</span>
                    </h1>
                    <h1 className="font-bold">
                        Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary / 100000} LPA</span>
                    </h1>
                    <h1 className="font-bold">
                        Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
                    </h1>
                    <h1 className="font-bold">
                        Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split('T')[0]}</span>
                    </h1>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobDescription;
