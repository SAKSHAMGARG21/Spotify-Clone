import { toast } from "react-toastify"
import { setLoading, setToken, setUser } from "../../slices/authSlice";
import { authApis } from "../apis";
import axios from "axios";

const {
    GoogleAuth,
    SendOtp,
    Signup,
    Login,
    Logout,
    Profile
} = authApis

export const googleAuth = async (code) => {
    const res=await axios.get(`${GoogleAuth}${code}`);
    return res;
};

export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const res = await axios.post(SendOtp, { email });
            console.log(res);
            if (!res.data.success) {
                toast.error(res.data.message);
            }
            toast.success(res.data.message);
            navigate('/verify-email');
        } catch (error) {
            console.log("Error in Sending Otp...", error);
            toast.error(error.response?.data?.message || error.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const register = (formData, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const res = await axios.post(Signup, formData);
            console.log(res);
            if (!res.data.success) {
                toast.error(res.data.message);
            }
            toast.success(res.data.message);
            navigate('/login');
        } catch (error) {
            console.log("Error in register user...", error);
            toast.error(error.response?.data?.message || error.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const login = (data, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const { email, password } = data;
            const res = await axios.post(Login, { email, password });
            toast.success(res.data.message);
            dispatch(setToken(res.data.data.token));
            dispatch(setUser(res.data.data.user.userName));
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log("Error in login user...", error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export const logout = (navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const res = await axios.get(Logout);
            console.log(res);
            if (!res.data.success) {
                toast.error(res.data.message);
            }
            toast.success(res.data.message);
            dispatch(setToken(null));
            dispatch(setUser(null));
            navigate('/login');
        } catch (error) {
            console.log("Error in logout user...", error);
            toast.error(error.response?.data?.message || error.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}