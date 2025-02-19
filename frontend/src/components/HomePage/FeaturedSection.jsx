import React, { useEffect, useState } from 'react'
import FeaturedGridSkeleton from '../skeletons/FeaturedGridSkeleton';
import { getfeaturedSongs } from '@/services/operations/songApi';
import PlayButton from '../common/PlayButton';

function FeaturedSection() {
    const [featuredSongs, setFeaturedSongs] = useState([]);
    const [isLoading, setLoading] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getFeaturedSongsdata = async () => {
            setLoading(true);
            const res = await getfeaturedSongs();
            setLoading(false);
            setFeaturedSongs(res);
        }
        getFeaturedSongsdata();
    }, [getfeaturedSongs])
    if (isLoading) return <FeaturedGridSkeleton />;

    if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
            {featuredSongs?.map((song) => (
                <div
                    key={song._id}
                    className='flex items-center justify-start text-left bg-zinc-400/20 backdrop-blur-xl rounded-md overflow-hidden
         hover:bg-zinc-700/40 transition-colors group cursor-pointer relative'
                >
                    <img
                        src={song.songImg}
                        alt={song.songName}
                        className='size-10 sm:size-[3.7rem] object-cover flex-shrink-0 group-hover:scale-105 '
                    />
                    <div className='flex-1 p-2'>
                        <p className='font-medium truncate'>{song.songName}</p>
                        <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
                    </div>
                    <PlayButton song={song} />
                </div>
            ))}
        </div>
    );
}

export default FeaturedSection;