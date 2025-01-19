import { Album } from "../modules/album.model.js";
import { Playlist } from "../modules/playlist.model.js";
import { Song } from "../modules/song.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createSong = asyncHandler(async (req, res) => {
    const { songName, artist } = req.body;
    if (!(songName || artist)) {
        throw new ApiError(404, "songName and artist is requied");
    }

    const songFilepath = req.files?.songFile[0].path;
    const songimgFile = req.files?.songImgFile[0].path;

    if (!(songFilepath || songimgFile)) {
        throw new ApiError(404, "song and song image file is required");
    }

    const songUploadedFile = await uploadOnCloudinary(songFilepath);

    if (!songUploadedFile) {
        throw new ApiError(404, "Error in uploading song file on cloudinary");
    }
    const songimgUploadedFile = await uploadOnCloudinary(songimgFile);

    if (!songimgUploadedFile) {
        throw new ApiError(404, "Error in uploading song image file on cloudinary");
    }

    const newsong = await Song.create({
        songName,
        songFile: songUploadedFile,
        songImg: songimgUploadedFile,
        artist,
    })

    if (!newsong) {
        throw new ApiError(404, "Error in creating file in database");
    }

    return res.status(200).json(
        new ApiResponse(200, newsong, "Song created Successfully")
    )
})

export const getFeaturedSongs = asyncHandler(async (req, res) => {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
        {
            $sample: { size: 6 },
        },
        {
            $project: {
                _id: 1,
                songName: 1,
                songFile: 1,
                songImg: 1,
                artist: 1,
            },
        },
    ]);

    if (!songs){
        throw new ApiError(404, "Error in getting songs");
    }

    return res.status(200).json(
        new ApiResponse(200,songs,"Songs fetched successfully")
    )
});

export const getSongs = asyncHandler(async (req, res) => {

    const songs = await Song.find({}).sort({ createdAt: -1 });
    return res.status(200).json(
        new ApiResponse(200, songs, "All songs fetched successfully")
    )
})

export const getSongById = asyncHandler(async (req, res) => {
    const { songId } = req.params;
    // console.log(songId);
    const ressong = await Song.findById(songId);
    if (!ressong) {
        throw new ApiError(404, "Song not found with this id");
    }
    return res.status(200).json(
        new ApiResponse(200, ressong, "Song fetched successfully found")
    )
})

export const getTopRatedSongs = asyncHandler(async (req, res) => {
    const topRatedSongs = await Song.find({ rating: { $gt: 4.5 } });
    
    return res.status(200).json(
        new ApiResponse(200, topRatedSongs, "Top rated songs fetched successfully")
    )
})

export const getSongsByYear = asyncHandler(async (req, res) => {
    const { year } = req.body;

    const songsInYear = await Song.find({
        $expr: { $eq: [{ $year: "$createdAt" }, year] }
    });
    return res.status(200).json(
        new ApiResponse(200, songsInYear, "Top rated songs fetched successfully")
    )
})

export const getAlbum = asyncHandler(async (req, res) => {
    const { artist } = req.body;

    if (!artist) {
        throw new ApiError(404, "Artist is required");
    }

    const albumSongs = await Song.find({ artist });
    console.log(albumSongs);

    if (!albumSongs) {
        throw new ApiError(404, "Artist songs not found");
    }

    return res.status(200).json(
        new ApiResponse(200, albumSongs, "Album songs fetched successfully")
    )
})

export const deleteSongById = asyncHandler(async (req, res) => {
    const { songId } = req.params;

    if (!songId) {
        throw new ApiError(404, "Song id is required");
    }

    const song = await Song.findById(songId);

    if (!song) {
        throw new ApiError(404, "Error in deleting song");
    }

    if (song.albumId){
        await Album.findByIdAndUpdate(song.albumId, {
            $pull:{
                songs:song._id
            }
        }, {new :true})
    }

    await Song.findByIdAndDelete(songId);

    // remove song from playlist
    // const allPlaylist = await Playlist.find({});
    // console.log(allPlaylist);

    // if (!allPlaylist) {
    //     throw new ApiError(404, "Song not deleted form Playlist");
    // }

    // for (let ele of allPlaylist) {
    //     console.log(ele._id);
    //     await Playlist.findByIdAndUpdate(ele._id, {
    //         $pull: {
    //             songs: songId
    //         }
    //     }, {
    //         new: true
    //     });
    // }

    return res.status(200).json(
        new ApiResponse(200,song,"Song deleted Successfully")
    )
})

export const deleteSongsByIds = asyncHandler(async (req, res) => {
    const { songIds } = req.body;

    if (!songIds || !Array.isArray(songIds)) {
        throw new ApiError(404, "Array of song ids is required");
    }

    const deletedSongs = await Song.deleteMany({ _id: { $in: songIds } });

    return res.status(200).json(
        new ApiResponse(200, deletedSongs, "Songs deleted successfully")
    );
});

export const songrating = asyncHandler(async (req, res) => {

})

// const song = await Song.findById(songId);
// const topRatedSongs = await Song.find({ rating: { $gt: 4.5 } });
// const songsInYear = await Song.find({ releaseYear: 2021 });
// const page = 1;
// const limit = 10;
// const paginatedSongs = await Song.find({})
//     .skip((page - 1) * limit)
// const songsWithTitle = await Song.find({ title: /love/i });