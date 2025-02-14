import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice"
import albumSlice from "../slices/albumSlice"
import chatSlice from "../slices/chatSlice"
const rootReducers = combineReducers({
    auth: authSlice,
    album: albumSlice,
    chat:chatSlice
})

export default rootReducers;