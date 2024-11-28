import { setSingleCompany } from "@/redux/CompanySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux";



const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCompany = async () => {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get-company/${companyId}`, { withCredentials: true })


            if (res.data.success) {
                dispatch(setSingleCompany(res.data.findCompany));
            }

        }
        fetchCompany()
    }, [])
}

export default useGetCompanyById;