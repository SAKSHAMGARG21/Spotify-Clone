import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { login, logout, profileData, registerUser, sendOtp } from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const router = Router();
router.route("/sendotp").post(sendOtp);
router.route("/register").post(upload.single("profileImg"),registerUser);
router.route("/login").post(login);
router.route("/logout").get(verifyJwt,logout);
router.route("/profile").get(verifyJwt,profileData);
export default router;

