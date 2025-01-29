import { setCurrentIndex, setCurrentSong, setIsPlaying, setQueue } from "@/slices/albumSlice";
import { useDispatch, useSelector } from "react-redux";

export const usePlayerStore = () => {
    const dispatch = useDispatch();
    const { queue, currentSong, currentIndex, isPlaying } = useSelector((state) => state.album);

    const initializeQueue = (songs) => {
        dispatch(setQueue(songs));
        dispatch(setCurrentSong(currentSong || songs[0]));
        dispatch(setCurrentIndex(currentIndex === -1 ? 0 : currentIndex));
    };

    const playAlbum = (songs, index = 0) => {
        if (songs.length === 0) return;
        const song = songs[index];

        dispatch(setQueue(songs));
        dispatch(setCurrentSong(song));
        dispatch(setCurrentIndex(index));
        dispatch(setIsPlaying(true));
    };

    const setCurrentSongStore = (song) => {
        if (!song) return;
        const songIndex = queue.findIndex((s) => s._id === song._id);

        dispatch(setCurrentSong(song));
        dispatch(setIsPlaying(true));
        dispatch(setCurrentIndex(songIndex !== -1 ? songIndex : currentIndex));
    };

    const togglePlay = () => {
        const willStartPlaying = !isPlaying;
        dispatch(setIsPlaying(willStartPlaying));
    };

    const playNext = () => {
        const nextIndex = currentIndex + 1;

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            dispatch(setCurrentSong(nextSong));
            dispatch(setCurrentIndex(nextIndex));
            dispatch(setIsPlaying(true));
        } else {
            dispatch(setIsPlaying(false));
        }
    };

    const playPrevious = () => {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            const prevSong = queue[prevIndex];
            dispatch(setCurrentSong(prevSong));
            dispatch(setCurrentIndex(prevIndex));
            dispatch(setIsPlaying(true));
        } else {
            dispatch(setIsPlaying(false));
        }
    };

    return {
        initializeQueue,
        playAlbum,
        setCurrentSongStore,
        togglePlay,
        playNext,
        playPrevious,
    };
};

