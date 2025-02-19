import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { getAllUsers, getMessages, googleLogin, isAdmin, isUserLogin, login, logout, profileData, refreshNewToken, registerUser, sendOtp } from "../controllers/user.controller.js";
import { checkloingStatus, mainAdmin, verifyJwt } from "../middleware/Auth.middleware.js";

const router = Router();

router.route("/google").get(googleLogin);
router.route("/sendotp").post(sendOtp);
router.route("/register").post(upload.single("profileImg"), registerUser);
router.route("/login").post(login);
router.route("/logout").patch(verifyJwt,logout);
router.route("/profile").get(verifyJwt, profileData);
router.route("/checktoken").get(verifyJwt, refreshNewToken);
router.route("/getusers").get(verifyJwt,getAllUsers);
router.route("/getmessage/:userId").get(verifyJwt,getMessages);
// router.route("/isadmin").get(verifyJwt, mainAdmin, isAdmin);
// router.route("/isuserlogin").get(checkloingStatus,isUserLogin);

export default router;

