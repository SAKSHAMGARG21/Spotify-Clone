import React, { useEffect, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useParams } from 'react-router-dom'
import { fetchAlbumById } from '@/services/operations/albumApi';
import { Clock, Play } from 'lucide-react';
import { useSelector } from 'react-redux';
import { usePlayerStore } from '@/services/operations/usePlayerStore';
function AlbumPage() {
    const { albumId } = useParams();
    const [currAlbum, setCurrAlbumData] = useState();
    const [releaseYear, setReleaseYaer] = useState();
    const [songDuration, setDuration] = useState();
    const { currentSong, isPlaying, currentIndex } = useSelector((state) => state.album);
    const {playAlbum,togglePlay}= usePlayerStore();


    const getSongDuration = async (songUrl) => {
        const audio = new Audio(songUrl);
        return new Promise((resolve) => {
            audio.addEventListener('loadedmetadata', () => {
                resolve(audio.duration);
            });
        });
    };
    const getYearFromCreatedAt = (createdAt) => {
        const date = new Date(createdAt);
        const year = date.toString().split(" ")[3];
        setReleaseYaer((year !== undefined) ? '• ' + year : '');
    };
    useEffect(() => {
        const getAlbumData = async () => {
            const res = await fetchAlbumById(albumId);
            console.log(res);
            setCurrAlbumData(res);
        }
        getAlbumData();
        getYearFromCreatedAt(currAlbum?.createdAt);
        // setSongDuration(currAlbum?.songs[]);
    }, [fetchAlbumById, albumId]);

    const handlePlayAlbum = (index) => {
        if (!currAlbum) return;
        playAlbum(currAlbum?.songs, index);
    }

    const handleAlbumToggle = ()=>{
        if (!currAlbum) return;
        const isCurruntSongPlaying= currAlbum?.songs.some(song => song._id === currentSong?._id);
        if (isCurruntSongPlaying) togglePlay();
        else{
            playAlbum(currAlbum?.songs,0);
        }

    }

    return (
        <div className='h-full'>
            <ScrollArea className='h-full rounded-md'>
                <div className='relative min-h-screen rounded-md'>

                    {/* gradient */}
                    <div className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none' />

                    {/* Content  */}
                    <div className='relative z-10'>
                        <div className='flex p-6 gap-6 pb-8'>
                            <img src={currAlbum?.imageUrl} alt={currAlbum?.title}
                                className='w-[240px] h-[240px] shadow-xl rounded-md' />
                            <div className='flex flex-col text-left justify-end'>
                                <p className='text-sm font -medium'>
                                    Album
                                </p>
                                <h1 className='font-bold my-4 text-7xl '>{currAlbum?.title}</h1>
                                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                                    <span className='font-medium text-white'>{currAlbum?.artist}</span>
                                    <span>• {currAlbum?.songs?.length} songs</span>
                                    <span>{releaseYear}</span>
                                </div>
                            </div>
                        </div>

                        {/* Play Button  */}
                        <div className='px-6 pb-4 flex items-center gap-6'>
                            <button size='icon'
                            onClick={()=>handleAlbumToggle()} 
                            className='h-[3.6rem] w-[3.9rem] text-center rounded-[100%] bg-green-500 hover:bg-green-400'>
                                <Play className='h-7 w-7 text-black' />
                            </button>
                        </div>

                        <div className='bg-black/20 backdrop-blur-sm'>
                            <div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400'>
                                <div>#</div>
                                <div className='text-left'>Title</div>
                                <div className='text-left'>Released Date</div>
                                <div>
                                    <Clock className='h-4 w-4' />
                                </div>
                            </div>

                        </div>
                        <div className='px-6'>
                            <div className='space-y-2 py-4'>
                                {currAlbum?.songs.map((song, index) => {
                                    const isCurrentSong = currentSong?._id === song._id;
                                    return (
                                        <div key={song._id}
                                            onClick={() => handlePlayAlbum(index)}
                                            className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-small text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer'>
                                            <div className='flex items-center justify-center'>
                                                {isCurrentSong && isPlaying ? (
                                                    <div className='size-4 text-green-500'>♫</div>
                                                ) : (
                                                    <span className='group-hover:hidden'>{index + 1}</span>
                                                )}
                                                {!isCurrentSong && (
                                                    <Play className='h-4 w-4 hidden group-hover:block' />
                                                )}
                                                {/* // <span className='group-hover:hidden'>{index + 1}</span>
                                                // <Play className='h-4 w-4 hidden group-hover:block'></Play> */}
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <img src={song.songImg} alt={song.songName} className='size-10 rounded-md' />
                                                <div className='text-left'>
                                                    <p className='font-medium text-white'>{song.songName}</p>
                                                    <div>{song.artist}</div>
                                                </div>
                                            </div>
                                            <div className='flex items-center'>{song?.createdAt.split('T')[0]}</div>
                                            {/* <div className='flex items-center'> {getSongDuration(song?.songFile)}</div> */}
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default AlbumPage