import React, { useEffect, useState } from 'react'
import { HomeIcon, Library, Plus, Search } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from 'react-router-dom';
import PlaylistSkeleton from '../skeletons/PlaylistSkeleton';
import { fetchAlbums } from '@/services/operations/albumApi';
import { useSelector } from 'react-redux';
import LoginToContinue from '../common/LoginToContinue';

function LeftSideBar() {
    const { user, token } = useSelector(state => state.auth);
    const [isLoading, setLoading] = useState(false);
    const [albumData, setAlbumData] = useState([]);
    useEffect(() => {
        const albums = async () => {
            setLoading(true);
            const albumRes = await fetchAlbums();
            setAlbumData(albumRes);
            setLoading(false);
        }
        albums();
    }, []);
    return (
        <div className='flex flex-col h-full gap-2'>
            <div className='rounded-md bg-zinc-900 p-4'>
                <Link to='/'>
                    <div className='flex gap-2 font-semibold rounded-md items-center text-lg p-2 text-left cursor-pointer hover:bg-zinc-800 active:scale-95'>
                        <HomeIcon />
                        Home
                    </div>
                </Link>
                <div className='flex gap-2 items-center font-semibold rounded-md text-lg p-2 text-left cursor-pointer hover:bg-zinc-800 active:scale-95'>
                    <Search />
                    Search
                </div>
            </div>

            {/* Library section  */}
            <div className='bg-zinc-900 p-4 h-screen rounded-md '>

                <div className='flex flex-col items-center justify-start mb-4'>
                    <div className='flex items-start justify-start w-full gap-2'>
                        <Library />
                        <div className='flex justify-between w-full font-semibold '>
                            <span>
                                Playlists
                            </span>
                            <Plus />
                        </div>
                    </div>
                </div>

                <ScrollArea className='h-[calc(100vh-250px)] rounded-md'>
                    <div>
                        {
                            user || token ? (
                                isLoading ? (<PlaylistSkeleton />) : (
                                    albumData.map((album) => (
                                        <Link to={`/album/${album._id}`} key={album._id}
                                            className='p-2 hover:bg-zinc-800 rounded-md flex text-left items-center gap-3 cursor-pointer'>
                                            <img src={album.imageUrl} alt={album.title} className=' size-12 rounded-md flex-shrink-0 object-cover' />
                                            <div className='flex-1 min-w-0 hidden md:block'>
                                                <p className='font-medium truncate'>{album.title}</p>
                                                <p className='text-sm text-zinc-400 truncate'>{album.artist}</p>
                                            </div>
                                        </Link>
                                    ))
                                )
                            ) : (<LoginToContinue />)
                        }
                    </div>
                </ScrollArea>

            </div>
        </div>
    )
}

export default LeftSideBar