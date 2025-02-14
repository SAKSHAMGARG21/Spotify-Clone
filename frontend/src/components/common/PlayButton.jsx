import React from 'react';
import { usePlayerStore } from '@/services/operations/usePlayerStore';
import { useSelector } from 'react-redux';
import { Pause, Play } from 'lucide-react';

function PlayButton({ song }) {
    const {togglePlay,setCurrentSongStore } = usePlayerStore();
    const {currentSong,isPlaying } = useSelector((state) => state.album);
    const isCurrentSong= currentSong?._id===song._id;

    const handlePlay= ()=>{
        if (isCurrentSong) togglePlay();
        else setCurrentSongStore(song);
    }
    return (
        <button
        onClick={handlePlay}
        className={`size-10 absolute rounded-full bottom-[1rem] right-2 bg-green-500 hover:bg-green-600/ hover:scale-105 
            transition-all duration-200 opacity-0 translate-y-2 group-hover:translate-y-0
             ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >{
            isCurrentSong && isPlaying ? (
                <Pause className='size-5 absolute left-[10px] top-[10px] text-black'/>
            ):(
                <Play className='size-5  absolute left-[10px] top-[10px] text-black' /> 
            )
        }
        </button>
    )
}

export default PlayButton