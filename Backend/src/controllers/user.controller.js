import { Otp } from "../modules/otp.model.js";
import { User } from "../modules/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { createTokenforUser } from "../utils/generateToken.js";

export const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(404, "Email not found");
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);

    const otpValidation = await Otp.create({
        otp: otp,
        email: email.toLowerCase()
    })

    if (!otpValidation) {
        throw new ApiError(404, "Otp validation response not found");
    }

    return res.status(200).json(
        new ApiResponse(200, otpValidation, "OTP sent successfully")
    )
})

const verifyOtp = async (email, otp) => {

    const user = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    // console.log(user);

    if (!user) {
        throw new ApiError(404, "User with this email not found for otp validation");
    }
    // console.log(user[0]);
    const { expiresAt } = user[0];
    const dbOtp = user[0].otp;

    if (expiresAt < Date.now()) {
        await Otp.deleteMany({ email });
        throw new ApiError(404, "Code has expired. Please request agaain");
    }


    const validOtp = (parseInt(otp) === dbOtp);
    if (!validOtp) {
        throw new ApiError(404, "Invalid OTP, Please check your inbox");
    }

    await Otp.deleteMany({ email });
    return validOtp;
}



export const registerUser = asyncHandler(async (req, res) => {
    const { userName, fullName, email, password, otp } = req.body;
    if (
        [userName, fullName, email, password, otp].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(404, "All fields are required");
    }

    const user = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (user) {
        throw new ApiError(404, "User with this username and email already exists");
    }

    const verifyNewUser = await verifyOtp(email.toLowerCase(), otp);

    if (!verifyNewUser) {
        throw new ApiError(404, "User not Verified");
    }

    const avtarFile = req.file?.path;
    let profileImg;
    if (avtarFile) {
        profileImg = await uploadOnCloudinary(avtarFile);
    }

    let names = fullName.split(" ");
    let firstName = names[0];
    let lastname = names[1];

    const img = profileImg ? profileImg : `${process.env.PROFILE_IMAGE}${firstName} ${lastname}`;
    // console.log(img);
    const newUser = await User.create({
        userName: userName.toLowerCase(),
        fullName,
        profileImage: img,
        email:email.toLowerCase(),
        password,
    })

    if (!newUser) {
        new ApiError(404, "Error in creating newUser");
    }

    const createdUser = await User.findById(newUser._id).select(
        "-password -token"
    );

    if (!createdUser) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, newUser, "User created Successfully")
    )
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let userName;
    if (!email.includes("@gmail.com")) {
        userName = email;
    }
    if (!(userName || email)) {
        throw new ApiError(404, "username or email are required");
    }
    if (!password) {
        throw new ApiError(404, "Password is required");
    }

    const user = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const validPass = user.isPasswordCorrect(password);

    if (!validPass) {
        throw new ApiError(404, "Password is not correct");
    }

    const token = await createTokenforUser(user._id);

    const loginUser = await User.findById(user._id).select("-password -token");

    if (!loginUser) {
        throw new ApiError(404, "User not found ")
    }

    const option = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 2 * 60 * 60 * 1000
    }

    return res.status(200)
        .cookie("token", token, option)
        .json(
            new ApiResponse(200, { user: loginUser, token: token }, "Login successfully")
        )
})

export const logout = asyncHandler(async (req, res) => {
    const logoutUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                token: 1
            }
        }, { new: true })

    const options = {
        httpOnly: true,
        sameSite: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("token", options).json(
            new ApiResponse(200, logoutUser, "Logout successfully")
        )
})

export const profileData = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200,req.user , "User data fetched successfully")
    )
})


