import { useChatStore } from '@/services/operations/useChatStore';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import React from 'react';
import { useSelector } from 'react-redux';
import UsersListSkeleton from '../../skeletons/UsersListSkeleton';

function UserList() {
  const { user } = useSelector(state => state.auth);
  const { isLoading, selectedUser, onlineUsers, users } = useSelector(state => state.chat);
  const { setSelectedUserStore } = useChatStore();

  // Convert onlineUsers to a Set
  const onlineUsersSet = new Set(onlineUsers);

  return (
    <div className='border-r border-zinc-800'>
      <div className='flex flex-col h-full'>
        <ScrollArea className='h-[calc(100vh-280px)]'>
          <div className='space-y-2 p-4'>
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              users?.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUserStore(user)}
                  className={`flex items-center justify-center text-left lg:justify-start gap-3 p-3 
                                        rounded-lg cursor-pointer transition-colors
                    ${selectedUser?._id === user._id ? "bg-zinc-800" : "hover:bg-zinc-800"}`}
                >
                  <div className='relative'>
                    <img src={user.profileImage} alt={user.userName} className='border-2 border-zinc-700 size-12 p-[1px] rounded-full' />
                    <div className='absolute bottom-1 right-1 size-[8px] rounded-full bg-zinc-500'
                      aria-hidden='true' />
                    {/* online indicator */}
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900
                        ${onlineUsersSet.has(user._id) ? "bg-green-500" : "bg-zinc-500"}`}
                    />
                    
                  </div>

                  <div className='flex-1 min-w-0 lg:block hidden'>
                    <span className='font-medium truncate'>{user.fullName}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default UserList;