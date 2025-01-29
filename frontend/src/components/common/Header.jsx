import React from 'react'
import logo from "../../assets/logo.svg";
import { useSelector } from 'react-redux';
import Signupbtn from './Signupbtn';
import Loginbtn from './Loginbtn';
function Header() {

  const { user } = useSelector((state) => state.auth);
  return (
    <div className="bg-zinc-900 p-2 flex justify-between items-center">
      <img src={logo} alt="spotify" className="h-9" />
      <div className='flex justify-center items-center'>
        {!user && <Signupbtn />}
        {!user && <Loginbtn />}
      </div>
    </div>
  )
}

export default Header