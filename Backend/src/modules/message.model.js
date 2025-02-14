import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema({
    senderId: { type: String, required: true }, // Clerk user ID
    receiverId: { type: String, required: true }, // Clerk user ID
    content: { type: String, required: true },
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);