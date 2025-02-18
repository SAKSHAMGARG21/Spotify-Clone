import React, { useEffect, useState } from 'react'
import { BiArrowBack } from "react-icons/bi"
import { RxCountdownTimer } from "react-icons/rx";
import { register, sendOtp } from '../services/operations/authApi';
import Header from '../components/common/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/common/Loader';
import '../components/Auth/scrollbar.css';
function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const { loading, signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) navigate('/signup');
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const userData = {
      ...signupData,
      otp
    };
    dispatch(register(userData, navigate));
  };
  const [countdown, setCountdown] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendOtp = () => {
    dispatch(sendOtp(signupData.email, navigate));
    setCountdown(120);
    setCanResend(false);
  };

  return (
    <div>
      {
        loading ? (
          <div>
            <Loader></Loader>
          </div>
        ) : (
          <div className="h-screen hide-scrollbar bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
            <Header></Header>

            <div className="w-[25rem] min-w-[20rem] max-w-[25rem] my-8 mx-auto text-white">
              <h1 className="font-bold text-left my-2">
                Verify your email address Check your inbox
              </h1>
              <form
                onSubmit={handleOnSubmit}
                className="flex w-full flex-col gap-y-4 items-start"
              >
                <label className="w-full">
                  <p className="font-medium my-1 text-left">
                    OTP<sup className="text-red-400">*</sup>
                  </p>
                  <input
                    className="w-full bg-[#2a2a2a73] p-2 border border-white rounded-sm"
                    type="text"
                    placeholder="Enter your OTP"
                    value={otp}
                    name="Otp"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </label>
                <button
                  className="bg-green-500 w-full text-black font-light hover:bg-[#22c55eb0] transform active:scale-95 transition-all duration-200"
                  type="submit"
                >
                  Signup
                </button>
              </form>

              <div className="my-4">
                <Link to="/signup" className="flex gap-1 my-2 items-center font-normal">
                  <BiArrowBack /> Back to Signup
                </Link>
                <button
                  className={`bg-green-500 w-full flex items-center gap-2 text-black font-light hover:bg-[#22c55eb0] transform active:scale-95 transition-all duration-200 ${!canResend ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleResendOtp}
                  disabled={!canResend}
                >
                  <RxCountdownTimer /> {canResend ? 'Resend it' : `Resend in ${countdown}s`}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default VerifyEmail;