import { toast } from "react-toastify";
import { songApis } from "../apis";
import axios from "axios";
import { commonjs } from "globals";

const {
    CreateSong,
    FeaturedSongs,
    SongById,
    TopSongs,
    SongsByYear,
    GetAlbum,
    DeleteSongById
} = songApis;

export const createSongs = async () => {
    try {
        const toastId = toast.loading("Loading...");
        const res = await axios.post(CreateSong, data);
        console.log(res);
        toast.dismiss(toastId);
        return res.data.data;
    } catch (error) {
        console.log("Api error in creating songs...", error);
        toast.error(error?.response?.data?.data || error.message);
    }
}

export const getfeaturedSongs = async () => {
    try {
        const res = await axios.get(FeaturedSongs);
        return res.data.data;
    } catch (error) {
        console.log("Api error in fetching featuredsongs...", error);
        toast.error(error?.response?.data?.data || error.message);
    }
}
export const getSongById = async (id) => {
    try {
        const res = await axios.get(`${SongById}/${id}`);
        console.log(res);
        return res.data.data;
    } catch (error) {
        console.log("Api error in getting song by Id...", error);
        toast.error(error.message);
    }
}
export const gettopRatedSongs = async () => {
    try {
        const toastId = toast.loading("Loading...");
        const res = await axios.get(TopSongs);
        // console.log(res);
        toast.dismiss(toastId);
        return res.data.data;
    } catch (error) {
        console.log("Api error in fetching featuredsongs...", error);
        toast.error(error?.response?.data?.data || error.message);
    }
}

export const getSongByYear = async (year) => {
    try {
        const res = await axios.post(SongsByYear, {year});
        // console.log(res);
        return res.data.data;
    } catch (error) {
        console.log("Api error in Getting Song by year...", error);
        toast.error(error.message);
    }
}

export const getAlbum = async (artist) => {
    try {
        const res = await axios.post(GetAlbum,{artist});
        // console.log(res);
        return res.data.data;
    } catch (error) {
        console.log("Api error in Getting Album...", error);
        toast.error(error.message);
    }
}

export const deleteSongbyId = async () => {
    try {
        const res = await axios.get(DeleteSongById);
        console.log(res);
        return res.data.data;
    } catch (error) {
        console.log("Api error in deleting Song...", error);
        toast.error(error.message);
    }
}