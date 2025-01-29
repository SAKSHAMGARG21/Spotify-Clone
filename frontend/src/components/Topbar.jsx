import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LayoutDashboardIcon, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/services/operations/authApi';
function Topbar() {
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout(navigate));
  }
  return (
    <div className="bg-zinc-900 rounded-md p-[6px] flex justify-between items-center">
      <div className='flex gap-2 justify-center items-center'>
        <img src='/spotify.png' alt="spotify" className="size-8" />
        <p className='font-semibold'>Spotify</p>
      </div>
      <div className='flex justify-center items-center'>
        {
          user && user.role == 'Admin' &&
          <Link to='/admin'>
            <button className='flex mx-2 text-sm justify-center items-center p-1 gap-2 bg-zinc-800/80 rounded-md hover:bg-zinc-700/80 transform active:scale-95 transition-all duration-200'>
              <LayoutDashboardIcon />
              Admin Dashboard
            </button>
          </Link>
        }
        {
          user &&
          <div className='relative'>
            <img
              src={user.profileImage}
              alt={user.userName}
              className='border-2 cursor-pointer border-zinc-600 size-8 p-[1px] rounded-full'
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg z-10 transform transition-all duration-500 '>
                <button className='flex items-center gap-2 rounded-md text-zinc-300 w-full text-left px-4 py-2 text-sm hover:bg-zinc-400/40'
                  onClick={() => console.log('Settings clicked')}>
                  <Settings color="#ffffff" />
                  Settings
                </button>
                <Link to="/login">
                  <button className='flex items-center gap-2 rounded-md text-zinc-300 w-full text-left px-4 py-2 text-sm hover:bg-zinc-400/40'
                    onClick={handleLogout}>
                    <LogOut />
                    Logout
                  </button>
                </Link>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  )
}

export default Topbar