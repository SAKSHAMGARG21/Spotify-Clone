import { usePlayerStore } from '@/services/operations/usePlayerStore';
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

function AudioPlayer() {
  const audioRef = useRef(null);
  const prevSongRef = useRef(null);

  const { currentSong, isPlaying } = useSelector((state) => state.album);
  const {playNext}= usePlayerStore();
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      playNext()
    }

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext])

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    const isSongChange = prevSongRef.current !== currentSong?.songFile;

    if (isSongChange) {
      audio.src = currentSong?.songFile;
      audio.currentTime = 0;

      prevSongRef.current = currentSong?.songFile;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);
  return <audio ref={audioRef} />
}

export default AudioPlayer