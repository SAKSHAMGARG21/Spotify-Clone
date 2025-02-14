import { useChatStore } from '@/services/operations/useChatStore'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Topbar from '../Topbar';
import UserList from './components/UserList';
import ChatHeader from './components/ChatHeader';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import MessageInput from './components/MessageInput';


const formatTime = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
function ChatBox() {
  const { setSelectedUserStore,
    fetchUsers,
    initSocket,
    disconnectSocket,
    sendMessage,
    fetchMessages } = useChatStore();
  const { messages, selectedUser } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  useEffect(() => {
    // console.log(selectedUser?._id);
    if (selectedUser) fetchMessages(selectedUser?._id);
  }, [selectedUser]);
  const scrollRef = React.useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
      <Topbar></Topbar>
      <div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>

        <UserList />
        {/* chat messages */}
        <div className='flex flex-col h-full'>
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* Messages */}
              <ScrollArea className='h-[calc(100vh-340px)] overflow-y-auto' ref={scrollRef}>
                <div className='p-4 space-y-4'>
                  {messages?.map((message) => (
                    <div
                      key={message._id}
                      className={`flex items-start gap-3 ${message.senderId === user?._id ? "flex-row-reverse" : ""
                        }`}
                    >
                      <div className='relative'>
                        <img src={message.senderId === user._id ? user.profileImage : selectedUser.profileImage} alt={message.senderId === user._id ? user.userName : selectedUser.userName} className='border-2 border-zinc-700 size-9 p-[1px] rounded-full' />
                      </div>

                      <div
                        className={`rounded-lg p-3 max-w-[70%]
                          ${message.senderId === user?._id ? "bg-[#02cc1040]" : "bg-zinc-800"}
                        `}
                      >
                        <p className='text-sm text-left'>{message.content}</p>
                        <span className='text-xs text-zinc-300 mt-1 block text-right'>
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <MessageInput  />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  )
}

export default ChatBox

const NoConversationPlaceholder = () => (
  <div className='flex flex-col items-center justify-center h-full space-y-6'>
    <img src='/spotify.png' alt='Spotify' className='size-16 animate-bounce' />
    <div className='text-center'>
      <h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
      <p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
    </div>
  </div>
);
