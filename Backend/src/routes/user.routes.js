import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { googleLogin, login, logout, profileData, refreshNewToken, registerUser, sendOtp } from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const router = Router();
router.route("/google").get(googleLogin);
router.route("/sendotp").post(sendOtp);
router.route("/register").post(upload.single("profileImg"),registerUser);
router.route("/login").post(login);
router.route("/logout").get(verifyJwt,logout);
router.route("/profile").get(verifyJwt,profileData);
router.route("/checktoken").get(verifyJwt,refreshNewToken);
export default router;

