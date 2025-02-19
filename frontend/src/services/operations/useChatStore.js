import { useDispatch, useSelector } from "react-redux";
import { authApis } from "../apis";
import { setError, setisConnected, setisLoading, setMessages, setonlineUsers, setSelectedUser, setSocket, setUserActivities, setUsers } from "@/slices/chatSlice";
import axios from "axios";
import { setLoading } from "@/slices/authSlice";
import Basedata from "@/config/Basedata";
import { io } from "socket.io-client";

const { GetMessages } = authApis;

const baseURL = Basedata.Baseurl ;
const socket = io(baseURL, {
    autoConnect: false,
    withCredentials: true,
});
export const useChatStore = () => {

    const dispatch = useDispatch();
    const{token} = useSelector(state=>state.auth);
    const {isConnected, onlineUsers, userActivities, messages } = useSelector((state) => state.chat);
    const { FetchUsers } = authApis;

    const setSelectedUserStore = (user) => {
        dispatch(setSelectedUser(user));
    }

    const fetchUsers = async () => {
        try {
            dispatch(setisLoading(true));
            const res = await axios.get(FetchUsers,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(setisLoading(false));
            dispatch(setUsers(res.data.data));
        } catch (error) {
            console.log(error);
            dispatch(setError(error.response.data.messages));
        }
    }

    const initSocket = (userId) => {
        if (!isConnected) {
            socket.auth = { userId };
            socket.connect();
            socket.emit("user_connected", userId);

            socket.on("users_online", (users) => {
                dispatch(setonlineUsers(Array.from(users)));
            })

            socket.on("activities", (activities) => {
                dispatch(setUserActivities(Object.fromEntries(activities)));
            });

            socket.on("user_connected", (userId) => {
                dispatch(setonlineUsers(Array.from(new Set([...onlineUsers, userId]))));
            });

            socket.on("user_disconnected", (userId) => {
                const newOnlineUsers = new Set(onlineUsers);
                newOnlineUsers.delete(userId);
                dispatch(setonlineUsers(Array.from(newOnlineUsers)));
            });

            socket.on("receive_message", (message) => {
                // console.log(messages);
                dispatch(setMessages([...messages, message]));
            });

            socket.on("message_sent", (message) => {
                // console.log(messages);
                dispatch(setMessages([...messages, message]));
            });

            socket.on("activity_updated", ({ userId, activity }) => {
                const newActivities = new Map(userActivities);
                console.log(userActivities);
                newActivities.set(userId, activity)
                dispatch(setUserActivities(newActivities));
            });

            dispatch(setisConnected(true));
        }
    }

    const disconnectSocket = () => {
        if (isConnected) {
            socket.disconnect();
            dispatch(setisConnected(false));
        }
    }

    const sendMessage = async (receiverId, senderId, content) => {
        if (!socket) return;
        socket.emit("send_message", { receiverId, senderId, content });
    }

    const fetchMessages = async (userId) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const res = await axios.get(`${GetMessages}/${userId}`);
            // console.log(res);
            dispatch(setLoading(false));
            dispatch(setMessages(res.data.data));
        } catch (error) {
            console.log(error.message);
        }
    }

    return {
        setSelectedUserStore,
        fetchUsers,
        initSocket,
        disconnectSocket,
        sendMessage,
        fetchMessages
    };
}