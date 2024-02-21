import { createSlice } from "@reduxjs/toolkit";

const initState: boolean = false



const updateReducer = createSlice({
    name: 'update',
    initialState: initState,
    reducers:{
        update: (state:boolean) => {
            return state = !state
        },
    }
})
export const {update} = updateReducer.actions
export default updateReducer