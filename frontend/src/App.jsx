import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Loader from "./components/common/Loader"
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1 className="text-red-400">This is spotify - clone frontend started</h1> */}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/login' element={<Signup />}></Route>
      </Routes>
      <Loader></Loader>
    </>
  )
}

export default App
