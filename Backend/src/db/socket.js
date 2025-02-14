import { Server } from "socket.io";
import { Message } from "../modules/message.model.js";

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true
        }
    })

    const userSockets = new Map(); //{userId: socketId};
    const userActivities = new Map(); // {userId:activity}

    io.on("connection", (socket) => {
        socket.on("user_connected", (userId) => {
            if (!userId) {
                console.error("userId is not provided");
                return;
            }
            userSockets.set(userId, socket.id);
            userActivities.set(userId, "Idle");

            // broadcast to all connected sockets that user is just logged in
            io.emit("user_connected", userId);

            io.emit("users_online", Array.from(userSockets.keys()));

            io.emit("activities", Array.from(userActivities.entries()));
        })

        socket.on("update_activity", ({ userId, activity }) => {
            console.log("activity_updated", userId, activity);
            userActivities.set(userId, activity);
            io.emit("activity_updated", { userId, activity });
        })

        socket.on("send_message", async (data) => {
            try {
                const { senderId, receiverId, content } = data;
                // console.log(senderId,receiverId,content);
                const message = await Message.create({
                    senderId,
                    receiverId,
                    content
                })

                // send to user to realtime ,if they are online
                const reciverSocketId = userSockets.get(receiverId);
                if (reciverSocketId) {
                    io.to(reciverSocketId).emit("receiver_message", message);
                }
                io.emit("message_sent", message);
            } catch (error) {
                console.log('Message error:', error);
                io.emit("Message Error:", error.message);
            }
        })

        socket.on("disconnect", () => {
            let disconnectedUserId;
            for (const [userId, socketId] of userSockets.entries()) {
                if (socketId === socket.id) {
                    disconnectedUserId = userId;
                    userSockets.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }
            if (disconnectedUserId) {
                io.emit("user_disconnected",disconnectedUserId);
            }
        })
    })
}