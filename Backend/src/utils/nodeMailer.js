import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const mailSender = async(email,title,body) => {
    try {
        // console.log(body);
        const mailInstance = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.PASS_EMAIL
            }
        })
        const info = await mailInstance.sendMail({
            from :process.env.ADMIN_EMAIL,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        return info;
    } catch (error) {
        console.log("Error in sending mail :", error.message);
    }
}