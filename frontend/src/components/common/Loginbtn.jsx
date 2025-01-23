import React from 'react'
import { Link } from 'react-router-dom'

function Loginbtn() {
    return (
        <Link to='/login'>
            <button className='px-6 py-4  bg-white text-black  rounded-[50px] font-bold hover:bg-[#ffffff9e] transform active:scale-95 transition-all duration-200'>
                Log in 
            </button>
        </Link>
    )
}

export default Loginbtn