import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice"
const rootReducers = combineReducers({
    auth: authSlice,
})

export default rootReducers;