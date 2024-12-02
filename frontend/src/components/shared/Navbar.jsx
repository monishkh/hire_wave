import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/AuthSlice";
import { USER_API_END_POINT } from "@/utils/constant";

function Navbar() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(setUser(null));
        navigate("/log-in");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error in logout", error);
    }
  };

  return (
    <div className="bg-white shadow-md">
      {/* Navbar Container */}
      <div className="flex items-center justify-between mx-auto max-w-7xl h-14 px-4">
        {/* Logo */}
        <div>
          <Link to={user?.role === "recruiter" ? "/admin/companies" : "/"}>
            <h1 className="text-3xl font-bold cursor-pointer">
              Hire<span className="text-blue-500 text-xl">Wave</span>
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-5">
          <ul className="flex items-center gap-4 font-medium">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* User Avatar or Auth Buttons */}
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="shadow-md">
                  <AvatarImage
                    className="object-cover rounded-full"
                    src={
                      user?.profile?.profilePicture
                        ? user?.profile?.profilePicture
                        : "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="absolute right-0 bg-white shadow-md w-[300px]">
                <div className="flex gap-4 p-4 items-center">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={
                        user?.profile?.profilePicture
                          ? user?.profile?.profilePicture
                          : "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.username}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="px-4">
                  {user.role !== "recruiter" && (
                    <div className="flex gap-1 items-center mb-2">
                      <User2 />
                      <Button variant="link">
                        <Link to={"/profile"}>View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-1 items-center">
                    <LogOut />
                    <Button variant="link" onClick={handleLogout}>
                      LogOut
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/log-in">
                <Button className="w-[90px]">LogIn</Button>
              </Link>
              <Link to="/sign-up">
                <Button className="w-[90px] bg-blue-500 text-white">
                  SignUp
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-white p-4">
          <ul className="space-y-2">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {user ? (
            <div className="mt-4">
              <Button variant="link" onClick={handleLogout}>
                LogOut
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/log-in">
                <Button>LogIn</Button>
              </Link>
              <Link to="/sign-up">
                <Button className="bg-blue-500 text-white">SignUp</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
