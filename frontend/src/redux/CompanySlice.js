import { createSlice } from "@reduxjs/toolkit";

const comapanySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies:[],
        searchCompanyByText:"",
    },

    reducers: {
        // actions
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },

        setCompanies: (state, action) => {
            state.companies = action.payload
        },

        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload
        }
    }
})

export const { setSingleCompany, setCompanies, setSearchCompanyByText } = comapanySlice.actions

export default comapanySlice.reducer;
