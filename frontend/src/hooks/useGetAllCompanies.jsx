import { setCompanies } from "@/redux/CompanySlice"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompanies = async () => {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setCompanies(res?.data?.companies))
            }

        }
        fetchCompanies() // Make API request to get all companies
    }, [])
}

export default useGetAllCompanies