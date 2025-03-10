import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
// import Loader from "./components/common/Loader"
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from "./pages/Error"
import VerifyEmail from './pages/VerifyEmail';
import axios from 'axios';
import { authApis } from './services/apis';
import { useDispatch } from 'react-redux';
import PrivateRoute from './components/Auth/PrivateRoute';
import OpenRoute from './components/Auth/OpenRoute';
import { setIsLogined, setToken, setUser } from './slices/authSlice';
import GoogleAuthWrapper from './components/Auth/GoogleAuthWrapper';
import ChatBox from './components/chat/ChatBox';
import MainLayout from './layout/MainLayout';
import AppPage from './components/HomePage/AppPage';
import AlbumPage from './components/HomePage/AlbumPage';
import AdminPage from './pages/AdminPage';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { isUserLogin } from './services/operations/authApi';

function App() {
  axios.defaults.withCredentials = true;
  // const dispatch = useDispatch();
  // const [cookie,setCookie]= useCookies(["token"]);
  // useEffect(()=>{
  //   console.log(cookie);
  //   dispatch(setToken(cookie));
  // },[])
  // const UserExists = async () => {
  //   try {
  //     const res = await axios.get(authApis.CheckToken);
  //     dispatch(setToken(res.data.data.token));
  //     dispatch(setUser(res.data.data.user));
  //   } catch (error) {
  //     console.log("Error in checking user", error);
  //   }
  // }
  useEffect(() => {
    // const checkUser = async () => {
    //   // await UserExists();
    //   const res=await isUserLogin();
    //   console.log(res);
    //   dispatch(setIsLogined(res));
    // }
    // checkUser();
    toast.dismiss();
  }, [])
  return (
    <div>
      <Routes>
        <Route path='/login' element={
          <OpenRoute>
            <GoogleAuthWrapper>
              <Login />
            </GoogleAuthWrapper>
          </OpenRoute>
        }>
        </Route>
        <Route path='/signup' element={
          <OpenRoute>
            <GoogleAuthWrapper>
              <Signup />
            </GoogleAuthWrapper>
          </OpenRoute>
        }></Route>
        <Route path='/verify-email' element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        }></Route>
        <Route element={<MainLayout />}>
          <Route path='/' element={
              <AppPage />
          } />
          <Route path='/chat' element={
            <PrivateRoute>
              <ChatBox />
            </PrivateRoute>
          } />
          <Route path='/album/:albumId' element={<AlbumPage />} />
        </Route>
        {/* <Route path='/admin' element={<AdminPage />} /> */}
        <Route path='*' element={<Error></Error>}></Route>
      </Routes>
    </div>
  )
}

export default App;
