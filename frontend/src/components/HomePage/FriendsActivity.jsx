import { fetchUsers } from '@/services/operations/authApi';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { HeadphonesIcon, Music, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function FriendsActivity() {
    const { user ,token} = useSelector((state) => state.auth);
    const { onlineUsers ,userActivities} = useSelector((state) => state.chat);
    const [users, setUsers] = useState([]);
    const [loginuser,setLoginUser]=useState('');

    const onlineUsersSet = new Set(onlineUsers);
    const fetchData = async () => {
        if (user) {
            const res = await fetchUsers(token);
            setUsers(res);
        };
    }
    useEffect(() => {
        // console.log(userActivities);
        setLoginUser(user?._id);
        fetchData();
    }, [fetchUsers, user]);
    return (
        <div className='h-full bg-zinc-900 rounded-lg flex flex-col'>
            <div className='p-4 flex justify-between items-center border-b border-zinc-800'>
                <div className='flex items-center gap-2'>
                    <User className='size-5 shrink-0' />
                </div>
            </div>

            {!user && <LoginPrompt />}

            <ScrollArea className='flex-1'>
                <div className='p-4 space-y-4'>
                    {
                        users?.map((user) => {
                            const activity = userActivities[loginuser];
                            const isPlaying= activity && activity !== 'Idle';
                            return (
                                <div key={user?._id} className='cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group'>
                                    <Link to='/chat'>
                                        <div className='flex item-start items-center gap-3'>
                                            <div className='relative'>
                                                <img src={user.profileImage} alt={user.userName} className='border-2 border-zinc-700 size-12 p-[1px] rounded-full' />
                                                <div className='absolute bottom-1 right-1 size-[8px] rounded-full bg-zinc-500'
                                                    aria-hidden='true' />
                                                <div
                                                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900
                                                ${onlineUsersSet.has(user._id) ? "bg-green-500" : "bg-zinc-500"}`}
                                                />
                                            </div>

                                            <div className='flex flex-col text-left min-w-0'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='font-semibold text-sm text-white'>{user.userName}</span>
                                                    {isPlaying && <Music className='size-3 text-emerald-400 shrink-0' />}
                                                </div>
                                                {
                                                    isPlaying ? (
                                                        <div className='mt-1'>
                                                            <div className='text-[12px] text-zinc-300 font-medium truncate'>
                                                               {activity.replace("Playing ","").split(" by ")[0]}
                                                            </div>
                                                            <div className='text-[10px] text-zinc-400 truncate'>
                                                                {activity.split(" by ")[1]}
                                                            </div>
                                                        </div>) : (
                                                        <div className='text-xs text-zinc-400'>
                                                            Idle
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </ScrollArea>
        </div>
    )
}

export default FriendsActivity

const LoginPrompt = () => (
    <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
        <div className='relative'>
            <div
                className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
                aria-hidden='true'
            />
            <div className='relative bg-zinc-900 rounded-full p-4'>
                <HeadphonesIcon className='size-8 text-emerald-400' />
            </div>
        </div>

        <div className='space-y-2 max-w-[250px]'>
            <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
            <p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
        </div>
    </div>
);
