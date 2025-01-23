import React from 'react'
import logo from "../assets/logo.svg";
import Loginbtn from './common/Loginbtn';
import Signupbtn from './common/Signupbtn';
import Logoutbtn from "./common/Logoutbtn"
import { useSelector } from 'react-redux';
function Topbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-zinc-900 p-4 flex justify-between items-center">
      <img src={logo} alt="spotify" className="h-10" />
      <div className='flex justify-center items-center'>
        {
          user && <Logoutbtn />
        }
        {
          !user && <Signupbtn />
        }
        {
          !user && <Loginbtn />
        }
      </div>
    </div>
  )
}

export default Topbar