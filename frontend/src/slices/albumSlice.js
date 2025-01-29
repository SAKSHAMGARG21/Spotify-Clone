import { createSlice } from "@reduxjs/toolkit"
const initialstate = {
    queue: [],
    currentSong: null,
    currentIndex: -1,
    isPlaying: false,
}

const albumSlice = createSlice({
    name: 'album',
    initialState: initialstate,
    reducers: {
        setQueue: (state, action) => {
            state.queue = action.payload
        },
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload
        },
        setCurrentIndex: (state, action) => {
            state.currentIndex = action.payload
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload
        }
    }
})

export const { setQueue, setCurrentIndex, setCurrentSong, setIsPlaying } = albumSlice.actions;
export default albumSlice.reducer;
