import React from 'react'
import { useGoogleLogin } from "@react-oauth/google";
import GoogleBtn from '../common/GoogleBtn';
import { googleAuth } from '../../services/operations/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../slices/authSlice';
function GoogleLogin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        dispatch(setToken(result.data.data.token));
        dispatch(setUser(result.data.data.user.userName));
        navigate('/');
      }
    } catch (error) {
      console.log("Error while requesting google code :", error);
    }
  }
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  })
  return (
    <GoogleBtn googleLoginbtn={googleLogin}></GoogleBtn>
  )
}

export default GoogleLogin;