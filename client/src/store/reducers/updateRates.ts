import { createSlice } from "@reduxjs/toolkit";

const initState: boolean = false



const updateReducerRate = createSlice({
    name: 'updateRate',
    initialState: initState,
    reducers:{
        updateRate: (state:boolean) => {
            return state = !state
        }
    }
})
export const {updateRate} = updateReducerRate.actions
export default updateReducerRate