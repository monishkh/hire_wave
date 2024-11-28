import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'

function Job({ job }) {
  const { company, title, description, openings, jobType, salary, location } = job

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }


  return (
    <div className='border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl hover:cursor-pointer my-4'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full bg-slate-100" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className='flex items-center gap-2'>

        <Avatar>
          <AvatarImage src={company.logo} />
        </Avatar>

        <div>
          <h1 className='text-sm font-semibold'>{company.name}</h1>
          <p className='text-sm text-gray-500'>{location}</p>
        </div>
      </div>
      <div>
        <h1 className='text-lg font-semibold'>{title}</h1>
        <p className='text-sm text-gray-500 line-clamp-5 '>{description}</p>
      </div>
      <div className='flex items-center justify-between gap-2 mt-3'>
        <Badge className='text-blue-500 bg-blue-50 px-3 py-1 cursor-pointer font-bold '>{openings} Opeing</Badge>
        <Badge className='bg-blue-50 text-red-600  cursor-pointer px-3 py-1 font-bold'>{jobType}</Badge>
        <Badge className='cursor-pointer bg-blue-50 text-[#7209b7] font-bold '>{salary / 100000}LPA</Badge>
      </div>
      <div className='flex items-center gap-5 mt-3'>
        <Button variant="outline" className='bg-slate-100 font-semibold rounded-xl'>
          <Link to={`/job-description/${job._id ? job._id : 1}`}>Details</Link>
        </Button>
        <Button className='bg-blue-500 text-white font-semibold hover:bg-blue-600 rounded-xl'>
          Save for later
        </Button>
      </div>
    </div>
  )
}

export default Job