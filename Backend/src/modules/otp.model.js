import mongoose, { Schema } from "mongoose";
import { mailSender } from "../utils/nodeMailer.js";

const otpSchema = new Schema({
    otp: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expiresAt: {
        type: Date,
        default: Date.now() + 20 * 60 * 1000
    }
});

otpSchema.pre("save", async function (next) {
    await sendOtpEmail(this.email, this.otp);
    next();
})

async function sendOtpEmail(email, otp) {
    try {
        const body = `<p>Enter the OTP to verify your email address</p><p>OTP: <b>${otp}</b></p>
        <p>OTP Expires in 2 Minutes</p>`;
        const mailres = await mailSender(email, "Verification OTP from Spotifyclone.com", body);
        // console.log("Email response : ", mailres);
    } catch (error) {
        console.log("Error in Otp mail", error);
    }
}



export const Otp = mongoose.model('Otp', otpSchema);