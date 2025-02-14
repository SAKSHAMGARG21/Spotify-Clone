import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isLoading: false,
    error: null,
    isConnected: false,
    onlineUsers: [], // Store as an array
    userActivities: {}, // Store as a plain object
    messages: [],
    selectedUser: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setisLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setisConnected: (state, action) => {
            state.isConnected = action.payload;
        },
        setonlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setUserActivities: (state, action) => {
            state.userActivities = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    }
});

export const { setSelectedUser, setUsers, setisLoading, setisConnected, setError, setonlineUsers, setUserActivities, setMessages } = chatSlice.actions;

export default chatSlice.reducer;