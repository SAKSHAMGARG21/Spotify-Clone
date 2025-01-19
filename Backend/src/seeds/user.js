import mongoose from "mongoose";
import connectDb from "../db/connectDb.js";
import { config } from "dotenv"
import { User } from "../modules/user.model.js";

config();
const users = [
    {
        userName: "admin",
        fullName: "User Admin",
        profileImage: `${process.env.PROFILE_IMAGE}User Admin`,
        email: process.env.ADMIN_EMAIL,
        password: "$2b$10$ADgct0wxIWF9qVp0a7/0Du5Hac7W8HvCX3aGlGjP8pbmO1Jy.ecLG",
        role: "Admin"
    },
    {
        userName: "saksham21",
        fullName: "Saksham garg",
        profileImage: `${process.env.PROFILE_IMAGE}Saksham garg`,
        email: "sakshamgarggarg83@gmail.com",
        password: "$2b$10$yT4RMFbZ73n0ul0QmoOFQu0IedjGvk6KrqgA.oxYIyZ2ZKJbr9wJ2",
        role: "Admin"
    },
    {
        userName: "john12",
        fullName: "john don",
        profileImage: `${process.env.PROFILE_IMAGE}john don`,
        email: "john12@gmail.com",
        password: "$2b$10$8yCaU0nutBL2AvLM4tUP/uMoBmxdlnQ9J5YW5f08cp9pd.Yim3NjO",
        role: "User"
    },
]

const seedUser = async () => {
    try {
        connectDb();
        await User.deleteMany({});
        const res = await User.insertMany(users);

        if (!res) {
            throw new Error("users seed not inserted");
        }

        console.log("Users seeded successfully");
    } catch (error) {
        console.log("Error in seeding user :", error);
    } finally {
        mongoose.connection.close();
    }
}
seedUser();