import { toast } from "react-toastify";
import { albumApis } from "../apis";
import axios from "axios";
import { CodeSquare } from "lucide-react";

const {
    CreateAlbum,
    GetAllAlbum,
    GetAlbumById,
    UpdateAlbum,
    DeleteAlbum,
} = albumApis;

export const fetchAlbums = async () => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const res = await axios.get(GetAllAlbum);
        result = res.data.data;
    } catch (error) {
        console.log("Api Error in fetching albums", error);
        toast.error(error.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchAlbumById = async (albumId) => {
    try {
        const toastId = toast.loading("Loading...");
        const resData = await axios.get(`${GetAlbumById}/${albumId}`);
        toast.dismiss(toastId);
        return resData.data.data;
    } catch (error) {
        console.log("Api Error in fetching albums", error);
        toast.error(error.response?.data?.message || error.message);
    }
}

