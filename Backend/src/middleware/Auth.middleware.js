import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../modules/user.model.js";


export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.get("Authorization")?.replace("Bearer", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedUser = jwt.verify(token, process.env.TOKEN_SECRET);

        if (!decodedUser || !decodedUser._id) {
            throw new ApiError(401, "Invalid token");
        }

        const user = await User.findById(decodedUser._id);

        if (!user) {
            throw new ApiError(401, "User not found this token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error.message || "!! Invalid Token");
    }
})

export const isUser = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "User") {
        throw new ApiError(401, "This is protected route for user only");
    }
    next();
})

export const isArtist = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "Artist") {
        throw new ApiError(401, "This is protected route for Artist only");
    }
    next();
})

export const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "Admin") {
        throw new ApiError(401, "This is protected route only for Admin");
    }
    next();
})

export const mainAdmin = asyncHandler(async (req, res, next) => {
    if (req.user.role !== 'Admin') {
        if (req.user.email !== process.env.ADMIN_EMAIL) {
            throw new ApiError(401, "This is protected route only for main Admin");
        }
    }
    next();
})

