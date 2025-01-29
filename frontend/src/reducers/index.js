import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice"
import albumSlice from "../slices/albumSlice"
const rootReducers = combineReducers({
    auth: authSlice,
    album: albumSlice,
})

export default rootReducers;