import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    token: null,
    user: null,
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
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { setSignupData, setToken, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;