import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem('token')) : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null,
    loginStatus:false,
    loading: false,
}

const authSlice = createSlice({
    name: "auth",   
    initialState: initialState,
    reducers: {
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsLogined:(state,action)=>{
            state.loginStatus= action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { setIsLogined,setSignupData, setToken, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;