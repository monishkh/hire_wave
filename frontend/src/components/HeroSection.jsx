import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery, setSearchJobByText } from '@/redux/jobSlice'

function HeroSection() {

    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // Search Job Handler Function
    const searchJobHandler = async () => {
        dispatch(setSearchedQuery(query))
        navigate('/browse')
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-slate-100 text-blue-500 font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-blue-500'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-blue-500">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection