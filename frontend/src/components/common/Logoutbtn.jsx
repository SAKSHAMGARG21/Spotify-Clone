import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { logout } from '../../services/operations/authApi';
function Logoutbtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout(navigate));
    }
    return (
        <Link to="/login">
            <button className='text-black rounded-full px-4 py-2 font-bold bg-white hover:bg-[#ffffff9e] transform active:scale-95 transition-all duration-200'
                onClick={handleLogout}>
                Logout
            </button>
        </Link>
    )
}

export default Logoutbtn