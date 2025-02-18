import React, { useState } from "react";
import Header from "../common/Header";
import './scrollbar.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/operations/authApi";
import GoogleLogin from "./GoogleLogin";
import { useCookies } from "react-cookie";
function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [cookie, setCookie] = useCookies(["token"]);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData;
    const handleOnChange = (e) => {
        setFormData((prevdata) => ({
            ...prevdata,
            [e.target.name]: e.target.value
        }))
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData, navigate));
        // const loginUser = async()=>{
        //     const res =await dispatch(login(formData, navigate));
        //     const date = new Date();
        //     date.setDate(date.getDate() + 30);
        //     setCookie("token", res, { path: '/', expires: date });
        // }
        // loginUser();
    };
    return (
        <div>
            <div className="h-screen hide-scrollbar bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
                <Header />
                <div className="w-[25rem] min-w-[20rem] max-w-[25rem] my-8 mx-auto">
                    <div className="">
                        <h1 className="font-bold text-white text-left my-2">
                            Login To Your Account
                        </h1>
                        <form
                            onSubmit={handleOnSubmit}
                            className="flex w-full flex-col gap-y-4 items-start text-white"
                        >
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
                                Login
                            </button>
                        </form>

                        <div className="my-4">
                            <Link to="/forgotpassword" className="underline font-normal">Forgot your password </Link>
                        </div>

                        <GoogleLogin />

                        <div className="my-6 border-black border-t-2"></div>
                        <div className="my-2">
                            <span className="p-2">Create new Account</span>
                            <Link to="/signup" className="text-blue-500 underline font-normal">
                                Signup here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm