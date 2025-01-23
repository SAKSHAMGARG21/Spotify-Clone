import React from 'react'
import { Link } from 'react-router-dom'

function Signupbtn() {
    return (
        <Link to='/signup'>
            <button className='text-white font-bold hover:text-[#ffffff9e] transform active:scale-95 transition-all duration-200'>
                Sign up
            </button>
        </Link>
    )
}

export default Signupbtn