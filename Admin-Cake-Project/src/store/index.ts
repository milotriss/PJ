import { combineReducers, configureStore } from '@reduxjs/toolkit'

import updateReducer from './reducers/update'


const rootReducer = combineReducers({
    update: updateReducer.reducer
})

export const store = configureStore({
  reducer: rootReducer
})
export default store