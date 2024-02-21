import { createSlice } from "@reduxjs/toolkit";

const initState: boolean = false



const updateReducerCart = createSlice({
    name: 'updateCart',
    initialState: initState,
    reducers:{
        updateCart: (state:boolean) => {
            return state = !state
        }
    }
})
export const {updateCart} = updateReducerCart.actions
export default updateReducerCart