import { combineReducers, configureStore } from '@reduxjs/toolkit'
import updateReducerCart from './reducers/updateCart'
import updateReducerProfile from './reducers/updateProfile'
import updateReducerRate from './reducers/updateRates'
import updateReducerFeedback from './reducers/updateFeedback'



const rootReducer = combineReducers({
    updateCart: updateReducerCart.reducer,
    updateProfile: updateReducerProfile.reducer,
    updateRate: updateReducerRate.reducer,
    updateFeedback: updateReducerFeedback.reducer
})

export const store = configureStore({
  reducer: rootReducer
})
export default store