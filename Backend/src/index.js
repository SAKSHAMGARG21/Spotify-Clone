import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/connectDb.js";
import { createServer } from "http";

dotenv.config({
    path: '../.env'
})
const PORT = process.env.PORT || 8000;

import { initializeSocket } from "./db/socket.js";
const httpServer = createServer(app);
initializeSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb().then(() => {
        // app.listen(PORT || 8000, () => {
        //     console.log(`Server is running at the port : ${PORT}`);
        // });
        httpServer.on("Error :", (error) => {
            console.error("Error :", error);
            throw error;
        })
    }).catch(() => {
        console.log(`MONGODB Connection is failed !!!`, error);
    })
});