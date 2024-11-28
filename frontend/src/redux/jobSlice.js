
import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs:[],
        allAdminJobs: [],
        allAppliedJobs: [],
        singleJob:null,
        searchJobByText: "",
        searchedQuery:"",
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            // TODO: fetch all jobs from the server and set them in the state
            state.allJobs = action.payload
        } ,
        setAllAdminJobs: (state, action) => {
            // TODO: fetch all admin jobs from the server and set them in the state
            state.allAdminJobs = action.payload
        },

        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },

        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        },

        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        }
    }
})

export const { setAllJobs, setAllAdminJobs, setSearchJobByText, setSingleJob, setAllAppliedJobs, setSearchedQuery } = jobSlice.actions

export default jobSlice.reducer