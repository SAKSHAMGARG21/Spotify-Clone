import React, { useState } from "react";
import Header from "../common/Header";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../slices/authSlice";
import { sendOtp } from "../../services/operations/authApi";
import Topbar from "../Topbar";
import GoogleLogin from "./GoogleLogin";
function SignupForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        fullName: "",
        email: "",
        password: ""
    })

    const { userName, fullName, email, password } = formData;
    const handleOnChange = (e) => {
        setFormData((prevdata) => ({
            ...prevdata,
            [e.target.name]: e.target.value
        }))
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(setSignupData(formData));
        dispatch(sendOtp(email, navigate));
    };
    return (
        <div className="h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
            <Topbar />

            <div className="w-[25rem] min-w-[20rem] max-w-[25rem] my-8 mx-auto">
                <div className="">
                    <h1 className="font-bold text-left my-2">
                        Sign up to start listening
                    </h1>
                    <form
                        onSubmit={handleOnSubmit}
                        className="flex w-full flex-col gap-y-4 items-start"
                    >
                        <label className="w-full">
                            <p className="font-medium my-1 text-left">
                                Username<sup className="text-red-400">*</sup>
                            </p>
                            <input
                                className="w-full bg-[#2a2a2a73] p-2 border border-white rounded-sm"
                                type="text"
                                placeholder="Enter your username"
                                value={userName}
                                name="userName"
                                onChange={handleOnChange}
                            />
                        </label>
                        <label className="w-full">
                            <p className="font-medium my-1 text-left">
                                Fullname<sup className="text-red-400">*</sup>
                            </p>
                            <input
                                className="w-full bg-[#2a2a2a73] p-2 border border-white rounded-sm"
                                type="text"
                                placeholder="Enter your fullname"
                                value={fullName}
                                name="fullName"
                                onChange={handleOnChange}
                            />
                        </label>
                        <label className="w-full">
                            <p className="font-medium my-1 text-left">
                                Email<sup className="text-red-400">*</sup>
                            </p>
                            <input
                                className="w-full bg-[#2a2a2a73] p-2 border border-white rounded-sm"
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                name="email"
                                onChange={handleOnChange}
                            />
                        </label>
                        <label className="w-full relative">
                            <p className="font-medium my-1 text-left">
                                Password<sup className="text-red-400">*</sup>
                            </p>
                            <input
                                className="w-full bg-[#2a2a2a73] p-2 border border-white rounded-sm"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                name="password"
                                onChange={handleOnChange}
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[40px] z-[10] cursor-pointer"
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </label>
                        <button
                            className="bg-green-500 w-full text-black font-light hover:bg-[#22c55eb0] transform active:scale-95 transition-all duration-200"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="py-4">
                        <GoogleLogin />
                    </div>
                    <div className="my-4">
                        <span className="p-2">Already have an Account?</span>
                        <Link to="/login" className="text-blue-500 underline font-normal">
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
