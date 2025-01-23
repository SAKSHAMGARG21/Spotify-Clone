import React from 'react'
import logo from "../../assets/logo.svg";
function Header() {
  return (
    <div>
        <div className="bg-zinc-900 p-4">
          <img src={logo} alt="spotify" className="h-10" />
        </div>
    </div>
  )
}

export default Header