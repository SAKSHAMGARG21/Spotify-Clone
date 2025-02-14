import { useSelector } from "react-redux";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useSelector(state => state.chat);

  if (!selectedUser) return null;

  // Convert onlineUsers to a Set
  const onlineUsersSet = new Set(onlineUsers);

  return (
    <div className='p-4 border-b border-zinc-800'>
      <div className='flex text-left items-center gap-3'>
        <div className='relative'>
          <img src={selectedUser.profileImage} alt={selectedUser.userName} className='border-2 border-zinc-700 size-12 p-[1px] rounded-full' />
          <div className='absolute bottom-1 right-1 size-[8px] rounded-full bg-zinc-500' aria-hidden='true' />
          {/* online indicator */}
          <div
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900
              ${onlineUsersSet.has(selectedUser._id) ? "bg-green-500" : "bg-zinc-500"}`}
          />
        </div>
        <div>
          <h2 className='font-medium'>{selectedUser.fullName}</h2>
          <p className='text-sm text-zinc-400'>
            {onlineUsersSet.has(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;