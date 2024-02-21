import { createSlice } from "@reduxjs/toolkit";

const initState: boolean = false



const updateReducerProfile = createSlice({
    name: 'updateProfile',
    initialState: initState,
    reducers:{
        updateProfile: (state:boolean) => {
            return state = !state
        }
    }
})
export const {updateProfile} = updateReducerProfile.actions
export default updateReducerProfile