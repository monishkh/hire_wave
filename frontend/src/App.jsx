import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LogIn from './components/auth/login'
import SignUp from './components/auth/Signup'


import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import userGetAllJobs from './hooks/useGetAllCompanies'
import AdminCompanies from './components/admin/AdminCompanies'
import AdminJobs from './components/admin/AdminJobs'
import CreateCompany from './components/admin/CreateCompany'
import CompanyDetails from './components/admin/CompanyDetails'
import CreateJob from './components/admin/CreateJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/log-in",
    element: <LogIn />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },

  {
    path: "/job-description/:id",
    element: <JobDescription />
  },

  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },

  // admin routes start 

  {
    path: '/admin/companies',
    element: <ProtectedRoute><AdminCompanies /></ProtectedRoute>
  },

  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },

  {
    path: "/admin/create-comapny",
    element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
  },

  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanyDetails /></ProtectedRoute>

  },

  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><CreateJob /></ProtectedRoute>
  },

  {
    path: "/admin/jobs/create/:id",
    element: <ProtectedRoute><CreateJob /></ProtectedRoute>
  },

  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  }
])

function App() {



  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
