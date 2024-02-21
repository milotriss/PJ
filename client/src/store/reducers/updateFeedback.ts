import { createSlice } from "@reduxjs/toolkit";

const initState: boolean = false



const updateReducerFeedback = createSlice({
    name: 'updateFeedback',
    initialState: initState,
    reducers:{
        updateFeedback: (state:boolean) => {
            return state = !state
        }
    }
})
export const {updateFeedback} = updateReducerFeedback.actions
export default updateReducerFeedback