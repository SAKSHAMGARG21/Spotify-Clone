import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/connectDb.js";

dotenv.config({
    path: '../.env'
})
const PORT = process.env.PORT || 8000;

// app.get("/api/v1/user/sendOtp", (req, res) => {
//     res.send("this is soptify backend");
// })

connectDb().then(() => {
    app.listen(PORT || 8000, () => {
        console.log(`Server is running at the port : ${PORT}`);
    });
    app.on("Error :", (error) => {
        console.error("Error :", error);
        throw error;
    })
}).catch(() => {
    console.log(`MONGODB Connection is failed !!!`, error);
})