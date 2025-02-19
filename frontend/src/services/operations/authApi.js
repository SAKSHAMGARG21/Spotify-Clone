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
    Profile,
    FetchUsers,
    IsAdmin,
    UserAuthenticated
} = authApis

export const googleAuth = async (code) => {
    const res = await axios.get(`${GoogleAuth}${code}`);
    return res;
};

export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        toast.dismiss();
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const res = await axios.post(SendOtp, { email });
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
        toast.dismiss();
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const res = await axios.post(Signup, formData);
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
        toast.dismiss();
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        let res = null;
        try {
            const { email, password } = data;
            res = await axios.post(Login, { email, password });
            toast.success(res.data.message);
            localStorage.setItem("user", JSON.stringify(res.data.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.data.token));
            dispatch(setToken(res.data.data.token));
            dispatch(setUser(res.data.data.user));
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log("Error in login user...", error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        return res?.data?.data?.token;
    }
}
export const logout = (navigate) => {
    return async (dispatch) => {
        toast.dismiss();
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            await axios.patch(Logout);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            dispatch(setToken(null));
            dispatch(setUser(null));
            toast.success("Logout successfully");
            navigate('/login');
        } catch (error) {
            console.log("Error in logout user...", error);
            toast.error(error.response?.data?.message || error.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const fetchUsers = async () => {
    try {
        const toastId = toast.loading("Loading...");
        const res = await axios.get(FetchUsers);
        toast.dismiss(toastId);
        return res.data.data;
    } catch (error) {
        console.log("Api Error in fetching users...", error);
        toast.error(error?.response?.data?.message || error.message);
    }
}

export const isAdmin = async () => {
    try {
        const res = await axios.get(IsAdmin);
        return res.data.data;
    } catch (error) {
        // console.log("Api Error in fetching checking Admin...", error);
        // toast.error(error?.response?.data?.message || error.message)
    }
}
export const isUserLogin = async () => {
    try {
        const res = await axios.get(UserAuthenticated);
        return res.data.data;
    } catch (error) {
        console.log("Api Error in fetching checking loinguser...", error);
        toast.error(error?.response?.data?.message || error.message)
    }
}