
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import { LogOut, User2 } from "lucide-react"
import { useState } from "react"
import { useNavigate, Link, useSearchParams, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { toast } from "sonner"
import { setUser } from "@/redux/AuthSlice"
import { USER_API_END_POINT } from "@/utils/constant"







function Navbar() {

  const location = useLocation()


  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })

      if (res.status === 200) {
        dispatch(setUser(null))
        navigate("/log-in")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log('Error in logout', error);

    }
  }


  return (
    <div className=' '>

      {/* desktop view */}

      <div className='flex items-center justify-between mx-auto max-w7xl h-14 p-4 bg-slate-20 shadow-md '>
        <div>
          <Link to={user?.role === "recruiter" ? "/admin/companies" : "/"}>
            <h1 className='text-3xl font-bold cursor-pointer ' > Hire<span className='text-blue-500 text-1sxl' >Wave</span> </h1>
          </Link>
        </div>

        <div className='flex items-center gap-5'>
          <ul className='flex items-center gap-4 font-medium cursor-pointer'>
            {user?.role === "recruiter" ? (
              <>
                <li><Link to={'/admin/companies'}>Companies</Link></li>
                <li><Link to={'/admin/jobs'}>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/jobs'}>Jobs</Link></li>
                <li><Link to={'/browse'}>Browse</Link></li>
              </>
            )}

          </ul>


          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="shadow-md">
                  <AvatarImage className='object-cover hover:scale-105 transition-all duration-100
                            hover:border-2 hover:border-blue-500 rounded-full hover:cursor-pointer hover:p-1 absolut'  src={`${user?.profile?.profilePicture ? user?.profile?.profilePicture : "https://github.com/shadcn.png"}`} />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>

              </PopoverTrigger>
              <PopoverContent className='absolute right-0 cursor-pointer top-5 bg-white shadow-md w-[350px]'>
                <div className="flex gap-4  p-4 items-center justify-between">
                  <Link to={user.role === "recruiter" ? location.pathname : '/profile'}>
                    <Avatar className="shadow-md w-16 h-16">
                      <AvatarImage src={`${user?.profile?.profilePicture ? user?.profile?.profilePicture : "https://github.com/shadcn.png"}`} className='object-cover hover:scale-120 transition-all duration-100
                            hover:border-4 hover:border-blue-500 rounded-full hover:cursor-pointer hover:p-1 absolut' />
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <h4 className='font-medium'>{user?.username}</h4>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="">
                  {user.role !== "recruiter" && <div className="flex gap-1 items-center ">
                    <User2 />
                    <Button variant="link" ><Link to={'/profile'}>View Profile</Link></Button>
                  </div>}

                  <div className="flex gap-1 items-center " >
                    <LogOut />
                    <Button variant="link" onClick={handleLogout} >LogOut</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className='flex items-center gap-2'>
              <Link to="/log-in"><Button variant="outline" className="w-[90px] shadow-md hover:shadow-none   hover:bg-blue-500 hover:text-white rounded-md">LogIn</Button></Link>
              <Link to="/sign-up"><Button variant="outline" className="w-[90px]  hover:shadow-none bg-blue-500 text-white hover:bg-white hover:text-black rounded-md">SignUp</Button></Link>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}


export default Navbar